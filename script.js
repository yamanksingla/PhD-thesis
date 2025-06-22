// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.theme-card, .contribution-item, .future-card, .download-card');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Add loading state to buttons when clicked
    const downloadButtons = document.querySelectorAll('.btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.href && this.href.includes('.pdf')) {
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = '<i class="fas fa-download"></i> Download Thesis (PDF)';
                }, 3000);
            }
        });
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call once to set initial state

    // Add mobile menu functionality (if needed in future)
    const createMobileMenu = () => {
        // This can be expanded if mobile menu is needed
        console.log('Mobile menu functionality ready for implementation');
    };

    // Copy email to clipboard functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary tooltip or notification
                    showTooltip(this, 'Email copied to clipboard!');
                });
            }
        });
    });

    // Tooltip function
    function showTooltip(element, message) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            background: #1e293b;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

        // Animate in
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);

        // Remove after 2 seconds
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        }, 2000);
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Add any keyboard shortcuts here if needed
        if (e.key === 'Escape') {
            // Close any open modals or menus
            console.log('Escape key pressed');
        }
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll-heavy functions
    const debouncedScrollHandler = debounce(function() {
        updateActiveNav();
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Add print functionality
    const addPrintStyles = () => {
        const printStyles = `
            @media print {
                .no-print { display: none !important; }
                .print-only { display: block !important; }
                body { font-size: 12pt; line-height: 1.4; }
                h1 { font-size: 18pt; }
                h2 { font-size: 16pt; }
                h3 { font-size: 14pt; }
                .hero { page-break-after: always; }
                .section { page-break-inside: avoid; }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = printStyles;
        document.head.appendChild(style);
    };

    addPrintStyles();

    console.log('PhD Thesis website initialized successfully!');
}); 