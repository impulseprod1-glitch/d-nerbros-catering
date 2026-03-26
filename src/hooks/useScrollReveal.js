import { useEffect, useCallback } from 'react';

/**
 * Hook to trigger reveal animations on scroll using Intersection Observer.
 * Adds 'reveal-active' class to elements with 'reveal' class when they enter viewport.
 */
const useScrollReveal = () => {
    const observeElements = useCallback(() => {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(revealCallback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const revealElements = document.querySelectorAll('.reveal:not(.reveal-active)');
        revealElements.forEach(el => observer.observe(el));
        
        return observer;
    }, []);

    useEffect(() => {
        const observerInstance = observeElements();

        const mutationObserver = new MutationObserver((mutations) => {
            let hasNewReveals = false;
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList.contains('reveal') || node.querySelector('.reveal')) {
                            hasNewReveals = true;
                        }
                    }
                });
            });
            if (hasNewReveals) observeElements();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            observerInstance.disconnect();
            mutationObserver.disconnect();
        };
    }, [observeElements]);

    return observeElements;
};

export default useScrollReveal;
