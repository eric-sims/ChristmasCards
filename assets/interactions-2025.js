/**
 * Subtle Interactive Enhancements for 2025 Christmas Card
 * - Smooth scroll-based fade-in animations
 * - Respects user's motion preferences
 * - Performant using Intersection Observer API
 */

console.log("Interactions 2025 loaded!");

// ========================================
// Scroll-based Fade-in Animations
// ========================================

/**
 * Initialize fade-in animations for content elements
 * Elements fade in as they enter the viewport while scrolling
 */
const initScrollAnimations = () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        console.log("User prefers reduced motion - animations disabled");
        return;
    }
    
    // Select elements to animate (paragraphs and images)
    const elementsToAnimate = document.querySelectorAll('.card p, .card img');
    
    // Add fade-in class to all elements
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in-element');
    });
    
    // Create intersection observer for fade-in effect
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
        threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small stagger delay for consecutive elements
                const delay = index * 50; // 50ms stagger between elements
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Stop observing once animated (only animate once)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    console.log(`Scroll animations initialized for ${elementsToAnimate.length} elements`);
};

// ========================================
// Initialize on Page Load
// ========================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    // DOM is already ready
    initScrollAnimations();
}

// ========================================
// Handle Dynamic Motion Preference Changes
// ========================================

// Listen for changes in motion preference (e.g., user changes system settings)
const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
motionMediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
        // User now prefers reduced motion - make all elements visible immediately
        document.querySelectorAll('.fade-in-element').forEach(element => {
            element.classList.add('visible');
        });
        console.log("Motion preference changed - animations disabled");
    }
});
