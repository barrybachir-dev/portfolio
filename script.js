// ==================== DARK MODE ====================
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.setAttribute('aria-label', 'Activer le thème clair');
    themeToggle.setAttribute('aria-pressed', 'true');
}
themeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Activer le thème sombre');
        themeToggle.setAttribute('aria-pressed', 'false');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Activer le thème clair');
        themeToggle.setAttribute('aria-pressed', 'true');
    }
});

// ==================== MOBILE MENU ====================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        const isMobile = window.innerWidth <= 768;
        target.scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth' });
        mobileMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    });
});

// ==================== SKILLS ====================
const skills = [
    {name: "Front-end", items: ["HTML5", "CSS3", "JavaScript", "Responsive Design"], icon: "fas fa-code"},
    {name: "Développement & données", items: ["PHP", "MySQL"], icon: "fas fa-database"},
    {name: "Outils & CMS", items: ["Git", "GitHub", "WordPress"], icon: "fas fa-screwdriver-wrench"},
    {name: "Conception", items: ["UX/UI"], icon: "fas fa-pen-ruler"}
];

function renderSkills() {
    const container = document.getElementById('skills-grid');
    container.innerHTML = '';

    skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-bar';
        div.innerHTML = `
            <div class="skill-heading">
                <i class="${skill.icon}" aria-hidden="true"></i>
                <h3>${skill.name}</h3>
            </div>
            <ul class="skill-list">${skill.items.map(item => `<li>${item}</li>`).join('')}</ul>
        `;
        container.appendChild(div);
    });
}
renderSkills();

// ==================== PROJETS ====================
const projects = [
    {
        title: "Site BTP",
        category: "site",
        img: "images/site de-btp.png",
        desc: "Site vitrine conçu avec WordPress pour une entreprise de Bâtiment et Travaux Publics.",
        tags: ["WordPress", "Design Web", "Responsive"],
        github: null,
        live: null
    },
    {
        title: "Site de Formulaire",
        category: "site",
        img: "images/site-formulaire.png",
        desc: "Site avec formulaire interactif et validation des données en temps réel, réalisé en HTML, CSS et JavaScript.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: null,
        live: null
    },
    {
        title: "Gestion des Étudiants",
        category: "application",
        img: "images/gestion des-etudiants.png",
        desc: "Application permettant de créer, modifier et consulter des fiches d'étudiants.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: null,
        live: null
    },
    {
        title: "Portfolio personnel",
        category: "site",
        img: "images/portfolio.png",
        desc: "Ce portfolio, développé en HTML, CSS et JavaScript, présente mes projets et compétences.",
        tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        github: "https://github.com/Barrybachir-dev/portfolio",
        live: "https://Barrybachir-dev.github.io/portfolio"
    }
];

function renderProjects(filteredProjects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-haspopup', 'dialog');
        card.setAttribute('aria-label', `Voir les détails du projet ${project.title}`);
        card.innerHTML = `
            <img src="${project.img}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click', () => showProjectModal(project));
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showProjectModal(project);
            }
        });
        grid.appendChild(card);
    });
}

let modalTrigger = null;
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');

function showProjectModal(project) {
    const body = document.getElementById('modal-body');
    modalTrigger = document.activeElement;
    const links = [
        project.github && `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn primary">Voir sur GitHub</a>`,
        project.live && `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn secondary">Voir en ligne</a>`
    ].filter(Boolean).join('');

    body.innerHTML = `
        <h2 id="modal-title">${project.title}</h2>
        <img src="${project.img}" style="width:100%; border-radius:16px; margin:1rem 0;" alt="${project.title}">
        <p>${project.desc}</p>
        ${links ? `<div class="modal-links">${links}</div>` : ''}
    `;
    projectModal.style.display = 'flex';
    projectModal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
}

function closeProjectModal() {
    projectModal.style.display = 'none';
    projectModal.setAttribute('aria-hidden', 'true');
    if (modalTrigger instanceof HTMLElement) modalTrigger.focus();
}

modalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', event => {
    if (event.target === projectModal) closeProjectModal();
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && projectModal.getAttribute('aria-hidden') === 'false') {
        closeProjectModal();
    }
});

// Filtres des projets
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.setAttribute('aria-pressed', String(b === btn));
        });
        
        const filter = btn.getAttribute('data-filter');
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
        renderProjects(filtered);
    });
});

renderProjects(projects);

// ==================== FORMULAIRE DE CONTACT ====================
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    contactStatus.hidden = false;
    contactStatus.dataset.state = '';
    contactStatus.textContent = 'Envoi en cours…';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' }
        });
        const result = await response.json();

        if (!response.ok || result.success === false || result.success === 'false') {
            throw new Error(result.message || 'Le service de contact a refusé le message.');
        }

        contactStatus.dataset.state = 'success';
        contactStatus.textContent = 'Message envoyé. Merci de m’avoir contacté.';
        contactForm.reset();
    } catch (error) {
        console.error('Échec de l’envoi du formulaire de contact :', error);
        contactStatus.dataset.state = 'error';
        contactStatus.textContent = 'Le message n’a pas pu être envoyé. Si c’est le premier envoi, vérifie l’e-mail d’activation FormSubmit. Tu peux aussi m’écrire directement à barryelbachir@gmail.com.';
    } finally {
        submitButton.disabled = false;
    }
});