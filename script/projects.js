import { languageManager, uiUtils, templates, dataUtils, initializeUI, setSiteName } from './utils.js';

async function loadAllProjects() {
    try {
        const projectData = await dataUtils.fetchData('./data/projects.json');
        if (!projectData) return;
        
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = projectData.projects
                .map(templates.createProjectCard)
                .join('');
        }
        
        languageManager.update();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function updateTitleForProjects() {
    const content = await dataUtils.fetchData('./data/content.json');
    if (!content) return;
    document.title = `${content.about.name} Professional Projects`;
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await setSiteName();
    loadAllProjects();
    initializeUI();
    uiUtils.initScrollToTop();
    updateTitleForProjects();
});

// Language switcher event listener
document.querySelector('.language-switch')?.addEventListener('click', (e) => {
    languageManager.toggle(e);
});