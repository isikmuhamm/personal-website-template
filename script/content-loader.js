import { languageManager } from './utils.js';

export async function loadSiteContent() {
    try {
        const response = await fetch('./data/content.json'); // ../data yerine ./data
        const data = await response.json();
        
        // Önce içeriği yükle
        await Promise.all([
            updateSiteInfo(data.about),
            updateAboutSection(data.about),
            updateExperience(data.experience),
            updateSkills(data.skills),
            updateEducation(data.education),
            updateGallery(data.gallery),
            updateUsefulLinks(data.usefulLinks)
        ]);

        // Sonra dil ayarını uygula
        languageManager.init();
        
    } catch (error) {
        console.error('Error loading site content:', error);
    }
}

function updateSiteInfo(siteInfo) {
    document.title = `${siteInfo.name} Professional Website`;
    document.querySelector('.logo-link').textContent = siteInfo.name;
}

function updateAboutSection(about) {
    const aboutSection = document.getElementById('about');
    const aboutNavLink = document.querySelector('.nav a[href="#about"]');
    if (!about || !about.content) {
        aboutSection.style.display = 'none';
        aboutNavLink.style.display = 'none';
        return;
    }
    const aboutContent = document.querySelector('.about-content');
    const profileImage = document.querySelector('.profile-image');
    
    // Update about text
    aboutContent.querySelector('[data-lang="tr"]').textContent = about.content.tr;
    aboutContent.querySelector('[data-lang="en"]').textContent = about.content.en;
    
    // Update profile image
    profileImage.src = about.image;
    
    // Update social links
    const socialLinks = aboutContent.querySelector('.social-links');
    socialLinks.innerHTML = about.socialLinks
        .map(link => `<a href="${link.url}" aria-label="${link.platform}"><i class="${link.icon}"></i></a>`)
        .join('');
}

function updateExperience(experience) {
    const experienceSection = document.getElementById('experience');
    const experienceNavLink = document.querySelector('.nav a[href="#experience"]');
    if (!experience || !experience.categories || experience.categories.length === 0) {
        experienceSection.style.display = 'none';
        experienceNavLink.style.display = 'none';
        return;
    }
    const container = experienceSection.querySelector('.container');
    
    // Clear existing content after title
    const title = container.querySelector('.section-title');
    container.innerHTML = '';
    container.appendChild(title);
    
    // Add experience categories
    experience.categories.forEach(category => {
        const categoryElement = createExperienceCategory(category);
        container.appendChild(categoryElement);
    });
}

function createExperienceCategory(category) {
    const div = document.createElement('div');
    div.innerHTML = `
        <h3 class="subsection-title">
            <span data-lang="tr">${category.title.tr}</span>
            <span data-lang="en">${category.title.en}</span>
        </h3>
        ${category.items.map(item => createExperienceItem(item)).join('')}
    `;
    return div;
}

