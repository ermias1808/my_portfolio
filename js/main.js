// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

// Initialize content when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('nav-active');
            }
        });
    });

    // Set default profile image if the main one fails to load
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.onerror = function() {
            this.src = '/images/me.jpg';
        };
    }

    // Populate projects
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && typeof projects !== 'undefined') {
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
               <img src="${project.image}" alt="${project.title}" onerror="this.src='/images/me.jpg'">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }

    // Populate skills
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer && typeof skills !== 'undefined') {
        skills.forEach(skillCategory => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            categoryDiv.innerHTML = `
                <h3>${skillCategory.category}</h3>
                <ul class="skill-list">
                    ${skillCategory.items.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            `;
            skillsContainer.appendChild(categoryDiv);
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
});

// Scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});