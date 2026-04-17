// ==================== DARK MODE ====================
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
themeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// ==================== MOBILE MENU ====================
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('show');
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        document.getElementById('mobile-menu').classList.remove('show');
    });
});

// ==================== SCROLL ANIMATIONS ====================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// ==================== TYPING EFFECT ====================
const phrases = [
    "Développeur Web Front-end",
    "Étudiant en Licence Informatique",
    "Passionné par le développement"
];
let i = 0, j = 0, isDeleting = false;

function type() {
    const el = document.getElementById('typing');
    const current = phrases[i];

    if (isDeleting) {
        el.textContent = current.substring(0, j - 1);
        j--;
    } else {
        el.textContent = current.substring(0, j + 1);
        j++;
    }

    if (!isDeleting && j === current.length) {
        setTimeout(() => isDeleting = true, 1600);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
    }
    setTimeout(type, isDeleting ? 45 : 75);
}
type();

// ==================== SKILLS ====================
const skills = [
    {name: "HTML5 & CSS3", level: 90, icon: "fa-code"},
    {name: "JavaScript", level: 82, icon: "fa-js"},
    {name: "Responsive Design", level: 88, icon: "fa-mobile"},
    {name: "PHP & MySQL", level: 70, icon: "fa-database"},
    {name: "Git & GitHub", level: 75, icon: "fa-git"},
    {name: "Portfolio Design", level: 85, icon: "fa-briefcase"}
];

function renderSkills() {
    const container = document.getElementById('skills-grid');
    container.innerHTML = '';

    skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-bar';
        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                <i class="fas ${skill.icon}" style="font-size:1.8rem; color:var(--accent);"></i>
                <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <strong style="font-size:1.05rem;">${skill.name}</strong>
                        <span style="background:linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:700;">${skill.level}%</span>
                    </div>
                </div>
            </div>
            <div class="progress-container">
                <div class="progress-bar" data-width="${skill.level}"></div>
            </div>
        `;
        container.appendChild(div);
    });

    // Animation des barres au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.progress-bar').forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width') + '%';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(container);
}
renderSkills();

// ==================== PROJETS ====================
const projects = [
    {
        title: "Site BTP",
        category: "frontend",
        img: "images/site de-btp.png",
        desc: "Site vitrine pour une entreprise de Bâtiment et Travaux Publics (BTP). Créé avec WordPress. Design moderne, responsive et optimisé pour la conversion.",
        tags: ["WordPress", "Design Web", "Responsive"],
        github: "#",
        live: "#"
    },
    {
        title: "Site de Formulaire",
        category: "frontend",
        img: "images/site-formulaire.png",
        desc: "Site interactif avec formulaire moderne et fonctionnel. Validation des données en temps réel, design épuré et responsive. Parfait pour collecter des informations utilisateur.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "#",
        live: "#"
    },
    {
        title: "Gestion des Étudiants",
        category: "frontend",
        img: "images/gestion des-etudiants.png",
        desc: "Application de gestion d'étudiants avec interface conviviale. Permet de créer, modifier et consulter les informations des étudiants. Interface intuitive et performante.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "#",
        live: "#"
    },
    {
        title: "Mon Portfolio Personnel",
        category: "frontend",
        img: "images/portfolio.png",
        desc: "Mon portfolio professionnel que j'ai entièrement conçu et développé. Showcasing de mes projets et compétences avec un design moderne, animations fluides et dark mode intégré.",
        tags: ["HTML", "CSS", "JavaScript", "Portfolio Design"],
        github: "#",
        live: "#"
    },
    {
        title: "Ce Portfolio Personnel",
        category: "frontend",
        img: "images/photo-profil.jpeg",
        desc: "Mon premier portfolio publié sur GitHub. Entièrement codé avec HTML, CSS et JavaScript. Inclut dark mode, menu mobile, animations fluides et filtrage de projets.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "#",
        live: "#"
    }
];

function renderProjects(filteredProjects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.img}" alt="${project.title}">
            <div style="padding:1.6rem;">
                <h3>${project.title}</h3>
                <p style="margin:12px 0; opacity:0.85;">${project.desc}</p>
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">
                    ${project.tags.map(tag => `<span style="background:rgba(108,92,231,0.12); color:#6c5ce7; padding:5px 14px; border-radius:20px; font-size:0.85rem;">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click', () => showProjectModal(project));
        grid.appendChild(card);
    });
}

function showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const body = document.getElementById('modal-body');
    body.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.img}" style="width:100%; border-radius:16px; margin:1rem 0;" alt="${project.title}">
        <p>${project.desc}</p>
        <div style="margin-top:2rem;">
            <a href="${project.github}" target="_blank" class="btn primary" style="margin-right:12px;">Voir sur GitHub</a>
            <a href="${project.live}" target="_blank" class="btn secondary">Voir en ligne</a>
        </div>
    `;
    modal.style.display = 'flex';
}

document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'none';
});

// Filtres des projets
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
        renderProjects(filtered);
    });
});

renderProjects(projects);

// ==================== FORMULAIRE ====================
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Merci pour ton message ! Je te répondrai dès que possible.");
    this.reset();
});