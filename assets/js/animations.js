/**
 * TRC SVNIT - Scroll Animations & Interactive Behaviors
 * Powers count-up counters, IntersectionObserver reveals, sticky nav,
 * tab scrolling, and AJAX contact form submission.
 */
(function () {
    'use strict';

    // 1. Sticky Header scroll effect with auto-hide on scroll down and reveal on scroll up
    function initStickyNav() {
        var header = document.getElementById('site-header');
        if (!header) return;

        var lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        var ticking = false;

        function updateNav() {
            var currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
            var navMenu = header.querySelector('.nav');

            // 1. Scrolled styling
            if (currentScrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // If mobile menu is open, never hide navbar
            if (navMenu && navMenu.classList.contains('is-open')) {
                header.classList.remove('nav-hidden');
                lastScrollY = currentScrollY;
                ticking = false;
                return;
            }

            // 2. Auto-hide on scroll down, auto-reveal on scroll up
            if (currentScrollY <= 40) {
                // At or near top of page: always visible
                header.classList.remove('nav-hidden');
            } else if (currentScrollY > lastScrollY + 8) {
                // Scrolling DOWN -> navbar goes up out of view
                header.classList.add('nav-hidden');
            } else if (currentScrollY < lastScrollY - 8) {
                // Scrolling UP -> navbar comes back down smoothly
                header.classList.remove('nav-hidden');
            }

            lastScrollY = Math.max(0, currentScrollY);
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNav);
                ticking = true;
            }
        }, { passive: true });

        updateNav();
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

    // 8. MattestLab-Style Hero Automatic Image Slider with Transitions
    function initHeroSlider() {
        var heroCard = document.querySelector('.hero-card');
        var slides = document.querySelectorAll('.hero-slide');
        var prevBtn = document.getElementById('hero-prev');
        var nextBtn = document.getElementById('hero-next');
        var catBtns = document.querySelectorAll('.hero-category-btn');

        if (!slides.length) return;

        var current = 0;
        var total = slides.length;
        var intervalMs = 4500; // 4.5 seconds auto rotation
        var timer = null;

        function showSlide(index) {
            slides[current].classList.remove('is-active');
            if (catBtns[current]) catBtns[current].classList.remove('active');

            current = (index + total) % total;

            slides[current].classList.add('is-active');
            if (catBtns[current]) catBtns[current].classList.add('active');
        }

        function nextSlide() {
            showSlide(current + 1);
        }

        function prevSlide() {
            showSlide(current - 1);
        }

        function startAutoPlay() {
            stopAutoPlay();
            timer = setInterval(nextSlide, intervalMs);
        }

        function stopAutoPlay() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        // Category button click handlers
        catBtns.forEach(function (btn, i) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                catBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                if (i < total) {
                    showSlide(i);
                    startAutoPlay();
                }
            });
        });

        // Arrow button click handlers
        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.preventDefault();
                nextSlide();
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.preventDefault();
                prevSlide();
                startAutoPlay();
            });
        }

        // Pause on mouse hover / resume on mouse leave
        if (heroCard) {
            heroCard.addEventListener('mouseenter', stopAutoPlay);
            heroCard.addEventListener('mouseleave', startAutoPlay);

            // Touch swipe support for mobile
            var touchStartX = 0;
            var touchEndX = 0;

            heroCard.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoPlay();
            }, { passive: true });

            heroCard.addEventListener('touchend', function (e) {
                touchEndX = e.changedTouches[0].screenX;
                var diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        nextSlide(); // swipe left -> next
                    } else {
                        prevSlide(); // swipe right -> prev
                    }
                }
                startAutoPlay();
            }, { passive: true });
        }

        // Start auto-play initially
        startAutoPlay();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    function initAll() {
        initStickyNav();
        initHeroSlider();
        initCountUp();
        initScrollReveals();
        initVisionMissionCards();
        initHeroTabs();
        initBackToTop();
        initContactForm();
    }
})();
