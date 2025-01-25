// Language management
export const languageManager = {
    currentLang: document.documentElement.lang || 'en',
    
    init() {
        this.update();
    },
    
    toggle(event) {
        event?.preventDefault();
        this.currentLang = this.currentLang === 'tr' ? 'en' : 'tr';
        document.documentElement.lang = this.currentLang;
        this.update();
        document.dispatchEvent(new Event('languageChanged'));
    },
    
    update() {
        document.querySelectorAll('[data-lang]').forEach(element => {
            if (element.dataset.lang === this.currentLang) {
                element.style.display = 'inline-block';
            } else {
                element.style.display = 'none';
            }
        });
    }
};

// Mobile Menu Management
export const mobileMenuManager = {
    init() {
        const menuBtn = document.querySelector('.menu-btn');
        const nav = document.querySelector('.nav');

        if (!menuBtn || !nav) return;

        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking nav items
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
};

// UI utilities
export const uiUtils = {
    initScrollToTop() {
        const btn = document.querySelector('.scroll-to-top');
        if (!btn) return;
        
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 300);
        });
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// Card templates
export const templates = {
    createBlogCard(post) {
        return `
            <div class="project-card">
                <div class="project-image-container">
                    <img src="${post.image}" alt="${post.title[languageManager.currentLang]}" class="project-image">
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">
                            <span data-lang="tr">${post.title.tr}</span>
                            <span data-lang="en">${post.title.en}</span>
                        </h3>
                        <span class="project-date">${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <p class="project-description">
                        <span data-lang="tr">${post.summary.tr}</span>
                        <span data-lang="en">${post.summary.en}</span>
                    </p>
                    <div class="tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <div class="links-left">
                            <span class="read-time">
                                <i class="fas fa-clock"></i>
                                ${post.readTime} min read
                            </span>
                        </div>
                        <div class="links-right">
                            <a href="./blog-details.html?id=${post.id}" class="read-more">
                                <span data-lang="tr">Devamını Oku</span>
                                <span data-lang="en">Read More</span>
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    createProjectCard(project) {
        return `
            <div class="project-card">
                <div class="project-image-container">
                    <img src="${project.thumbnail}" alt="${project.title[languageManager.currentLang]}" class="project-image">
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">
                            <span data-lang="tr">${project.title.tr}</span>
                            <span data-lang="en">${project.title.en}</span>
                        </h3>
                    </div>
                    <p class="project-description">
                        <span data-lang="tr">${project.description.tr}</span>
                        <span data-lang="en">${project.description.en}</span>
                    </p>
                    <div class="tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
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
                        </div>
                        <div class="links-right">
                            <a href="./project-details.html?id=${project.id}" class="read-more">
                                <span data-lang="tr">Devamını Oku</span>
                                <span data-lang="en">Read More</span>
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    createHomeBlogCard(post) {
        return `
            <div class="project-card">
                <div class="project-image-container">
                    <img src="${post.image}" alt="${post.title[languageManager.currentLang]}" class="project-image">
                </div>
                <div class="project-content">
                    <h3>${post.title[languageManager.currentLang]}</h3>
                    <p>${post.summary[languageManager.currentLang]}</p>
                    <div class="tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <div class="links-left">
                            <span class="read-time">
                                <i class="fas fa-clock"></i>
                                <span data-lang="tr" ${languageManager.currentLang === 'tr' ? 'class="lang-visible"' : ''}>${post.readTime} dk</span>
                                <span data-lang="en" ${languageManager.currentLang === 'en' ? 'class="lang-visible"' : ''}>${post.readTime} min</span>
                            </span>
                        </div>
                        <div class="links-right">
                            <a href="./blog-details.html?id=${post.id}" class="read-more">
                                <span data-lang="tr" ${languageManager.currentLang === 'tr' ? 'class="lang-visible"' : ''}>Devamını Oku</span>
                                <span data-lang="en" ${languageManager.currentLang === 'en' ? 'class="lang-visible"' : ''}>Read More</span>
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    createHomeProjectCard(project) {
        return `
            <div class="project-card">
                <div class="project-image-container">
                    <img src="${project.thumbnail}" alt="${project.title[languageManager.currentLang]}" class="project-image">
                </div>
                <div class="project-content">
                    <h3>${project.title[languageManager.currentLang]}</h3>
                    <p>${project.description[languageManager.currentLang]}</p>
                    <div class="tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <div class="links-right">
                            <a href="./project-details.html?id=${project.id}" class="read-more">
                                <span data-lang="tr" ${languageManager.currentLang === 'tr' ? 'class="lang-visible"' : ''}>Devamını Oku</span>
                                <span data-lang="en" ${languageManager.currentLang === 'en' ? 'class="lang-visible"' : ''}>Read More</span>
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Data fetching utilities
export const dataUtils = {
    async fetchData(url) {
        try {
            // URL'yi düzelt
            const fixedUrl = url.startsWith('/') ? '.' + url : url;
            const response = await fetch(fixedUrl);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            return null;
        }
    }
};

export async function setSiteName() {
    try {
        const content = await dataUtils.fetchData('./data/content.json');
        if (!content?.about?.name) return;
        
        const logoLink = document.querySelector('.logo-link');
        if (logoLink) {
            logoLink.textContent = content.about.name;
        }
    } catch (error) {
        console.error('Error setting site name:', error);
    }
}

// Initialize all UI components
export function initializeUI() {
    languageManager.init();
    uiUtils.initScrollToTop();
    mobileMenuManager.init();
}
