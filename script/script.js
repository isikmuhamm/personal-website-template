import { languageManager, uiUtils, templates, dataUtils, initializeUI } from './utils.js';

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// Close mobile menu when clicking a link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

// Lightbox functionality
function initLightbox() {
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

// Logo click handler
const logoLink = document.querySelector('.logo-link');
logoLink?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Language switcher
document.querySelector('.language-switch')?.addEventListener('click', (e) => {
    languageManager.toggle(e);
});

// Initialize
async function init() {
    try {
        // Handle blog section
        const blogSection = document.getElementById('blogs');
        const blogData = await dataUtils.fetchData('../data/blog.json');
        const blogCards = document.getElementById('blog-cards');
        const blogNavLink = document.querySelector('.nav a[href="#blogs"]');
        
        if (!blogData || !blogData.posts || blogData.posts.length === 0) {
            blogSection.style.display = 'none';
            blogNavLink.style.display = 'none';
        } else if (blogCards) {
            blogCards.innerHTML = blogData.posts
                .slice(0, 3)
                .map(templates.createHomeBlogCard)
                .join('');
        }

        // Handle projects section
        const projectSection = document.getElementById('projects');
        const projectData = await dataUtils.fetchData('../data/projects.json');
        const projectCards = document.getElementById('project-cards');
        const projectNavLink = document.querySelector('.nav a[href="#projects"]');

        if (!projectData || !projectData.projects || projectData.projects.length === 0) {
            projectSection.style.display = 'none';
            projectNavLink.style.display = 'none';
        } else if (projectCards) {
            projectCards.innerHTML = projectData.projects
                .slice(0, 3)
                .map(templates.createHomeProjectCard)
                .join('');
        }

        // Initialize lightbox after content is loaded
        initLightbox();

    } catch (error) {
        console.error('Error initializing sections:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    initializeUI();
});