function createExperienceItem(item) {
    if (!item.title.tr || !item.description.tr) {
        console.warn('Missing translation for experience item:', item);
    }
    
    const companyNameDisplay = item.company.website 
        ? `<a href="${item.company.website}" target="_blank" class="company-link">
             ${item.company.logo ? `<img src="${item.company.logo}" alt="${item.company.name[languageManager.currentLang]}" class="company-logo">` : ''}
             <span data-lang="tr">${item.company.name.tr}</span>
             <span data-lang="en">${item.company.name.en}</span>
           </a>`
        : `<span>
             ${item.company.logo ? `<img src="${item.company.logo}" alt="${item.company.name[languageManager.currentLang]}" class="company-logo">` : ''}
             <span data-lang="tr">${item.company.name.tr}</span>
             <span data-lang="en">${item.company.name.en}</span>
           </span>`;
    
    return `
        <div class="experience-item">
            <div class="experience-header">
                <div class="experience-title">
                    <h4>
                        <span data-lang="tr">${item.title.tr}</span>
                        <span data-lang="en">${item.title.en}</span>
                    </h4>
                    <div class="company-info">
                        ${companyNameDisplay}
                    </div>
                </div>
                <span class="period">${item.period}</span>
            </div>
            <p data-lang="tr">${item.description.tr}</p>
            <p data-lang="en">${item.description.en}</p>
            <div class="tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

function updateSkills(skills) {
    const skillsSection = document.getElementById('skills');
    const skillsNavLink = document.querySelector('.nav a[href="#skills"]');
    if (!skills || !skills.categories || skills.categories.length === 0) {
        skillsSection.style.display = 'none';
        skillsNavLink.style.display = 'none';
        return;
    }
    const container = skillsSection.querySelector('.container');
    
    // Keep the title
    const title = container.querySelector('.section-title');
    container.innerHTML = '';
    container.appendChild(title);
    
    skills.categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.innerHTML = `
            <h3 class="subsection-title">
                <span data-lang="tr">${category.title.tr}</span>
                <span data-lang="en">${category.title.en}</span>
            </h3>
            <div class="skills-grid">
                ${category.subcategories.map(subcat => `
                    <div class="skill-category">
                        <h4>
                            <span data-lang="tr">${subcat.title.tr}</span>
                            <span data-lang="en">${subcat.title.en}</span>
                        </h4>
                        <div class="tags">
                            ${subcat.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(categoryElement);
    });
}

function updateEducation(education) {
    const educationSection = document.getElementById('education');
    const educationNavLink = document.querySelector('.nav a[href="#education"]');
    if (!education || education.length === 0) {
        educationSection.style.display = 'none';
        educationNavLink.style.display = 'none';
        return;
    }
    const container = educationSection.querySelector('.container');
    
    // Keep the title
    const title = container.querySelector('.section-title');
    container.innerHTML = '';
    container.appendChild(title);
    
    education.forEach(item => {
        const educationElement = document.createElement('div');
        educationElement.className = 'experience-item';
        
        const schoolNameDisplay = item.school.website 
            ? `<a href="${item.school.website}" target="_blank" class="company-link">
                 ${item.school.logo ? `<img src="${item.school.logo}" alt="${item.school.name[languageManager.currentLang]}" class="company-logo">` : ''}
                 <span data-lang="tr">${item.school.name.tr}</span>
                 <span data-lang="en">${item.school.name.en}</span>
               </a>`
            : `<span>
                 ${item.school.logo ? `<img src="${item.school.logo}" alt="${item.school.name[languageManager.currentLang]}" class="company-logo">` : ''}
                 <span data-lang="tr">${item.school.name.tr}</span>
                 <span data-lang="en">${item.school.name.en}</span>
               </span>`;

        educationElement.innerHTML = `
            <div class="experience-header">
                <div class="experience-title">
                    <h3>
                        <span data-lang="tr">${item.degree.tr}</span>
                        <span data-lang="en">${item.degree.en}</span>
                    </h3>
                    <div class="company-info">
                        ${schoolNameDisplay}
                    </div>
                </div>
                <span>${item.period}</span>
            </div>
            <p>GPA: ${item.gpa}</p>
            <div class="tags">
                ${item.tags.tr.map((tag, index) => `
                    <span class="tag">
                        <span data-lang="tr">${tag}</span>
                        <span data-lang="en">${item.tags.en[index]}</span>
                    </span>
                `).join('')}
            </div>
        `;
        container.appendChild(educationElement);
    });
}

function updateGallery(gallery) {
    const gallerySection = document.getElementById('gallery');
    const galleryNavLink = document.querySelector('.nav a[href="#gallery"]');
    if (!gallery || !gallery.images || gallery.images.length === 0) {
        gallerySection.style.display = 'none';
        galleryNavLink.style.display = 'none';
        return;
    }
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = gallery.images
        .map((img, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${img.url}" alt="${img.alt}">
            </div>
        `).join('');
}

function updateUsefulLinks(usefulLinks) {
    const usefulLinksSection = document.getElementById('useful-links');
    const linksNavLink = document.querySelector('.nav a[href="#useful-links"]');
    if (!usefulLinks || !usefulLinks.categories || usefulLinks.categories.length === 0) {
        usefulLinksSection.style.display = 'none';
        linksNavLink.style.display = 'none';
        return;
    }
    const linksGrid = document.querySelector('.links-grid');
    linksGrid.innerHTML = usefulLinks.categories
        .map(category => `
            <div class="link-item">
                <h3>
                    <i class="${category.icon}"></i>
                    <span data-lang="tr">${category.title.tr}</span>
                    <span data-lang="en">${category.title.en}</span>
                </h3>
                <ul>
                    ${category.links.map(link => `
                        <li>
                            <a href="${link.url}" target="_blank">${link.title}</a>
                            ${link.description ? ` - ${link.description}` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
}