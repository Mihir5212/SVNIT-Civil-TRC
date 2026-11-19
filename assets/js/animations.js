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

    // 8. Automatic Smooth Hero Image Slider with Seamless Crossfade & Ken Burns
    function initHeroSlider() {
        var heroCard = document.querySelector('.hero-vela-card') || document.querySelector('.hero-card');
        var slides = document.querySelectorAll('.hero-slide');

        if (!slides.length) return;

        var current = 0;
        var total = slides.length;
        var intervalMs = 4200; // 4.2 seconds auto rotation
        var timer = null;

        // Initialize slide layering
        slides.forEach(function (s, i) {
            if (i === 0) {
                s.classList.add('is-active');
                s.style.zIndex = '3';
                s.style.opacity = '1';
            } else {
                s.classList.remove('is-active');
                s.style.zIndex = '1';
                s.style.opacity = '0';
            }
        });

        function showSlide(nextIndex) {
            var targetIndex = (nextIndex + total) % total;
            if (targetIndex === current) return;

            var prevIndex = current;
            current = targetIndex;

            // Incoming slide at z-index 3 (fades in)
            // Outgoing slide at z-index 2 (fades out)
            // Others at z-index 1 (hidden)
            slides.forEach(function (s, idx) {
                if (idx === current) {
                    s.style.zIndex = '3';
                    s.classList.add('is-active');
                    s.style.opacity = '1';
                } else if (idx === prevIndex) {
                    s.style.zIndex = '2';
                    s.classList.remove('is-active');
                    s.style.opacity = '0';
                } else {
                    s.style.zIndex = '1';
                    s.classList.remove('is-active');
                    s.style.opacity = '0';
                }
            });
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

        // Mobile touch swipe support
        if (heroCard) {
            var touchStartX = 0;
            var touchEndX = 0;

            heroCard.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            heroCard.addEventListener('touchend', function (e) {
                touchEndX = e.changedTouches[0].screenX;
                var diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    startAutoPlay();
                }
            }, { passive: true });
        }

        // Auto-pause when tab is hidden, resume when visible
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });

        // Start auto-play initially
        startAutoPlay();
    }

    // 9. Vela-Style Dynamic Hero Clock Engine
    function initVelaHero() {
        var heroCard = document.querySelector('.hero-vela-card');
        if (!heroCard) return;

        var slotItems = heroCard.querySelectorAll('.vela-headline-slot .vela-slot-item');
        var gradientLayers = heroCard.querySelectorAll('.vela-gradient-layer');
        if (!slotItems.length || !gradientLayers.length) return;

        // Check prefers-reduced-motion
        var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) return;

        var SLOT_DURATION = 1750; // 1.75s per verb
        var TOTAL_WORDS = 4;
        var CYCLE_DURATION = SLOT_DURATION * TOTAL_WORDS; // 7.0s cycle

        var startTime = performance.now();
        var pausedTime = 0;
        var pauseStart = 0;
        var isPaused = false;

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                isPaused = true;
                pauseStart = performance.now();
            } else {
                if (pauseStart > 0) {
                    pausedTime += performance.now() - pauseStart;
                }
                isPaused = false;
            }
        });

        function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
        }

        function easeInCubic(x) {
            return Math.pow(x, 3);
        }

        function tick(now) {
            if (!isPaused) {
                var elapsed = now - startTime - pausedTime;
                if (elapsed < 0) elapsed = 0;

                var cycleTime = elapsed % CYCLE_DURATION;
                var activeIndex = Math.floor(cycleTime / SLOT_DURATION);
                var slotTime = cycleTime % SLOT_DURATION;

                // 1. Slot Word & Icon Animation
                for (var i = 0; i < slotItems.length; i++) {
                    var item = slotItems[i];
                    var iconWrap = item.querySelector('.vela-icon-wrapper');

                    if (i === activeIndex) {
                        item.style.display = 'inline-flex';
                        item.classList.add('active');

                        var opacity = 1;
                        var translateY = 0;
                        var blur = 0;
                        var scale = 1;
                        var iconScale = 1;
                        var iconRotate = 0;

                        // Enter phase: first 500 ms (0.5 s)
                        if (slotTime < 500) {
                            var enterProgress = slotTime / 500;
                            var easedEnter = easeOutCubic(enterProgress);

                            opacity = easedEnter;
                            translateY = (1 - easedEnter) * 0.32; // rises from +0.32em
                            blur = (1 - easedEnter) * 10; // blur 10px -> 0
                            scale = 0.96 + easedEnter * 0.04; // 0.96 -> 1

                            // Icon follows 60ms later
                            var iconTime = Math.max(0, slotTime - 60);
                            var iconProgress = Math.min(1, iconTime / 440);
                            var easedIcon = easeOutCubic(iconProgress);
                            iconScale = 0.7 + easedIcon * 0.3; // 0.7 -> 1
                            iconRotate = (1 - easedIcon) * -14; // -14deg -> 0deg
                        }
                        // Leave phase: last 420 ms
                        else if (slotTime > (SLOT_DURATION - 420)) {
                            var leaveProgress = (slotTime - (SLOT_DURATION - 420)) / 420;
                            var easedLeave = easeInCubic(leaveProgress);

                            opacity = 1 - easedLeave;
                            translateY = -easedLeave * 0.16; // drifts up 0.16em
                            blur = easedLeave * 8; // blurs to 8px
                            scale = 1;
                        }

                        // Gentle idle float on icon: ±0.028em, ±3deg
                        var idlePhase = elapsed * 0.0022;
                        var idleY = Math.sin(idlePhase) * 0.028;
                        var idleRot = Math.cos(idlePhase * 0.8) * 3;

                        item.style.opacity = opacity;
                        item.style.transform = 'translateY(' + translateY + 'em) scale(' + scale + ')';
                        item.style.filter = blur > 0.1 ? 'blur(' + blur + 'px)' : 'none';

                        if (iconWrap) {
                            iconWrap.style.transform = 'translateY(' + idleY + 'em) scale(' + iconScale + ') rotate(' + (iconRotate + idleRot) + 'deg)';
                        }
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('active');
                        item.style.opacity = 0;
                    }
                }

                // 2. Crossfade Gradient Layers with Gentle Drift
                for (var g = 0; g < gradientLayers.length; g++) {
                    var layer = gradientLayers[g];
                    if (g === activeIndex) {
                        layer.classList.add('active');
                    } else {
                        layer.classList.remove('active');
                    }

                    var driftTime = elapsed * 0.0006 + g;
                    var driftX = Math.sin(driftTime) * 2.2;
                    var driftY = Math.cos(driftTime * 0.8) * 1.6;
                    layer.style.transform = 'translate3d(' + driftX + '%, ' + driftY + '%, 0) scale(1.08)';
                }
            }

            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    // 10. Auto-play video on scroll view and auto-pause on scroll down / out of view
    function initVideoAutoplay() {
        var video = document.querySelector('.about-intro-video');
        if (!video) return;

        // Browsers strictly require muted for programmatic autoplay
        video.muted = true;

        if ('IntersectionObserver' in window) {
            var videoObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                        video.muted = true;
                        var promise = video.play();
                        if (promise !== undefined) {
                            promise.catch(function () {
                                video.muted = true;
                                video.play().catch(function () {});
                            });
                        }
                    } else {
                        // Auto close / pause when scrolled down past or away
                        video.pause();
                    }
                });
            }, {
                threshold: [0, 0.25, 0.5]
            });

            videoObserver.observe(video);
        }
    }

    // 11. GSAP Animated Counter Effects on Stats Banner (15+, 40+, 120+, 100+)
    function initStatsBannerGSAP() {
        var card = document.querySelector('.stats-banner-card');
        var numberEls = document.querySelectorAll('.stats-banner-number');
        if (!card || !numberEls.length) return;

        function runCounters() {
            numberEls.forEach(function (el) {
                var target = parseInt(el.getAttribute('data-target') || el.textContent, 10);
                var suffix = el.getAttribute('data-suffix') || '+';
                if (isNaN(target)) return;

                if (typeof gsap !== 'undefined') {
                    var counterObj = { val: 0 };
                    gsap.to(counterObj, {
                        val: target,
                        duration: 2.0,
                        ease: "power2.out",
                        onUpdate: function () {
                            el.textContent = Math.floor(counterObj.val) + suffix;
                        },
                        onComplete: function () {
                            el.textContent = target + suffix;
                        }
                    });
                } else {
                    var start = null;
                    var dur = 1800;
                    function step(ts) {
                        if (!start) start = ts;
                        var p = Math.min((ts - start) / dur, 1);
                        var ease = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.floor(ease * target) + suffix;
                        if (p < 1) requestAnimationFrame(step);
                        else el.textContent = target + suffix;
                    }
                    requestAnimationFrame(step);
                }
            });
        }

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(card,
                { opacity: 0.7, y: 36, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        onEnter: function () {
                            runCounters();
                        }
                    }
                }
            );
        } else if ('IntersectionObserver' in window) {
            var statsObserver = new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        obs.unobserve(entry.target);
                        runCounters();
                    }
                });
            }, { threshold: 0.25 });
            statsObserver.observe(card);
        } else {
            runCounters();
        }
    }

    // 12. Dynamic Calculation for Service Button Arrow Glide
    function initServiceButtons() {
        var buttons = document.querySelectorAll('.srv-photo-btn');
        if (!buttons.length) return;

        function updateMetrics() {
            buttons.forEach(function (btn) {
                var textEl = btn.querySelector('.srv-btn-text');
                var circleEl = btn.querySelector('.srv-btn-arrow-circle');
                if (textEl && circleEl) {
                    var textWidth = textEl.offsetWidth;
                    var circleWidth = circleEl.offsetWidth;
                    var gap = 10;
                    btn.style.setProperty('--btn-text-shift', (circleWidth + gap) + 'px');
                    btn.style.setProperty('--btn-circle-shift', '-' + (textWidth + gap) + 'px');
                }
            });
        }

        updateMetrics();
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(updateMetrics);
        }
        window.addEventListener('resize', updateMetrics);
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
        initVelaHero();
        initCountUp();
        initScrollReveals();
        initVisionMissionCards();
        initHeroTabs();
        initBackToTop();
        initContactForm();
        initVideoAutoplay();
        initStatsBannerGSAP();
        initServiceButtons();
    }
})();
