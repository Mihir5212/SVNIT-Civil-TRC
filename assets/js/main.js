/*
 * TRC website: builds the header, footer and page content from data.js.
 * You normally only need to edit data.js; this file controls how things are shown.
 */
(function () {
    'use strict';

    var D = window.TRC;
    if (!D) {
        document.body.insertAdjacentHTML('afterbegin',
            '<p style="padding:16px;background:#fdecea;font-family:sans-serif">The content file (assets/js/data.js) could not be read. ' +
            'Check it for a missing comma or quote.</p>');
        return;
    }
    var S = D.site;
    var page = document.body.getAttribute('data-page') || '';
    var params = new URLSearchParams(window.location.search);

    /* ---------- Helpers ---------- */

    function esc(v) {
        return String(v == null ? '' : v)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    function fmtDate(iso, long) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
        if (!m) { return esc(iso); }
        return parseInt(m[3], 10) + ' ' + (long ? MONTHS_LONG : MONTHS)[parseInt(m[2], 10) - 1] + ' ' + m[1];
    }

    function excerpt(text, len) {
        text = String(text || '').replace(/\s+/g, ' ').trim();
        if (text.length <= len) { return text; }
        var cut = text.slice(0, len);
        var sp = cut.lastIndexOf(' ');
        return cut.slice(0, sp > 0 ? sp : len).replace(/[ ,.;:]+$/, '') + '…';
    }

    /* Blank line = new paragraph; lines starting with "- " = bullet list */
    function renderText(text) {
        text = String(text || '').replace(/\r\n?/g, '\n').trim();
        if (!text) { return ''; }
        return text.split(/\n\s*\n/).map(function (block) {
            var lines = block.trim().split('\n');
            var isList = lines.every(function (l) { return /^\s*[-*•]\s+/.test(l); });
            if (isList) {
                return '<ul>' + lines.map(function (l) { return '<li>' + esc(l.replace(/^\s*[-*•]\s+/, '')) + '</li>'; }).join('') + '</ul>';
            }
            return '<p>' + lines.map(esc).join('<br>') + '</p>';
        }).join('');
    }

    function projectYears(p) {
        var s = p.startYear, f = p.endYear;
        if (s && f && s !== f) { return s + '–' + f; }
        if (s && p.status === 'ongoing') { return 'Since ' + s; }
        return String(s || f || '');
    }

    function arrowSvg(dir, cls) {
        var rot = { right: 0, left: 180, up: -90, down: 90 }[dir || 'right'] || 0;
        return '<svg class="' + (cls || 'arrow') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<g transform="rotate(' + rot + ' 12 12)"><path d="M3 10h11V5l8 7-8 7v-5H3z" fill="currentColor"/></g></svg>';
    }

    function initials(name) {
        var parts = String(name).replace(/^(dr|prof|mr|ms|mrs)\.?\s+/i, '').trim().split(/\s+/);
        return parts.slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join('') || '?';
    }

    function telHref(phone) { return 'tel:' + String(phone).replace(/[^0-9+]/g, ''); }

    function byDateDesc(a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : (b.id || 0) - (a.id || 0); }

    function sortProjects(list) {
        return list.slice().sort(function (a, b) {
            var oa = a.status === 'ongoing' ? 0 : 1, ob = b.status === 'ongoing' ? 0 : 1;
            if (oa !== ob) { return oa - ob; }
            var ya = a.endYear || a.startYear || 0, yb = b.endYear || b.startYear || 0;
            if (ya !== yb) { return yb - ya; }
            return (b.id || 0) - (a.id || 0);
        });
    }

    function sortPubs(list) {
        return list.map(function (p, i) { return [p, i]; })
            .sort(function (a, b) { return (b[0].year - a[0].year) || (a[1] - b[1]); })
            .map(function (x) { return x[0]; });
    }

    function set(id, html) {
        var el = document.getElementById(id);
        if (el) { el.innerHTML = html; }
        return el;
    }

    function hide(id) {
        var el = document.getElementById(id);
        if (el) { el.hidden = true; }
    }

    /* ---------- Shared pieces ---------- */

    function pageHead(title, lead, backHref, backLabel) {
        return '<section class="page-head"><div class="wrap">' +
            (backHref ? '<p class="back-link"><a href="' + backHref + '">' + arrowSvg('left') + esc(backLabel) + '</a></p>' : '') +
            '<h1>' + esc(title) + '</h1>' +
            (lead ? '<p class="lead">' + esc(lead) + '</p>' : '') +
            '</div></section>';
    }

    function projectMedia(p) {
        if (p.image) {
            return '<div class="project-media"><img src="' + esc(p.image) + '" alt="" loading="lazy"></div>';
        }
        return '<div class="project-media is-empty" aria-hidden="true"><span>' + esc(D.sectors[p.sector] || 'Project') + '</span></div>';
    }

    function statusTag(p) {
        return '<span class="status status-' + esc(p.status) + '">' + esc(D.statuses[p.status] || p.status) + '</span>';
    }

    function projectCard(p, large) {
        var years = projectYears(p);
        return '<article class="project-card' + (large ? ' is-large' : '') + '">' +
            projectMedia(p) +
            '<div class="project-body">' +
            '<p class="project-meta">' + statusTag(p) + (years ? '<span>' + esc(years) + '</span>' : '') + '</p>' +
            '<h3><a href="project.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.title) + '</a></h3>' +
            (p.client ? '<p class="project-client">' + esc(p.client) + (p.location ? ', ' + esc(p.location) : '') + '</p>' : '') +
            (large && p.summary ? '<p class="project-summary">' + esc(excerpt(p.summary, 240)) + '</p>' : '') +
            '</div></article>';
    }

    function pubItem(p) {
        var title = p.link
            ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>'
            : esc(p.title);
        return '<li class="pub">' +
            '<p class="pub-authors">' + esc(p.authors) + ' (' + esc(p.year) + ')</p>' +
            '<p class="pub-title">' + title + '</p>' +
            '<p class="pub-venue">' + esc(p.venue || '') + ' <span class="pub-type">' + esc(D.pubTypes[p.type] || p.type) + '</span></p>' +
            '</li>';
    }

    function newsListItem(n, headingTag, showThumb) {
        return '<li><time datetime="' + esc(n.date) + '">' + fmtDate(n.date) + '</time>' +
            '<div><' + headingTag + '><a href="news-item.html?id=' + encodeURIComponent(n.id) + '">' + esc(n.title) + '</a></' + headingTag + '>' +
            (n.summary ? '<p>' + esc(headingTag === 'h3' ? excerpt(n.summary, 160) : n.summary) + '</p>' : '') + '</div>' +
            (showThumb && n.image ? '<img class="news-thumb" src="' + esc(n.image) + '" alt="" loading="lazy">' : '') +
            '</li>';
    }

    function notFound(what, backHref, backLabel) {
        document.title = 'Not found | ' + S.short + ', ' + S.instituteShort;
        return '<section class="section"><div class="wrap narrow not-found">' +
            '<h1>This ' + what + ' could not be found</h1>' +
            '<p>The link may be old, or the item may have been removed.</p>' +
            '<p><a class="text-link" href="' + backHref + '">' + esc(backLabel) + '</a></p></div></section>';
    }

    /* ---------- Header and footer ---------- */

    function renderHeader() {
        var menu = [
            ['index.html', 'Home', 'home'],
            ['about.html', 'About', 'about'],
            ['services.html', 'Services', 'services'],
            ['projects.html', 'Projects', 'projects'],
            ['publications.html', 'Publications', 'publications'],
            ['news.html', 'News', 'news'],
            ['team.html', 'Team', 'team'],
        ];
        var active = { project: 'projects', 'news-item': 'news' }[page] || page;
        var html = '';
        if (S.previewNotice) {
            html += '<div class="preview-bar" role="note"><div class="wrap">' + esc(S.previewNotice) + '</div></div>';
        }
        html += '<header class="site-header"><div class="wrap header-inner">' +
            '<a class="brand" href="index.html"><span class="brand-logos"><img class="brand-logo-svnit" src="assets/img/svnit-logo.png" alt="' + esc(S.instituteShort) + '" width="50" height="48"><img src="assets/img/logo-mark.svg" alt="" width="46" height="46"></span>' +
            '<span class="brand-text"><strong>' + esc(S.name) + '</strong><span>' + esc(S.dept) + ', ' + esc(S.instituteShort) + '</span></span></a>' +
            '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="nav-toggle-bars" aria-hidden="true"></span><span>Menu</span></button>' +
            '<nav id="site-nav" class="site-nav" aria-label="Main"><ul>' +
            menu.map(function (m) {
                return '<li><a href="' + m[0] + '"' + (active === m[2] ? ' aria-current="page"' : '') + '>' + m[1] + '</a></li>';
            }).join('') +
            '</ul><a class="btn btn-primary nav-cta" href="contact.html"' + (active === 'contact' ? ' aria-current="page"' : '') + '>Send an enquiry</a></nav>' +
            '</div></header>';
        var slot = document.getElementById('site-header');
        if (slot) { slot.outerHTML = html; }
    }

    function renderFooter() {
        var html = '<footer class="site-footer"><div class="wrap footer-grid">' +
            '<div class="footer-about"><a class="brand brand-footer" href="index.html"><span class="brand-logos"><img class="brand-logo-svnit" src="assets/img/svnit-logo.png" alt="' + esc(S.instituteShort) + '" width="46" height="44"><img src="assets/img/logo-mark.svg" alt="" width="40" height="40"></span>' +
            '<span class="brand-text"><strong>' + esc(S.name) + '</strong><span>' + esc(S.dept) + '</span></span></a>' +
            '<p>' + esc(S.institute) + '</p></div>' +
            '<div><h2 class="footer-head">Pages</h2><ul class="footer-links">' +
            '<li><a href="about.html">About TRC</a></li><li><a href="services.html">Services</a></li>' +
            '<li><a href="projects.html">Projects</a></li><li><a href="publications.html">Publications</a></li>' +
            '<li><a href="news.html">News</a></li><li><a href="team.html">Team</a></li></ul></div>' +
            '<div><h2 class="footer-head">Contact</h2><address>' + S.address.map(esc).join('<br>') + '<br>' +
            '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a><br>' +
            '<a href="' + esc(telHref(S.phone)) + '">' + esc(S.phone) + '</a></address>' +
            '<p><a class="footer-cta" href="contact.html">Send an enquiry</a></p></div>' +
            '</div><div class="wrap footer-bottom"><p>&copy; ' + new Date().getFullYear() + ' ' + esc(S.name) + ', ' +
            esc(S.dept) + ', ' + esc(S.instituteShort) + '</p></div></footer>';
        var slot = document.getElementById('site-footer');
        if (slot) { slot.outerHTML = html; }
    }

    // Fill any element marked data-email / data-phone with the contact details
    function fillContactBits() {
        document.querySelectorAll('[data-email]').forEach(function (a) {
            a.textContent = S.email;
            a.setAttribute('href', 'mailto:' + S.email);
        });
        document.querySelectorAll('[data-phone]').forEach(function (a) {
            a.textContent = S.phone;
            a.setAttribute('href', telHref(S.phone));
        });
    }

    /* ---------- Pages ---------- */

    var pages = {};

    pages.home = function () {
        var sign = D.services.slice(0, 4);
        set('hero-sign',
            '<span class="sign-shield" aria-hidden="true">' + esc(S.short) + '</span><ul>' +
            sign.map(function (s) {
                return '<li><a href="services.html#' + esc(s.id) + '"><span>' + esc(s.title) + '</span>' + arrowSvg('right', 'sign-arrow') + '</a></li>';
            }).join('') + '</ul>' +
            '<a class="sign-more" href="services.html">All ' + D.services.length + ' services</a>');

        set('home-services', D.services.map(function (s) {
            return '<li><a href="services.html#' + esc(s.id) + '"><h3>' + esc(s.title) + '</h3><p>' + esc(s.short) + '</p></a></li>';
        }).join(''));

        // Moving client strip. The list repeats until it can fill a very wide screen,
        // then the whole set is doubled so the scroll loops without a visible jump.
        var clients = D.clients || [];
        if (clients.length) {
            var loop = [];
            while (loop.length < 12) { loop = loop.concat(clients); }
            set('home-clients', '<ul class="client-track" style="animation-duration:' + (loop.length * 3.5) + 's">' +
                loop.concat(loop).map(function (c, i) {
                    var copy = i >= clients.length;
                    return '<li class="client-tile"' + (copy ? ' aria-hidden="true"' : '') + '>' +
                        (c.logo ? '<img src="' + esc(c.logo) + '" alt="' + (copy ? '' : esc(c.name)) + '">' : '<span>' + esc(c.name) + '</span>') +
                        '</li>';
                }).join('') + '</ul>');
        } else {
            hide('clients-section');
        }

        var featured = D.projects.filter(function (p) { return p.featured; }).slice(0, 3);
        if (featured.length < 3) {
            featured = featured.concat(sortProjects(D.projects.filter(function (p) { return !p.featured; })).slice(0, 3 - featured.length));
        }
        if (featured.length) {
            set('home-featured', featured.map(function (p, i) { return projectCard(p, i === 0); }).join(''));
        } else {
            hide('featured-section');
        }

        var news = D.news.slice().sort(byDateDesc).slice(0, 3);
        var pubs = sortPubs(D.publications).slice(0, 3);
        if (news.length) { set('home-news', news.map(function (n) { return newsListItem(n, 'h3', false); }).join('')); } else { hide('home-news-col'); }
        if (pubs.length) { set('home-pubs', pubs.map(pubItem).join('')); } else { hide('home-pubs-col'); }
        if (!news.length && !pubs.length) { hide('updates-section'); }
    };

    pages.about = function () {
        set('count-projects', String(D.projects.length));
        set('count-pubs', String(D.publications.length));
        set('count-faculty', String(D.team.filter(function (m) { return m.group === 'faculty'; }).length));
    };

    pages.services = function () {
        set('services-index', '<ul>' + D.services.map(function (s) {
            return '<li><a href="#' + esc(s.id) + '">' + esc(s.title) + '</a></li>';
        }).join('') + '</ul>');
        set('services-detail', D.services.map(function (s) {
            return '<article class="service" id="' + esc(s.id) + '"><h2>' + esc(s.title) + '</h2><p>' + esc(s.text) + '</p>' +
                '<h3>Typical outputs</h3><ul>' + s.outputs.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul>' +
                '<p class="service-ask"><a class="text-link" href="contact.html?service=' + encodeURIComponent(s.id) + '">Ask about ' +
                esc(s.title.charAt(0).toLowerCase() + s.title.slice(1)) + '</a></p></article>';
        }).join(''));
        // Jump to the service in the link (content is added after the page loads)
        if (window.location.hash) {
            var target = document.getElementById(window.location.hash.slice(1));
            if (target) { setTimeout(function () { target.scrollIntoView(); }, 0); }
        }
        // Highlight the service being read in the side list
        var links = {};
        document.querySelectorAll('#services-index a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
        if ('IntersectionObserver' in window) {
            var obs = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) {
                    if (en.isIntersecting && links[en.target.id]) {
                        Object.keys(links).forEach(function (k) { links[k].classList.remove('is-active'); });
                        links[en.target.id].classList.add('is-active');
                    }
                });
            }, { rootMargin: '-20% 0px -70% 0px' });
            document.querySelectorAll('.service[id]').forEach(function (s) { obs.observe(s); });
        }
    };

    pages.projects = function () {
        var status = params.get('status') || '';
        var sector = params.get('sector') || '';
        if (!D.statuses[status]) { status = ''; }
        if (!D.sectors[sector]) { sector = ''; }

        function link(st, se) {
            var q = [];
            if (st) { q.push('status=' + st); }
            if (se) { q.push('sector=' + se); }
            return 'projects.html' + (q.length ? '?' + q.join('&') : '');
        }

        var chips = '<a class="chip" href="' + link('', sector) + '"' + (!status ? ' aria-current="true"' : '') + '>All</a>' +
            Object.keys(D.statuses).map(function (k) {
                return '<a class="chip" href="' + link(k, sector) + '"' + (status === k ? ' aria-current="true"' : '') + '>' + esc(D.statuses[k]) + '</a>';
            }).join('');
        set('status-chips', chips);

        var used = {};
        D.projects.forEach(function (p) { used[p.sector] = true; });
        var sel = document.getElementById('sector-select');
        if (sel) {
            sel.innerHTML = '<option value="">All areas</option>' + Object.keys(D.sectors).filter(function (k) { return used[k]; }).map(function (k) {
                return '<option value="' + k + '"' + (sector === k ? ' selected' : '') + '>' + esc(D.sectors[k]) + '</option>';
            }).join('');
            sel.addEventListener('change', function () { window.location.href = link(status, sel.value); });
        }

        var list = sortProjects(D.projects.filter(function (p) {
            return (!status || p.status === status) && (!sector || p.sector === sector);
        }));
        if (list.length) {
            set('result-count', list.length + (list.length === 1 ? ' project' : ' projects'));
            set('project-grid', list.map(function (p) { return projectCard(p, false); }).join(''));
        } else {
            set('result-count', '');
            set('project-grid', '');
            set('projects-empty', '<p>No projects match these filters.</p><p><a class="text-link" href="projects.html">Show all projects</a></p>');
        }
    };

    pages.project = function () {
        var id = params.get('id');
        var p = D.projects.filter(function (x) { return String(x.id) === id; })[0];
        if (!p) { set('content', notFound('project', 'projects.html', 'Show all projects')); return; }

        document.title = p.title + ' | ' + S.short + ', ' + S.instituteShort;
        var years = projectYears(p);
        var facts = '';
        if (p.client) { facts += '<div><dt>Client</dt><dd>' + esc(p.client) + '</dd></div>'; }
        if (p.location) { facts += '<div><dt>Location</dt><dd>' + esc(p.location) + '</dd></div>'; }
        if (D.sectors[p.sector]) { facts += '<div><dt>Area of work</dt><dd>' + esc(D.sectors[p.sector]) + '</dd></div>'; }
        if (years) { facts += '<div><dt>Period</dt><dd>' + esc(years) + '</dd></div>'; }
        facts += '<div><dt>Status</dt><dd>' + statusTag(p) + '</dd></div>';

        var related = D.projects.filter(function (x) { return x.id !== p.id && x.sector === p.sector; }).slice(0, 3);

        set('content',
            pageHead(p.title, '', 'projects.html', 'All projects') +
            '<section class="section section-tight"><div class="wrap detail-layout"><div class="detail-main">' +
            (p.image ? '<figure class="detail-image"><img src="' + esc(p.image) + '" alt=""></figure>' : '') +
            (p.summary ? '<p class="lead-text">' + esc(p.summary) + '</p>' : '') +
            '<div class="prose">' + renderText(p.description) + '</div></div>' +
            '<aside class="detail-facts"><dl>' + facts + '</dl>' +
            '<a class="btn btn-primary btn-block" href="contact.html">Discuss a similar project</a></aside></div></section>' +
            (related.length ? '<section class="section section-concrete"><div class="wrap"><h2>Related projects</h2><div class="project-grid">' +
                related.map(function (r) { return projectCard(r, false); }).join('') + '</div></div></section>' : ''));
    };

    pages.publications = function () {
        var type = params.get('type') || '';
        if (!D.pubTypes[type]) { type = ''; }
        set('type-chips', '<a class="chip" href="publications.html"' + (!type ? ' aria-current="true"' : '') + '>All</a>' +
            Object.keys(D.pubTypes).map(function (k) {
                return '<a class="chip" href="publications.html?type=' + k + '"' + (type === k ? ' aria-current="true"' : '') + '>' + esc(D.pubTypes[k]) + 's</a>';
            }).join(''));

        var list = sortPubs(D.publications.filter(function (p) { return !type || p.type === type; }));
        if (!list.length) {
            set('pub-years', '<div class="empty"><p>No publications listed' + (type ? ' of this type' : '') + ' yet.</p></div>');
            return;
        }
        var html = '', year = null;
        list.forEach(function (p) {
            if (p.year !== year) {
                if (year !== null) { html += '</ul></section>'; }
                year = p.year;
                html += '<section class="pub-year"><h2>' + esc(year) + '</h2><ul class="pub-list">';
            }
            html += pubItem(p);
        });
        set('pub-years', html + '</ul></section>');
    };

    pages.news = function () {
        var list = D.news.slice().sort(byDateDesc);
        if (list.length) {
            set('news-list', list.map(function (n) { return newsListItem(n, 'h2', true); }).join(''));
        } else {
            set('news-list', '');
            set('news-empty', '<p>No news posted yet.</p>');
        }
    };

    pages['news-item'] = function () {
        var id = params.get('id');
        var n = D.news.filter(function (x) { return String(x.id) === id; })[0];
        if (!n) { set('content', notFound('news item', 'news.html', 'Show all news')); return; }
        document.title = n.title + ' | ' + S.short + ', ' + S.instituteShort;
        set('content',
            pageHead(n.title, '', 'news.html', 'All news') +
            '<section class="section section-tight"><div class="wrap narrow">' +
            '<p class="news-date"><time datetime="' + esc(n.date) + '">' + fmtDate(n.date, true) + '</time></p>' +
            (n.image ? '<figure class="detail-image"><img src="' + esc(n.image) + '" alt=""></figure>' : '') +
            (n.summary ? '<p class="lead-text">' + esc(n.summary) + '</p>' : '') +
            '<div class="prose">' + renderText(n.body) + '</div></div></section>');
    };

    pages.team = function () {
        var members = D.team.slice().sort(function (a, b) { return (a.order || 100) - (b.order || 100) || a.name.localeCompare(b.name); });
        var html = '';
        Object.keys(D.teamGroups).forEach(function (g) {
            var list = members.filter(function (m) { return m.group === g; });
            if (!list.length) { return; }
            html += '<section class="team-group"><h2>' + esc(D.teamGroups[g]) + '</h2><ul class="team-grid' + (g === 'faculty' ? ' is-faculty' : '') + '">' +
                list.map(function (m) {
                    var photo = m.photo
                        ? '<img class="person-photo" src="' + esc(m.photo) + '" alt="" loading="lazy">'
                        : '<span class="person-photo is-initials" aria-hidden="true">' + esc(initials(m.name)) + '</span>';
                    var links = '';
                    if (m.email) { links += '<a href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>'; }
                    if (m.profile) { links += '<a href="' + esc(m.profile) + '" target="_blank" rel="noopener">Profile</a>'; }
                    return '<li class="person">' + photo + '<div class="person-text"><h3>' + esc(m.name) + '</h3>' +
                        (m.designation ? '<p class="person-role">' + esc(m.designation) + '</p>' : '') +
                        (m.expertise ? '<p class="person-areas">' + esc(m.expertise) + '</p>' : '') +
                        (links ? '<p class="person-links">' + links + '</p>' : '') + '</div></li>';
                }).join('') + '</ul></section>';
        });
        set('team-groups', html || '<div class="empty"><p>Team details will be added soon.</p></div>');
    };

    pages.contact = function () {
        set('contact-address', S.address.map(esc).join('<br>'));
        set('contact-hours', esc(S.hours));
        if (S.mapEmbed) {
            set('contact-map', '<iframe src="' + esc(S.mapEmbed) + '" title="Map showing SVNIT Surat" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>');
        } else {
            hide('contact-map');
        }

        var form = document.getElementById('enquiry-form');
        if (!form) { return; }
        var select = form.elements.service;
        var labels = {};
        D.services.forEach(function (s) { labels[s.id] = s.title; });
        labels.other = 'Something else';
        Object.keys(labels).forEach(function (k) {
            var o = document.createElement('option');
            o.value = k;
            o.textContent = labels[k];
            select.appendChild(o);
        });
        if (labels[params.get('service')]) { select.value = params.get('service'); }

        var usingEmailApp = !S.formEndpoint;
        if (usingEmailApp) {
            set('form-note', 'Sending opens your email app with these details filled in. Press Send there to deliver it.');
        }

        function showError(name, msg) {
            var field = form.elements[name];
            var holder = field.closest('.field');
            var err = holder.querySelector('.field-error');
            if (!err) {
                err = document.createElement('span');
                err.className = 'field-error';
                err.id = 'err-' + name;
                holder.appendChild(err);
            }
            err.textContent = msg;
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', err.id);
        }
        function clearErrors() {
            form.querySelectorAll('.field-error').forEach(function (e) { e.remove(); });
            form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); f.removeAttribute('aria-describedby'); });
        }
        function status(type, html) {
            var box = document.getElementById('form-status');
            box.className = 'notice notice-' + type;
            box.innerHTML = html;
            box.hidden = false;
            box.focus();
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();
            var v = function (n) { return (form.elements[n].value || '').trim(); };
            var errors = 0;
            if (!v('name')) { showError('name', 'Enter your name.'); errors++; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) { showError('email', 'Enter a valid email address so we can reply.'); errors++; }
            if (v('phone') && !/^[0-9+\-\s()]{6,20}$/.test(v('phone'))) { showError('phone', 'Enter the phone number using digits only.'); errors++; }
            if (!labels[v('service')]) { showError('service', 'Choose the type of work.'); errors++; }
            if (v('message').length < 20) { showError('message', 'Describe the work in a few sentences (at least 20 characters).'); errors++; }
            if (errors) {
                status('error', '<p>Some details need fixing. Check the highlighted fields below.</p>');
                return;
            }
            if (v('_gotcha')) { // spam trap
                status('success', '<h2>Enquiry sent</h2><p>Thank you.</p>');
                form.reset();
                return;
            }

            var service = labels[v('service')];
            if (usingEmailApp) {
                var body = 'Name: ' + v('name') + '\nOrganisation: ' + v('organisation') + '\nEmail: ' + v('email') +
                    '\nPhone: ' + v('phone') + '\nType of work: ' + service + '\n\n' + v('message');
                window.location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Website enquiry: ' + service) +
                    '&body=' + encodeURIComponent(body);
                status('success', '<h2>Your email app should now be open</h2><p>The enquiry is filled in there. Press <strong>Send</strong> in your email app to deliver it. ' +
                    'If no email app opened, write to <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a> directly.</p>');
                return;
            }

            var data = new FormData(form);
            data.set('service', service);
            data.append('_subject', 'Website enquiry: ' + service);
            var btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Sending…';
            fetch(S.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
                .then(function (r) {
                    if (!r.ok) { throw new Error('send failed'); }
                    form.reset();
                    status('success', '<h2>Enquiry sent</h2><p>Thank you. Your enquiry has reached the TRC team, and we will reply to the email address you gave.</p>');
                })
                .catch(function () {
                    status('error', '<p>The enquiry could not be sent. Check your internet connection and try again, or email ' +
                        '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a> directly.</p>');
                })
                .then(function () {
                    btn.disabled = false;
                    btn.textContent = 'Send enquiry';
                });
        });
    };

    /* ---------- Start ---------- */

    renderHeader();
    renderFooter();
    fillContactBits();
    if (pages[page]) { pages[page](); }

    // Mobile menu
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (toggle && nav) {
        var setOpen = function (open) {
            nav.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        };
        toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
        });
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) { setOpen(false); }
        });
    }
})();
