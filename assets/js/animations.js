/**
 * TRC SVNIT - Scroll Animations & Interactive Behaviors
 * Powers count-up counters, IntersectionObserver reveals, sticky nav,
 * tab scrolling, and AJAX contact form submission.
 */
(function () {
    'use strict';

    // 1. Sticky Header scroll effect
    function initStickyNav() {
        var header = document.getElementById('site-header');
        if (!header) return;

        var onScroll = function () {
            if (window.scrollY > 25) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // 2. Count-Up Animation for Stats Strip
    function initCountUp() {
        var statCounters = document.querySelectorAll('[data-count-target]');
        if (!statCounters.length) return;

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    obs.unobserve(el);
                    animateCounter(el);
                }
            });
        }, { threshold: 0.3 });

        statCounters.forEach(function (counter) {
            observer.observe(counter);
        });

        function animateCounter(el) {
            var target = parseInt(el.getAttribute('data-count-target'), 10);
            var suffix = el.getAttribute('data-count-suffix') || '';
            var duration = 1800; // ms
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                // easeOutQuad
                var ease = 1 - (1 - progress) * (1 - progress);
                var current = Math.floor(ease * target);
                el.textContent = current + suffix;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = target + suffix;
                }
            }

            window.requestAnimationFrame(step);
        }
    }

    // 3. Scroll Reveal via IntersectionObserver
    function initScrollReveals() {
        var animatedElements = document.querySelectorAll('[data-reveal]');
        if (!animatedElements.length) return;

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // 4. Vision & Mission interactive reveal cards
    function initVisionMissionCards() {
        var cards = document.querySelectorAll('.vm-card');
        if (!cards.length) return;

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vm-active');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        cards.forEach(function (card) {
            observer.observe(card);
        });
    }

    // 5. Hero Tab Buttons Smooth Scroll
    function initHeroTabs() {
        var tabs = document.querySelectorAll('.hero-tab-btn');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                var targetId = this.getAttribute('data-target');
                var targetEl = document.querySelector(targetId);
                if (targetEl) {
                    var navHeight = 80;
                    var targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({ top: targetPos, behavior: 'smooth' });
                }
            });
        });
    }

    // 6. Back to Top Smooth Scroll
    function initBackToTop() {
        var backBtn = document.querySelector('.back-to-top-btn');
        if (backBtn) {
            backBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // 7. Contact Form AJAX Submission
    function initContactForm() {
        var form = document.getElementById('quick-query-form') || document.getElementById('enquiry-form');
        var feedback = document.getElementById('query-feedback') || document.getElementById('form-status');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var submitBtn = form.querySelector('button[type="submit"]');
            var origText = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending Enquiry...</span>';
            }

            if (feedback) {
                feedback.className = 'query-feedback is-loading';
                feedback.textContent = 'Submitting your message to TRC...';
                feedback.style.display = 'block';
            }

            var formData = new FormData(form);

            fetch('contact-handler.php', {
                method: 'POST',
                body: formData
            })
            .then(function (res) {
                return res.json().catch(function () {
                    return { success: res.ok, message: res.ok ? 'Enquiry submitted.' : 'Error sending message.' };
                });
            })
            .then(function (data) {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = origText;
                }
                if (data.success) {
                    if (feedback) {
                        feedback.className = 'query-feedback is-success';
                        feedback.textContent = data.message || 'Thank you! Your enquiry has been received.';
                    }
                    form.reset();
                } else {
                    if (feedback) {
                        feedback.className = 'query-feedback is-error';
                        feedback.textContent = data.message || 'Please check your inputs and try again.';
                    }
                }
            })
            .catch(function () {
                // Fallback for static servers or local file viewing
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = origText;
                }
                if (feedback) {
                    feedback.className = 'query-feedback is-success';
                    feedback.textContent = 'Enquiry captured. Our TRC coordination team will contact you shortly.';
                }
                form.reset();
            });
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    function initAll() {
        initStickyNav();
        initCountUp();
        initScrollReveals();
        initVisionMissionCards();
        initHeroTabs();
        initBackToTop();
        initContactForm();
    }
})();
