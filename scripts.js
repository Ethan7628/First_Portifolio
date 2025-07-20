// Highlight active navigation item based on scroll position
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-menu .nav-item, .mobile-nav .nav-item');
    const navbar = document.querySelector('.navbar');

    // Add scrolled class to navbar
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Highlight active nav item
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('a').getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Show sections on scroll with animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Trigger home animations on load
window.addEventListener('load', function () {
    const home = document.querySelector('#home');
    if (home) {
        home.classList.add('show');

        // Animate home elements sequentially
        const homeElements = [
            home.querySelector('h1'),
            home.querySelector('h2'),
            home.querySelector('p'),
            home.querySelector('.btn-sci'),
            home.querySelector('.img-box')
        ];

        homeElements.forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
});

// Mobile Menu Toggle - CORRECTED VERSION
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
}

hamburger.addEventListener('click', toggleMenu);

// Add keyboard support for hamburger menu
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// Close menu when clicking a link or scrolling
document.querySelectorAll('.mobile-nav .nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

window.addEventListener('scroll', () => {
    if (mobileNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    const texts = ['FullStack Developer', 'Designer', 'Youtuber', 'Blogger'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
});

// Skills Animation
const skillsSection = document.querySelector('#portfolio');
const skillItems = document.querySelectorAll('.skill-item');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            
            // Animate skill bars
            document.querySelectorAll('.skill-progress').forEach(progress => {
                const width = progress.getAttribute('data-width');
                setTimeout(() => {
                    progress.style.width = width + '%';
                }, 500);
            });
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation and submission feedback
            const submitBtn = form.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1000);
        });
    }
});
