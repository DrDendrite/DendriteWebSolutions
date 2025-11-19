// DendriteWebSolutions - Main JavaScript File
// All interactive functionality for the website

class DendriteWebApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupHeaderScroll();
        this.setupContactForm();
        this.setupServiceCards();
        this.setupProjectsCarousel();
        this.setupBackToTop();
        this.createParticles();
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                const navLinks = document.getElementById('navLinks');
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu if open
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Fade in Animation on Scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Header Background Change on Scroll
    setupHeaderScroll() {
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > CONFIG.animations.scrollOffset) {
                    header.style.background = 'rgba(26, 26, 26, 0.98)';
                } else {
                    header.style.background = 'rgba(26, 26, 26, 0.95)';
                }
            });
        }
    }

    // Contact Form Handling
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert(CONFIG.form.errorMessage);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Submit form (works with both Web3Forms and Formspree)
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert(CONFIG.form.successMessage);
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Sorry, there was an error sending your message. Please try again or email us directly at info@dendritewebsolutions.com');
        })
        .finally(() => {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // Interactive Service Cards
    setupServiceCards() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Projects Carousel Functionality
    setupProjectsCarousel() {
        const carousel = document.getElementById('projectsCarousel');
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!carousel || !track || !prevBtn || !nextBtn) return;

        let currentSlide = 0;
        const totalSlides = projectCards.length;
        let autoPlayInterval;

        // Update carousel position
        const updateCarousel = () => {
            const translateX = -currentSlide * 25;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update active states
            projectCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentSlide);
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        };

        // Next slide
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        };

        // Previous slide
        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        };

        // Go to specific slide
        const goToSlide = (slideIndex) => {
            currentSlide = slideIndex;
            updateCarousel();
        };

        // Auto-play functionality
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 4000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Event listeners
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoPlay();
                goToSlide(index);
                startAutoPlay();
            });
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoPlay();
        });

        carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', () => {
            const difference = startX - endX;
            const threshold = 50;

            if (Math.abs(difference) > threshold) {
                if (difference > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoPlay();
        });

        // Initialize
        updateCarousel();
        startAutoPlay();
    }

    // Back to Top Button Functionality
    setupBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        if (!backToTopButton) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Create Floating Particles
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = window.innerWidth < 768 
            ? CONFIG.animations.particleCountMobile 
            : CONFIG.animations.particleCount;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            // Random neon colors
            const colors = [
                CONFIG.colors.neonMagenta,
                CONFIG.colors.neonCyan,
                CONFIG.colors.neonGreen,
                CONFIG.colors.neonYellow
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 3px ${color}`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Utility function for typing effect (if needed later)
    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Performance optimization for mobile
    optimizeForMobile() {
        if (window.innerWidth < 768) {
            // Reduce particles on mobile
            document.querySelectorAll('.particle').forEach((particle, index) => {
                if (index > CONFIG.animations.particleCountMobile) {
                    particle.remove();
                }
            });
        }
    }
}

// Initialize the application
const app = new DendriteWebApp();