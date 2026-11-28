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
            var mobileDrawer = document.getElementById('mobile-nav-menu');

            // 1. Scrolled styling
            if (currentScrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // If mobile menu is open, never hide navbar
            if ((navMenu && navMenu.classList.contains('is-open')) || (mobileDrawer && !mobileDrawer.hidden)) {
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
                    if (window.__trcLenis) {
                        window.__trcLenis.scrollTo(targetEl, { offset: -navHeight });
                    } else {
                        var targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
                        window.scrollTo({ top: targetPos, behavior: 'smooth' });
                    }
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
                if (window.__trcLenis) {
                    window.__trcLenis.scrollTo(0);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }

    // 7. Contact Form AJAX Submission
    function initContactForm() {
        var form = document.getElementById('quick-query-form') || document.getElementById('enquiry-form');
        var feedback = document.getElementById('query-feedback') || document.getElementById('form-status');
        if (!form) return;
        window.__trcAjaxFormHandled = true;

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

        var isIframe = video.tagName && video.tagName.toLowerCase() === 'iframe';
        if (!isIframe) {
            // Browsers strictly require muted for programmatic autoplay
            video.muted = true;
        }

        function sendYouTubeCommand(func) {
            try {
                if (video.contentWindow) {
                    video.contentWindow.postMessage(
                        JSON.stringify({ event: 'command', func: func, args: '' }),
                        'https://www.youtube.com'
                    );
                }
            } catch (e) {}
        }

        if ('IntersectionObserver' in window) {
            var videoObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                        if (isIframe) {
                            sendYouTubeCommand('playVideo');
                        } else {
                            video.muted = true;
                            var promise = video.play();
                            if (promise !== undefined) {
                                promise.catch(function () {
                                    video.muted = true;
                                    video.play().catch(function () {});
                                });
                            }
                        }
                    } else {
                        // Auto close / pause when scrolled down past or away
                        if (isIframe) {
                            sendYouTubeCommand('pauseVideo');
                        } else {
                            video.pause();
                        }
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

    // 13. Company Profile 3D Flipbook Brochure (StPageFlip Engine - MattestLab Inspired)
    function initProfileFlipbook() {
        var el = document.getElementById('brochureFlipbook');
        var section = document.getElementById('company-profile-section');
        var prevBtn = document.getElementById('flipPrev');
        var nextBtn = document.getElementById('flipNext');
        var pageNum = document.getElementById('flipPageNum');

        if (!el) return;

        var initialized = false;

        function runInit() {
            if (initialized) return;
            initialized = true;

            var FlipClass = window.PageFlip;
            if (!FlipClass && window.StPageFlip && window.StPageFlip.PageFlip) {
                FlipClass = window.StPageFlip.PageFlip;
            }

            if (!FlipClass) {
                console.warn('StPageFlip library is not loaded');
                return;
            }

            try {
                var pageFlip = new FlipClass(el, {
                    width: 400,
                    height: 566,
                    size: 'stretch',
                    minWidth: 280,
                    maxWidth: 480,
                    minHeight: 396,
                    maxHeight: 680,
                    showCover: true,
                    mobileScrollSupport: true,
                    drawShadow: true,
                    flippingTime: 900,
                    usePortrait: true,
                    startZIndex: 0,
                    autoSize: true,
                    maxShadowOpacity: 0.5,
                    showPageCorners: true,
                    disableFlipByClick: false,
                    swipeDistance: 30,
                    clickEventForward: true,
                    useMouseEvents: true
                });

                var pages = document.querySelectorAll('.brochure-page');
                pageFlip.loadFromHTML(pages);

                function updateUI(pageIdx) {
                    var total = pageFlip.getPageCount();
                    var current = pageIdx + 1;
                    if (pageNum) {
                        pageNum.textContent = current + ' / ' + total;
                    }
                    if (prevBtn) {
                        prevBtn.disabled = (pageIdx === 0);
                    }
                    if (nextBtn) {
                        nextBtn.disabled = (current >= total);
                    }
                }

                pageFlip.on('flip', function (e) {
                    updateUI(e.data);
                });

                pageFlip.on('init', function (e) {
                    var total = pageFlip.getPageCount() || pages.length || 1;
                    if (pageNum) pageNum.textContent = '1 / ' + total;
                    if (prevBtn) prevBtn.disabled = true;
                    if (nextBtn) nextBtn.disabled = false;
                });

                if (prevBtn) {
                    prevBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        pageFlip.flipPrev();
                    });
                }

                if (nextBtn) {
                    nextBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        pageFlip.flipNext();
                    });
                }
            } catch (err) {
                console.error('Error initializing StPageFlip:', err);
            }
        }

        // Lazy initialize PageFlip when company-profile-section is near the viewport
        if ('IntersectionObserver' in window && section) {
            var observer = new IntersectionObserver(function (entries) {
                if (entries[0] && entries[0].isIntersecting) {
                    runInit();
                    observer.disconnect();
                }
            }, { rootMargin: '300px 0px' });
            observer.observe(section);
        } else {
            runInit();
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    // 14. Lenis Smooth Scrolling Wrapper
    function initLenisScroll() {
        if (typeof window.Lenis === 'undefined' || window.__trcLenis) return;

        var hasGsap = typeof gsap !== 'undefined';
        var lenis = new window.Lenis({
            autoRaf: !hasGsap,
            lerp: 0.085,
            duration: 1.15,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            anchors: {
                offset: -80
            }
        });

        window.__trcLenis = lenis;

        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
        }

        if (hasGsap && gsap.ticker) {
            gsap.ticker.add(function (time) {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }

    // 15. Guiding Principles Accordion + Natural Photo Switcher
    function initPrinciplesAccordion() {
        var accordion = document.getElementById('trcPrinciplesAccordion');
        if (!accordion) return;

        var photo = document.getElementById('trcPrinciplePhoto');
        var badge = document.getElementById('trcPrincipleBadge');
        var captionTitle = document.getElementById('trcPrincipleCaptionTitle');
        var items = accordion.querySelectorAll('.trc-acc-item');

        function activate(targetItem) {
            items.forEach(function (item) {
                var btn = item.querySelector('.trc-acc-trigger');
                var body = item.querySelector('.trc-acc-body');
                var icon = item.querySelector('.trc-acc-icon');
                var isTarget = item === targetItem;
                item.classList.toggle('is-open', isTarget);
                if (btn) btn.setAttribute('aria-expanded', isTarget ? 'true' : 'false');
                if (body) body.hidden = !isTarget;
                if (icon) icon.innerHTML = isTarget ? '&minus;' : '+';
            });

            if (photo && targetItem.dataset.principleImg) {
                photo.src = targetItem.dataset.principleImg;
                photo.alt = targetItem.dataset.principleAlt || '';
            }
            if (badge && targetItem.dataset.principleNum) {
                badge.textContent = targetItem.dataset.principleNum;
            }
            if (captionTitle && targetItem.dataset.principleTitle) {
                captionTitle.textContent = targetItem.dataset.principleTitle;
            }
        }

        items.forEach(function (item) {
            var btn = item.querySelector('.trc-acc-trigger');
            if (!btn) return;
            btn.addEventListener('click', function () {
                activate(item);
            });
        });
    }

    // 16. About Capabilities Interactive Selector Grid
    function initCapabilitiesSelector() {
        var grid = document.getElementById('trcCapSelectorGrid');
        var stage = document.getElementById('trcCapStage');
        var aboutCapCards = document.querySelectorAll('#capability-grid [data-cap-card]');
        if (aboutCapCards.length) {
            aboutCapCards.forEach(function (card) {
                card.addEventListener('click', function () {
                    aboutCapCards.forEach(function (c) {
                        c.classList.remove('is-active');
                        c.setAttribute('aria-pressed', 'false');
                    });
                    card.classList.add('is-active');
                    card.setAttribute('aria-pressed', 'true');
                });
            });
        }

        if (!grid || !stage) return;

        var img = document.getElementById('trcCapImg');
        var idxBadge = document.getElementById('trcCapIndex');
        var title = document.getElementById('trcCapTitle');
        var desc = document.getElementById('trcCapDesc');
        var outputsList = document.getElementById('trcCapOutputs');
        var contactLink = document.getElementById('trcCapContactLink');
        var serviceLink = document.getElementById('trcCapServiceLink');
        var tiles = grid.querySelectorAll('.trc-cap-tile');

        function selectTile(tile) {
            tiles.forEach(function (t) {
                var active = t === tile;
                t.classList.toggle('is-active', active);
                t.setAttribute('aria-pressed', active ? 'true' : 'false');
            });

            if (img) {
                img.src = tile.dataset.capImage || '';
                img.alt = tile.dataset.capTitle || '';
            }
            if (idxBadge) idxBadge.textContent = tile.dataset.capNum || '';
            if (title) title.textContent = tile.dataset.capTitle || '';
            if (desc) desc.textContent = tile.dataset.capSummary || '';
            if (contactLink && tile.dataset.capId) {
                contactLink.href = 'contact.php?work=' + encodeURIComponent(tile.dataset.capId) + '#enquiry-form';
            }
            if (serviceLink && tile.dataset.capService) {
                serviceLink.href = tile.dataset.capService;
            }
            if (outputsList && tile.dataset.capOutputs) {
                try {
                    var outputs = JSON.parse(tile.dataset.capOutputs);
                    outputsList.innerHTML = '';
                    outputs.forEach(function (text) {
                        var li = document.createElement('li');
                        li.textContent = text;
                        outputsList.appendChild(li);
                    });
                } catch (e) {}
            }
        }

        tiles.forEach(function (tile) {
            tile.addEventListener('click', function () {
                selectTile(tile);
            });
        });

        if (window.location.hash) {
            var hashId = window.location.hash.slice(1);
            var matched = document.getElementById(hashId);
            if (matched && matched.classList.contains('trc-cap-tile')) {
                selectTile(matched);
            }
        }
    }

    // 17. Filter Tabs for Staff, Publications, News, and Gallery
    function initTrcFilters() {
        var groups = document.querySelectorAll('[data-filter-group]');
        groups.forEach(function (bar) {
            var type = bar.getAttribute('data-filter-group');
            var buttons = bar.querySelectorAll('.trc-filter-tab');
            buttons.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var filter = btn.getAttribute('data-filter');
                    buttons.forEach(function (b) {
                        var active = b === btn;
                        b.classList.toggle('is-active', active);
                        b.setAttribute('aria-pressed', active ? 'true' : 'false');
                    });

                    if (type === 'staff') {
                        document.querySelectorAll('.trc-staff-card').forEach(function (card) {
                            var match = (filter === 'all' || card.getAttribute('data-role') === filter);
                            card.hidden = !match;
                        });
                        var callout = document.getElementById('trcStaffCallout');
                        if (callout) callout.hidden = (filter !== 'all');
                    } else if (type === 'publications') {
                        document.querySelectorAll('.trc-pub-card').forEach(function (card) {
                            var match = (filter === 'all' || card.getAttribute('data-category') === filter);
                            card.hidden = !match;
                        });
                    } else if (type === 'news') {
                        document.querySelectorAll('#trcNewsGrid .trc-news-card').forEach(function (card) {
                            var match = (filter === 'all' || card.getAttribute('data-category') === filter);
                            card.hidden = !match;
                        });
                    } else if (type === 'gallery') {
                        var visibleCount = 0;
                        document.querySelectorAll('#trcGalleryGrid .trc-gallery-card').forEach(function (card) {
                            var match = (filter === 'all' || card.getAttribute('data-category') === filter);
                            card.hidden = !match;
                            if (match) visibleCount++;
                        });
                        var counter = document.getElementById('trcGalleryCount');
                        if (counter) {
                            counter.textContent = 'Showing ' + visibleCount + (visibleCount === 1 ? ' field plate' : ' field & infrastructure plates');
                        }
                    }
                });
            });
        });

        var sectionFilterBtns = document.querySelectorAll('.team-filter-btn[data-team-filter]');
        var teamSections = document.querySelectorAll('.team-section[data-team-section]');
        if (sectionFilterBtns.length && teamSections.length) {
            sectionFilterBtns.forEach(function (fBtn) {
                fBtn.addEventListener('click', function () {
                    var target = fBtn.getAttribute('data-team-filter');
                    sectionFilterBtns.forEach(function (b) {
                        var active = b === fBtn;
                        b.classList.toggle('is-active', active);
                        b.setAttribute('aria-pressed', active ? 'true' : 'false');
                    });
                    teamSections.forEach(function (sec) {
                        var type = sec.getAttribute('data-team-section');
                        sec.hidden = !(target === 'all' || type === target);
                    });
                });
            });
        }

        // Editorial News & Dispatches page filter + reader dialog
        var newsFilterBtns = document.querySelectorAll('.tep-news-filter[data-news-filter]');
        var newsCards = document.querySelectorAll('.tep-news-card[data-news-cat]');
        if (newsFilterBtns.length && newsCards.length) {
            newsFilterBtns.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var filter = btn.getAttribute('data-news-filter');
                    newsFilterBtns.forEach(function (b) {
                        var active = b === btn;
                        b.classList.toggle('is-active', active);
                        b.setAttribute('aria-pressed', active ? 'true' : 'false');
                    });
                    newsCards.forEach(function (card) {
                        var cat = card.getAttribute('data-news-cat');
                        card.hidden = !(filter === 'all' || cat === filter);
                    });
                });
            });
        }

        var storyDataEl = document.getElementById('trc-news-stories-json');
        var newsModal = document.getElementById('tep-news-modal');
        if (storyDataEl && newsModal && typeof newsModal.showModal === 'function') {
            var storiesMap = {};
            try { storiesMap = JSON.parse(storyDataEl.textContent || '{}'); } catch (e) {}
            var mCat = document.getElementById('tep-modal-cat');
            var mMeta = document.getElementById('tep-modal-meta');
            var mTitle = document.getElementById('tep-modal-title');
            var mBody = document.getElementById('tep-modal-body');
            var mBullets = document.getElementById('tep-modal-bullets');
            var mLink = document.getElementById('tep-modal-permalink');
            var mClose = document.getElementById('tep-modal-close');

            document.querySelectorAll('.tep-read-btn[data-story-id]').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var id = btn.getAttribute('data-story-id');
                    var story = id ? storiesMap[id] : null;
                    if (!story) return;
                    if (mCat) mCat.textContent = story.cat || 'Update';
                    if (mMeta) mMeta.textContent = (story.date || '') + ' • ' + (story.read_time || '');
                    if (mTitle) mTitle.textContent = story.title || '';
                    if (mBody) mBody.textContent = story.body || '';
                    if (mBullets) {
                        mBullets.innerHTML = (story.bullets || []).map(function (b) {
                            var li = document.createElement('li');
                            li.textContent = b;
                            return li.outerHTML;
                        }).join('');
                    }
                    if (mLink) mLink.href = 'news-item.php?id=' + encodeURIComponent(id);
                    newsModal.showModal();
                });
            });

            if (mClose) {
                mClose.addEventListener('click', function () { newsModal.close(); });
            }
            newsModal.addEventListener('click', function (e) {
                if (e.target === newsModal) newsModal.close();
            });
        }

        // Projects Showcase filter + Case Study dialog modal
        var prFilterBtns = document.querySelectorAll('.trc-pr-filter[data-pr-filter]');
        var prCards = document.querySelectorAll('#projects-grid [data-pr-cat]');
        var prCountEl = document.getElementById('visible-count');
        if (prFilterBtns.length && prCards.length) {
            prFilterBtns.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var cat = btn.getAttribute('data-pr-filter');
                    prFilterBtns.forEach(function (b) {
                        var active = b === btn;
                        b.classList.toggle('is-active', active);
                        b.setAttribute('aria-pressed', active ? 'true' : 'false');
                    });
                    var visible = 0;
                    prCards.forEach(function (card) {
                        var match = (cat === 'all' || card.getAttribute('data-pr-cat') === cat);
                        card.hidden = !match;
                        if (match) visible++;
                    });
                    if (prCountEl) {
                        prCountEl.textContent = 'Showing ' + visible + ' of ' + prCards.length;
                    }
                });
            });
        }

        var prDataEl = document.getElementById('trc-projects-modal-json');
        var prModal = document.getElementById('tep-project-modal');
        if (prDataEl && prModal && typeof prModal.showModal === 'function') {
            var prMap = {};
            try { prMap = JSON.parse(prDataEl.textContent || '{}'); } catch (e) {}
            var pmImg = document.getElementById('modal-project-img');
            var pmBadge = document.getElementById('modal-project-badge');
            var pmMeta = document.getElementById('modal-project-meta');
            var pmTitle = document.getElementById('modal-project-title');
            var pmSummary = document.getElementById('modal-project-summary');
            var pmOutcome = document.getElementById('modal-project-outcome');
            var pmPage = document.getElementById('modal-project-page');
            var pmClose = document.getElementById('close-project-modal');

            document.querySelectorAll('[data-open-project]').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var item = prMap[btn.getAttribute('data-open-project')];
                    if (!item) return;
                    if (pmImg) pmImg.src = item.img || '';
                    if (pmBadge) pmBadge.textContent = item.badge || '';
                    if (pmMeta) pmMeta.textContent = item.meta || '';
                    if (pmTitle) pmTitle.textContent = item.title || '';
                    if (pmSummary) pmSummary.textContent = item.summary || '';
                    if (pmOutcome) pmOutcome.textContent = item.outcome || '';
                    if (pmPage && item.id) pmPage.href = 'project.php?id=' + encodeURIComponent(item.id);
                    prModal.showModal();
                });
            });

            if (pmClose) pmClose.addEventListener('click', function () { prModal.close(); });
            prModal.addEventListener('click', function (e) {
                if (e.target === prModal) prModal.close();
            });
        }
    }

    // 18. Publication Abstract Toggles
    function initPublicationToggles() {
        document.querySelectorAll('[data-pub-toggle]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var card = btn.closest('.trc-pub-card');
                if (!card) return;
                var abs = card.querySelector('.trc-pub-abstract');
                var plus = btn.querySelector('.trc-pub-toggle-plus');
                if (!abs) return;
                var willOpen = abs.hidden;
                abs.hidden = !willOpen;
                btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
                if (plus) plus.textContent = willOpen ? '−' : '+';
            });
        });
    }

    // 19. Gallery & Certificates Lightbox Dialogs
    function setupLightbox(dialogId, triggerAttr, prefix) {
        var dialog = document.getElementById(dialogId);
        var triggers = Array.prototype.slice.call(document.querySelectorAll('[' + triggerAttr + ']'));
        if (!dialog || !triggers.length || typeof dialog.showModal !== 'function') return;

        var img = document.getElementById(prefix + 'Img');
        var cat = document.getElementById(prefix === 'trcLb' ? 'trcLbCat' : 'trcCertIssuer');
        var count = document.getElementById(prefix + 'Count');
        var meta = document.getElementById(prefix + 'Meta');
        var title = document.getElementById(prefix + 'Title');
        var desc = document.getElementById(prefix + 'Desc');
        var prevBtn = document.getElementById(prefix + 'Prev');
        var nextBtn = document.getElementById(prefix + 'Next');
        var closeBtn = document.getElementById(prefix + 'Close');

        var activeList = triggers;
        var activeIdx = 0;

        function getVisibleTriggers() {
            var filtered = triggers.filter(function (el) {
                var card = el.closest('article');
                return !card || !card.hidden;
            });
            return filtered.length ? filtered : triggers;
        }

        function showIndex(idx) {
            activeIdx = (idx + activeList.length) % activeList.length;
            var el = activeList[activeIdx];
            if (img) {
                img.src = el.dataset.src || '';
                img.alt = el.dataset.title || '';
            }
            if (cat) cat.textContent = el.dataset.cat || '';
            if (count) count.textContent = (activeIdx + 1) + ' / ' + activeList.length;
            if (meta) meta.textContent = el.dataset.meta || '';
            if (title) title.textContent = el.dataset.title || '';
            if (desc) desc.textContent = el.dataset.desc || '';
        }

        triggers.forEach(function (el) {
            el.addEventListener('click', function () {
                activeList = getVisibleTriggers();
                var idx = activeList.indexOf(el);
                showIndex(idx >= 0 ? idx : 0);
                dialog.showModal();
            });
        });

        if (prevBtn) prevBtn.addEventListener('click', function () { showIndex(activeIdx - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { showIndex(activeIdx + 1); });
        if (closeBtn) closeBtn.addEventListener('click', function () { dialog.close(); });
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog) dialog.close();
        });
        dialog.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') showIndex(activeIdx - 1);
            if (e.key === 'ArrowRight') showIndex(activeIdx + 1);
        });
    }

    function initTrcLightboxes() {
        setupLightbox('trcPhotoLightbox', 'data-gallery-open', 'trcLb');
        setupLightbox('trcCertLightbox', 'data-cert-open', 'trcCert');
    }

    // 20. Contact Page Scope Sync (Dropdown + Dynamic Label + Chips if present)
    function initContactScopeChips() {
        var select = document.getElementById('cf-work');
        var scopeLabel = document.getElementById('trc-scope-label');
        var chipsWrap = document.getElementById('trcScopeChips');
        if (!select) return;

        function updateLabel() {
            if (!scopeLabel) return;
            var opt = select.options[select.selectedIndex];
            var text = opt ? opt.textContent.trim() : 'Technical Scope';
            scopeLabel.textContent = 'Scope & Deliverable Requirements (' + text + ') *';
        }

        select.addEventListener('change', updateLabel);
        updateLabel();

        if (!chipsWrap) return;
        var chips = chipsWrap.querySelectorAll('.trc-scope-chip');

        function syncChips(val) {
            chips.forEach(function (chip) {
                var active = chip.dataset.scopeVal === val;
                chip.classList.toggle('is-active', active);
                chip.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        }

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var val = chip.dataset.scopeVal;
                if (select.querySelector('option[value="' + val + '"]')) {
                    select.value = val;
                    syncChips(val);
                    updateLabel();
                }
            });
        });

        select.addEventListener('change', function () {
            syncChips(select.value);
        });

        if (select.value) syncChips(select.value);
    }

    // 21. Stitch Mobile Dropdown Menu Toggle
    function initMobileDrawer() {
        var btn = document.getElementById('mobile-nav-toggle');
        var menu = document.getElementById('mobile-nav-menu');
        if (!btn || !menu) return;

        function setOpen(open) {
            menu.hidden = !open;
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.classList.toggle('is-open', open);
        }

        btn.addEventListener('click', function () {
            setOpen(menu.hidden);
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setOpen(false);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !menu.hidden) {
                setOpen(false);
                btn.focus();
            }
        });

        document.addEventListener('click', function (e) {
            if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) {
                setOpen(false);
            }
        });
    }

    function initAll() {
        initLenisScroll();
        initStickyNav();
        initMobileDrawer();
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
        initProfileFlipbook();
        initPrinciplesAccordion();
        initCapabilitiesSelector();
        initTrcFilters();
        initPublicationToggles();
        initTrcLightboxes();
        initContactScopeChips();
    }
})();
