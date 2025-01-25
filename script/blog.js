import { languageManager, uiUtils, templates, dataUtils, initializeUI, setSiteName } from './utils.js';

async function initBlog() {
    const blogData = await dataUtils.fetchData('./data/blog.json');
    if (!blogData) return;
    
    const blogList = document.getElementById('blog-list');
    if (blogList) {
        blogList.innerHTML = blogData.posts
            .map(templates.createBlogCard)
            .join('');
    }
    
    // Add language switcher event listener
    document.querySelector('.language-switch')?.addEventListener('click', (e) => {
        languageManager.toggle(e);
    });
    
    languageManager.update();
    uiUtils.initScrollToTop();
}

async function updateTitleForBlog() {
    const content = await dataUtils.fetchData('./data/content.json');
    if (!content) return;
    document.title = `${content.about.name} Professional Blog`;
}

document.addEventListener('DOMContentLoaded', async () => {
    await setSiteName();
    updateTitleForBlog();
    initBlog();
    initializeUI();
});
