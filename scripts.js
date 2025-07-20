// Highlight active navigation item based on scroll position
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.navbar ul li');
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
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
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
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Portfolio Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.portfolio-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Update slider position
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        if(currentIndex >= slideCount) currentIndex = 0;
        if(currentIndex < 0) currentIndex = slideCount - 1;
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        currentIndex++;
        if(currentIndex >= slideCount) currentIndex = 0;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex--;
        if(currentIndex < 0) currentIndex = slideCount - 1;
        updateSlider();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-slide (optional)
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
});


const ranges = document.querySelectorAll('#ranges input[type="range"]');

  ranges.forEach(range => {
    function updateBackground() {
      const value = range.value;
      const min = range.min || 0;
      const max = range.max || 100;
      const percentage = ((value - min) / (max - min)) * 100;

      range.style.background = `linear-gradient(to right, #4CAF50 ${percentage}%, #ddd ${percentage}%)`;
    }

    updateBackground();
    range.addEventListener('input', updateBackground);
  });