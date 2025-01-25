import { languageManager, uiUtils, dataUtils, initializeUI, setSiteName } from './utils.js';

function toggleLanguage(event) {
    event.preventDefault();
    languageManager.currentLang = languageManager.currentLang === 'tr' ? 'en' : 'tr';
    updateLanguage();
    document.documentElement.lang = languageManager.currentLang;
    // Dispatch language change event
    document.dispatchEvent(new Event('languageChanged'));
}

function updateLanguage() {
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.classList.remove('lang-visible');
        if (element.dataset.lang === languageManager.currentLang) {
            element.classList.add('lang-visible');
        }
    });
}

async function updateTitleForProjectDetails(projectTitle) {
    const content = await dataUtils.fetchData('./data/content.json');
    if (!content) return;
    document.title = `${projectTitle} | ${content.about.name} Professional Projects`;
}

async function loadProjectDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        if (!projectId) {
            window.location.href = './projects.html';
            return;
        }

        const response = await fetch('./data/projects.json');
        const data = await response.json();
        const project = data.projects.find(p => p.id.toString() === projectId);

        if (!project) {
            window.location.href = './projects.html';
            return;
        }

        await updateTitleForProjectDetails(project.title[languageManager.currentLang]);

        const projectDetails = document.getElementById('project-details');
        projectDetails.innerHTML = `
            <article class="project-details">
                <header class="project-header">
                    <h1 class="section-title">
                        <span data-lang="tr">${project.title.tr}</span>
                        <span data-lang="en">${project.title.en}</span>
                    </h1>
                    
                    <div class="project-meta">
                        <div class="tags">
                            ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </header>

                <div class="project-content">
                    <div class="project-description markdown-content">
                        <div data-lang="tr">${marked.parse(project.longDescription.tr)}</div>
                        <div data-lang="en">${marked.parse(project.longDescription.en)}</div>
                    </div>
                </div>

                <div class="project-links">
                    <div class="links-left">
                        <a href="${project.liveUrl}" class="read-more" target="_blank">
                            <span data-lang="tr">Canlı Demo</span>
                            <span data-lang="en">Live Demo</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${project.githubUrl}" class="read-more" target="_blank">
                            <span data-lang="tr">Kaynak Kod</span>
                            <span data-lang="en">Source Code</span>
                            <i class="fab fa-github"></i>
                        </a>
                        <div class="share-buttons">
                            <a href="https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(project.title[languageManager.currentLang])}" 
                               target="_blank" 
                               class="share-button twitter"
                               aria-label="Share on Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(project.title[languageManager.currentLang])}" 
                               target="_blank" 
                               class="share-button linkedin"
                               aria-label="Share on LinkedIn">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="project-gallery gallery">
                    ${project.images.map((img, index) => `
                        <div class="gallery-item" data-index="${index}">
                            <img src="${img}" alt="${project.title[languageManager.currentLang]}">
                        </div>
                    `).join('')}
                </div>
            </article>
        `;

        // Initialize gallery functionality
        initGallery();
        updateLanguage();

    } catch (error) {
        console.error('Error loading project details:', error);
    }
}

// Gallery and lightbox functionality
function initGallery() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;

    // Gallery image URLs array
    const images = Array.from(galleryItems).map(item => 
        item.querySelector('img').src
    );

    // Gallery click events
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    });

    function updateLightboxImage() {
        lightboxImage.src = images[currentImageIndex];
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightboxImage();
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await setSiteName();
    loadProjectDetails();
    initializeUI();
});

document.querySelector('.language-switch')?.addEventListener('click', (e) => {
    languageManager.toggle(e);
});
