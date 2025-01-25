import { languageManager, uiUtils, dataUtils, initializeUI, setSiteName } from './utils.js';

let currentLang = 'en';

function updateLanguage() {
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.classList.remove('lang-visible');
        if (element.dataset.lang === currentLang) {
            element.classList.add('lang-visible');
        }
    });
}

async function updateTitleForBlogDetails(postTitle) {
    const content = await dataUtils.fetchData('./data/content.json');
    if (!content) return;
    document.title = `${postTitle} | ${content.about.name} Professional Blog`;
}

async function loadBlogDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (!postId) {
            window.location.href = './blog.html';
            return;
        }

        const response = await fetch('./data/blog.json');
        const data = await response.json();
        const post = data.posts.find(p => p.id.toString() === postId);

        if (!post) {
            window.location.href = './blog.html';
            return;
        }

        await updateTitleForBlogDetails(post.title[currentLang]);

        const blogDetails = document.getElementById('blog-details');
        blogDetails.innerHTML = `
            <article class="blog-post">
                <header class="post-header text-center">
                    <h1 class="section-title">
                        <span data-lang="tr">${post.title.tr}</span>
                        <span data-lang="en">${post.title.en}</span>
                    </h1>
                    
                    <div class="blog-meta">
                        <span class="post-date">
                            <i class="far fa-calendar"></i>
                            ${new Date(post.date).toLocaleDateString()}
                        </span>
                        <span class="read-time">
                            <i class="far fa-clock"></i>
                            ${post.readTime} min read
                        </span>
                        <div class="share-buttons">
                            <a href="https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title[currentLang])}" 
                               target="_blank" 
                               class="share-button twitter"
                               aria-label="Share on Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title[currentLang])}" 
                               target="_blank" 
                               class="share-button linkedin"
                               aria-label="Share on LinkedIn">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    <div class="tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </header>

                <div class="blog-content">
                    <div class="blog-text markdown-content">
                        <div data-lang="tr">${marked.parse(post.content.tr)}</div>
                        <div data-lang="en">${marked.parse(post.content.en)}</div>
                    </div>
                </div>

                <div class="blog-featured-image">
                    <img src="${post.image}" alt="${post.title[currentLang]}">
                </div>
            </article>
        `;

        updateLanguage();

    } catch (error) {
        console.error('Error loading blog post:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await setSiteName();
    loadBlogDetails();
    initializeUI(); // Added initializeUI
    // Add language switcher event listener
    document.querySelector('.language-switch')?.addEventListener('click', (e) => {
        languageManager.toggle(e);
    });
    
    uiUtils.initScrollToTop();
});
