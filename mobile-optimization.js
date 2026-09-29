// Mobile Optimization and Responsive Design JavaScript
// This file contains mobile-specific functionality for the enhanced product section

// Mobile navigation functionality
function initializeMobileNavigation() {
    const mobileToggle = document.querySelector('#mobile-nav-toggle, .mobile-nav-toggle');
    const navLinks = document.querySelector('#nav-links, .nav-links');
    const navItems = document.querySelectorAll('#nav-links a, .nav-links a');
    
    if (!mobileToggle || !navLinks) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        const isOpen = navLinks.classList.contains('active');
        
        if (isOpen) {
            closeMobileNavigation();
        } else {
            openMobileNavigation();
        }
    });
    
    // Close menu when clicking nav items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            closeMobileNavigation();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            closeMobileNavigation();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMobileNavigation();
        }
    });
}

function openMobileNavigation() {
    const navLinks = document.querySelector('#nav-links, .nav-links');
    const mobileToggle = document.querySelector('#mobile-nav-toggle, .mobile-nav-toggle');
    
    navLinks.classList.add('active');
    mobileToggle.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
}

function closeMobileNavigation() {
    const navLinks = document.querySelector('#nav-links, .nav-links');
    const mobileToggle = document.querySelector('#mobile-nav-toggle, .mobile-nav-toggle');
    
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    
    if (mobileToggle) {
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Responsive optimizations
function initializeResponsiveOptimizations() {
    // Optimize touch targets for mobile
    optimizeTouchTargets();
    
    // Initialize responsive image loading
    initializeResponsiveImages();
    
    // Setup orientation change handling
    handleOrientationChange();
    
    // Initialize swipe gestures for mobile
    if (isTouchDevice()) {
        initializeSwipeGestures();
    }
    
    // Initialize viewport height fix
    initializeViewportHeightFix();
}

// Optimize touch targets for mobile devices
function optimizeTouchTargets() {
    if (!isTouchDevice()) return;
    
    const colorOptions = document.querySelectorAll('.color-option');
    const buttons = document.querySelectorAll('.btn, .btn-details, .order-now');
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    // Ensure minimum touch target size (44px x 44px)
    [...colorOptions, ...buttons, ...paymentOptions].forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            element.style.minWidth = '44px';
            element.style.minHeight = '44px';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        }
    });
}

// Initialize responsive image loading
function initializeResponsiveImages() {
    const images = document.querySelectorAll('.product-image');
    
    images.forEach(image => {
        // Add loading state
        image.addEventListener('loadstart', function() {
            this.style.opacity = '0.5';
        });
        
        // Remove loading state when loaded
        image.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle image errors
        image.addEventListener('error', function() {
            this.style.opacity = '1';
            console.warn('Failed to load image:', this.src);
        });
    });
}

// Handle orientation changes
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // Close mobile menu on orientation change
        closeMobileNavigation();
        
        // Recalculate viewport height
        setTimeout(() => {
            initializeViewportHeightFix();
        }, 500);
    });
}

// Initialize swipe gestures for mobile navigation
function initializeSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Swipe right to open menu (from left edge)
        if (deltaX > 100 && Math.abs(deltaY) < 100 && startX < 50) {
            openMobileNavigation();
        }
        
        // Swipe left to close menu
        if (deltaX < -100 && Math.abs(deltaY) < 100) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                closeMobileNavigation();
            }
        }
    }, { passive: true });
}

// Fix viewport height issues on mobile browsers
function initializeViewportHeightFix() {
    // Set CSS custom property for actual viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update on resize
    window.addEventListener('resize', function() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

// Utility function to detect touch devices
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// Enhanced mobile-specific product hover functionality
function enhanceMobileProductHovers() {
    const enhancedProductCards = document.querySelectorAll('.product-card.enhanced, .product-detail-card.enhanced');
    
    enhancedProductCards.forEach(card => {
        const overlay = card.querySelector('.product-hover-overlay');
        const detailsBtn = overlay?.querySelector('.btn-details');
        
        if (!detailsBtn) return;
        
        // Touch device optimizations
        if (isTouchDevice()) {
            // Show overlay on touch/tap for mobile
            card.addEventListener('touchstart', function(e) {
                // Hide all other overlays first
                enhancedProductCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherOverlay = otherCard.querySelector('.product-hover-overlay');
                        if (otherOverlay) {
                            otherOverlay.style.opacity = '0';
                        }
                    }
                });
                
                // Show current overlay
                overlay.style.opacity = '1';
            }, { passive: true });
            
            // Hide overlay after delay on mobile
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    overlay.style.opacity = '0';
                }, 3000);
            }, { passive: true });
        }
        
        // Improve focus management
        detailsBtn.setAttribute('tabindex', '0');
        detailsBtn.setAttribute('role', 'button');
    });
}

// Enhanced touch-optimized color selection
function enhanceMobileColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (!isTouchDevice() || !colorOptions.length) return;
    
    colorOptions.forEach((option, index) => {
        // Enhanced touch feedback
        option.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        option.addEventListener('touchend', function(e) {
            this.style.transform = '';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }, { passive: true });
        
        // Prevent double-tap zoom on color options
        option.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
}

// Mobile-specific button enhancements
function enhanceMobileButtons() {
    const buttons = document.querySelectorAll('.btn, .btn-details, .order-now');
    
    buttons.forEach(button => {
        // Touch-friendly button interactions
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
        
        // Prevent double-tap zoom on buttons
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
}

// Initialize all mobile optimizations
function initializeMobileOptimizations() {
    if (isTouchDevice()) {
        enhanceMobileProductHovers();
        enhanceMobileColorSelection();
        enhanceMobileButtons();
        
        // Add touch device class to body
        document.body.classList.add('touch-device');
        
        console.log('🔧 Mobile optimizations initialized');
    } else {
        document.body.classList.add('no-touch');
        console.log('🖥️ Desktop optimizations initialized');
    }
}

// Enhanced keyboard navigation for mobile accessibility
function enhanceKeyboardNavigation() {
    // Enhanced keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Add focus styles for keyboard navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            closeMobileNavigation();
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Performance optimization for mobile
function optimizeMobilePerformance() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initializeViewportHeightFix();
            optimizeTouchTargets();
        }, 250);
    });
    
    // Optimize scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Close mobile menu on scroll
            if (window.scrollY > 100) {
                closeMobileNavigation();
            }
        }, 100);
    }, { passive: true });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileNavigation();
    initializeResponsiveOptimizations();
    initializeMobileOptimizations();
    enhanceKeyboardNavigation();
    optimizeMobilePerformance();
    
    console.log('📱 Mobile responsive design and optimization initialized');
});