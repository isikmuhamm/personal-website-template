// Load footer content
async function loadFooter() {
    try {
        // Load footer HTML
        const footerResponse = await fetch('../footer.html');
        const footerHtml = await footerResponse.text();
        const footerContainer = document.createElement('div');
        footerContainer.innerHTML = footerHtml;
        document.body.appendChild(footerContainer.firstElementChild);

        // Load site content for footer
        const contentResponse = await fetch('../data/content.json');
        const siteContent = await contentResponse.json();
        updateFooter(siteContent.about);

        // Add initial language visibility class
        const currentLang = document.documentElement.lang || 'en';
        document.querySelectorAll('.footer [data-lang]').forEach(element => {
            element.classList.toggle('lang-visible', element.dataset.lang === currentLang);
        });

        // Initialize scroll to top functionality
        initScrollToTop();
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Initialize scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Update footer content
function updateFooter(about) {
    // Dynamically set the year
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('#footer-year').forEach(el => {
        el.textContent = currentYear;
    });

    // Dynamically set the name
    document.querySelectorAll('#footer-name').forEach(el => {
        el.textContent = about.name;
    });

    // Build social links
    const footerSocials = document.getElementById('footer-socials');
    if (footerSocials && about.socialLinks) {
        footerSocials.innerHTML = about.socialLinks
            .map(link => `<a href="${link.url}" aria-label="${link.platform}"><i class="${link.icon}"></i></a>`)
            .join('');
    }
}

// Listen for language changes
document.addEventListener('languageChanged', () => {
    const currentLang = document.documentElement.lang;
    document.querySelectorAll('.footer [data-lang]').forEach(element => {
        element.classList.toggle('lang-visible', element.dataset.lang === currentLang);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadFooter);

