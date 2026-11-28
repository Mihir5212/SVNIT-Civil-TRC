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

    /* Road-sign pictograms, drawn on a 48 x 48 grid in the current text colour */
    var PICTS = {
        car: '<path fill-rule="evenodd" d="M13 9h22a5 5 0 0 1 4.700 3.300L43 21.600c1.800.8 3 2.600 3 4.600V37a2 2 0 0 1-2 2h-1v2a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2H12v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2H4a2 2 0 0 1-2-2V26.200c0-2 1.200-3.800 3-4.600l3.300-9.300A5 5 0 0 1 13 9zm.6 4.500a1.600 1.600 0 0 0-1.500 1.100L9.800 21h28.400l-2.300-6.400a1.600 1.600 0 0 0-1.500-1.100zM10.500 26a3.500 3.500 0 1 0 0 7 3.500 3.500 0 0 0 0-7zm27 0a3.500 3.500 0 1 0 0 7 3.500 3.500 0 0 0 0-7zM18 28v3h12v-3z"/>',
        warning: '<path d="M24 6 45 42H3z" fill="#fff" stroke="#c8202f" stroke-width="5" stroke-linejoin="round"/><rect x="21.600" y="17" width="4.800" height="13" rx="1"/><circle cx="24" cy="35" r="2.800"/>',
        building: '<path fill-rule="evenodd" d="M7 42V8.500L27 4v38h-7v-8h-6v8zm5-28v4h4v-4zm7 0v4h4v-4zm-7 8v4h4v-4zm7 0v4h4v-4zM30 42V17l11 3v22zm4-17v3h3v-3zm0 7v3h3v-3z"/><rect x="2" y="42" width="44" height="3.500" rx="1"/>',
        signal: '<path d="M16 2h16a3 3 0 0 1 3 3v29a3 3 0 0 1-3 3h-5v9h-6v-9h-5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z"/><circle cx="24" cy="10" r="4.400" fill="#ff4438"/><circle cx="24" cy="20" r="4.400" fill="#ffb300"/><circle cx="24" cy="30" r="4.400" fill="#22d67f"/>',
        bus: '<path fill-rule="evenodd" d="M5 9h38a3 3 0 0 1 3 3v22a2 2 0 0 1-2 2h-2.500a5.500 5.500 0 0 0-11 0H17.500a5.500 5.500 0 0 0-11 0H4a2 2 0 0 1-2-2V12a3 3 0 0 1 3-3zm1.500 4.500V23h8v-9.500zm12 0V23h9v-9.500zm13 0V23h10v-9.500z"/><circle cx="12" cy="37" r="4"/><circle cx="36" cy="37" r="4"/>',
        review: '<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="5"/><path d="M30.500 30.500 44 44" fill="none" stroke="currentColor" stroke-width="6.500" stroke-linecap="round"/><path d="M12.500 20.500l5.200 5.200 9.800-10.600" fill="none" stroke="currentColor" stroke-width="4.200" stroke-linecap="round" stroke-linejoin="round"/>',
        camera: '<rect x="3" y="12" width="29" height="24" rx="3"/><path d="M34 21l11-7.500v21L34 27z"/>',
        photo: '<path fill-rule="evenodd" d="M17 8h14l3 5h8a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V16a3 3 0 0 1 3-3h8zm7 9a9.500 9.500 0 1 0 0 19 9.500 9.500 0 0 0 0-19zm0 4.500a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>',
        cap: '<path d="M24 7 1.500 18 24 29l17-8.300V33h4V18.700z"/><path d="M10.500 26.500V35c0 3.600 6.100 6.500 13.500 6.500S37.500 38.600 37.500 35v-8.500L24 33.200z"/>',
        info: '<circle cx="24" cy="9.500" r="5.500"/><path d="M16.500 19h13v19h4.500v6H14v-6h4.500V25h-2z"/>',
        cone: '<path d="M20.600 5h6.800l2.600 9.600H18zM17 18.600h14l2.700 10H14.300zM13.200 32.600h21.600L37 40h5a2 2 0 0 1 2 2v2H4v-2a2 2 0 0 1 2-2h5z"/>',
        road: '<path fill-rule="evenodd" d="M19 4h10l13 40H6zM22.700 8l-.4 8h3.400l-.4-8zm-1 13-.5 9h5.600l-.5-9zm-1 14-.4 7h7.400l-.4-7z"/>',
        book: '<path d="M3 9.500C9.500 7.200 16.500 7.500 22 11.200V41c-5.500-3.400-12.500-3.700-19-1.700zM45 9.500C38.500 7.200 31.500 7.500 26 11.200V41c5.500-3.400 12.500-3.700 19-1.700z"/>',
        paper: '<path fill-rule="evenodd" d="M4 8h31v29c0 2.200 1.300 4 3.300 4H8a4 4 0 0 1-4-4zm5 5v9h10v-9zm14 0v3h8v-3zm0 6v3h8v-3zM9 26v3h22v-3zm0 6v3h22v-3z"/><path d="M38 15h6v22.500a3 3 0 0 1-6 0z"/>',
        people: '<circle cx="17" cy="13" r="8"/><path d="M3 43c0-11 6-18 14-18s14 7 14 18z"/><circle cx="35" cy="16" r="6.500"/><path d="M33 25.500c7.500-.8 12 5.500 12 17.500H34.500c0-6.500-1.500-12.500-5-16.200 1-.7 2.200-1.200 3.500-1.300z"/>',
        mail: '<path d="M3 10h42v3.500L24 27 3 13.500z"/><path d="M3 18v20h42V18L24 31.500z"/>',
        scale: '<rect x="22" y="6" width="4" height="34"/><rect x="14" y="39" width="20" height="4.500" rx="1"/><rect x="6" y="10" width="36" height="3.500" rx="1"/><path d="M9 13 3.500 28h11zM39 13l-5.500 15h11z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2.500 28a6.500 6.500 0 0 0 13 0zM32.500 28a6.500 6.500 0 0 0 13 0z"/>',
        bars: '<rect x="5" y="27" width="10" height="16" rx="1"/><rect x="19" y="17" width="10" height="26" rx="1"/><rect x="33" y="6" width="10" height="37" rx="1"/>',
        doc: '<path fill-rule="evenodd" d="M9 3h21l10 10v32H9zm6 16v3.500h19V19zm0 7.500V30h19v-3.500zm0 7.500v3.500h13V34z"/>',
    };
    function pict(name) {
        return '<svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" focusable="false">' + (PICTS[name] || PICTS.info) + '</svg>';
    }

    // The pictogram on each capability's sign. A new capability uses the traffic cone until it is given one here.
    var CAPABILITY_PICTS = {
        'traffic-studies': 'car',
        'road-safety': 'warning',
        'traffic-impact': 'building',
        'junction-design': 'signal',
        'transport-planning': 'bus',
        'independent-review': 'review',
        'its-analytics': 'camera',
        'training': 'cap',
    };
    function capabilityPict(s) { return '<span class="pict">' + pict(CAPABILITY_PICTS[s.id] || 'cone') + '</span>'; }

    // A date on a km-stone: the month in the yellow top, then the day and year
    function dateStone(iso) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
        if (!m) { return '<time class="kmstone" datetime="' + esc(iso) + '"><span class="kmstone-sub">' + esc(iso) + '</span></time>'; }
        return '<time class="kmstone" datetime="' + esc(iso) + '"><span class="kmstone-top">' + MONTHS[parseInt(m[2], 10) - 1] + '</span>' +
            '<span class="kmstone-main">' + parseInt(m[3], 10) + '</span><span class="kmstone-sub">' + m[1] + '</span></time>';
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

    // A page title on a sign hung from an overhead gantry. The sign is yellow for work still in progress.
    function pageHead(title, lead, backHref, backLabel, pictName, boardClass) {
        return '<div class="page-hero"><div class="page-hero-content">' +
            (backHref ? '<p class="page-hero-breadcrumb"><a href="' + backHref + '">&larr; ' + esc(backLabel) + '</a></p>' : '') +
            '<h1 class="page-hero-title">' + esc(title) + '</h1>' +
            (lead ? '<p style="color:rgba(255,255,255,0.8);max-width:700px;margin:0.5rem auto 0;">' + esc(lead) + '</p>' : '') +
            '</div></div>';
    }

    // A small signal: amber lit while ongoing, green lit once completed
    function statusTag(p) {
        return '<span class="status status-' + esc(p.status) + '"><span class="lamps" aria-hidden="true"><i></i><i></i><i></i></span>' +
            esc(D.statuses[p.status] || p.status) + '</span>';
    }

    // Completed projects are green direction boards; ongoing ones are yellow work-zone boards
    function projectBoardClass(p) { return p.status === 'ongoing' ? 'board-yellow' : ''; }

    // The junction diagram from an advance direction sign: fills a large board that has no photo
    var ROUTE_DIAGRAM = '<svg class="route-diagram" viewBox="0 0 320 110" fill="currentColor" aria-hidden="true" focusable="false">' +
        '<path d="M6 76h268V60l40 25-40 25V94H6z"/><path d="M146 76V34h-15l24-34 24 34h-15v42z"/></svg>';

    function projectCard(p, large) {
        var years = projectYears(p);
        var sector = D.sectors[p.sector];
        var statusLabel = D.statuses[p.status] || p.status || 'Completed';
        var statusCls = p.status === 'ongoing' ? 'status-ongoing' : 'status-completed';
        return '<article class="project-card' + (large ? ' project-card-large' : '') + '">' +
            (p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : '') +
            '<div class="project-card-overlay"></div>' +
            '<div class="project-card-content">' +
            '<span class="status-badge ' + statusCls + '">' + esc(statusLabel) + '</span>' +
            '<h3 class="project-card-title">' + esc(p.title) + '</h3>' +
            (p.associatedWith ? '<p class="project-card-org">' + esc(p.associatedWith) + (p.location ? ' &bull; ' + esc(p.location) : '') + '</p>' : '') +
            '</div>' +
            '<a href="project.php?id=' + encodeURIComponent(p.id) + '" class="project-card-view" aria-label="View project">View &rarr;</a>' +
            '</article>';
    }

    function pubItem(p) {
        var title = p.link
            ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>'
            : esc(p.title);
        var typeLabel = D.pubTypes[p.type] || p.type || 'Publication';
        return '<li class="pub-item">' +
            '<span class="pub-item-year">' + esc(p.year) + '</span>' +
            '<div class="pub-item-content">' +
            '<h4 class="pub-item-title">' + title + '</h4>' +
            '<p class="pub-item-meta">' + esc(p.authors) + (p.venue ? ' &bull; <em>' + esc(p.venue) + '</em>' : '') + ' &bull; ' + esc(typeLabel) + '</p>' +
            '</div>' +
            '</li>';
    }

    function newsListItem(n, headingTag, showThumb) {
        var d = n.date ? new Date(n.date) : null;
        var pill = d ? MONTHS[d.getMonth()] + ' ' + d.getFullYear() : '';
        return '<li class="news-card">' +
            (pill ? '<span class="news-date-pill">' + esc(pill) + '</span>' : '') +
            '<' + headingTag + ' class="news-card-title"><a class="news-card-title-link" href="news-item.php?id=' + encodeURIComponent(n.id) + '">' + esc(n.title) + '</a></' + headingTag + '>' +
            (n.summary ? '<p class="news-card-excerpt">' + esc(headingTag === 'h3' ? excerpt(n.summary, 160) : n.summary) + '</p>' : '') +
            '<a href="news-item.php?id=' + encodeURIComponent(n.id) + '" class="news-card-link">Read More &rarr;</a>' +
            '</li>';
    }

    // Road closed: a barricade, a no-entry sign and a yellow diversion board
    function notFound(what, backHref, backLabel) {
        document.title = 'Not found | ' + S.short + ', ' + S.instituteShort;
        return '<section class="section" style="text-align:center;padding:5rem 0;"><div class="wrap">' +
            '<h1 style="color:var(--green);font-size:2.5rem;margin-bottom:1rem;">This ' + what + ' could not be found</h1>' +
            '<p style="color:var(--muted);margin-bottom:2rem;">The link may be old, or the item may have been removed.</p>' +
            '<div><a href="' + backHref + '" class="btn btn-primary">' + esc(backLabel) + '</a> <a href="index.php" class="btn btn-secondary" style="margin-left:0.75rem;">Home</a></div>' +
            '</div></section>';
    }

    // One filter button: a lamp that lights when this filter is on
    function chip(href, label, current, lampClass) {
        return '<a class="chip" href="' + href + '"' + (current ? ' aria-current="true"' : '') + '><i class="lamp' + (lampClass ? ' ' + lampClass : '') + '" aria-hidden="true"></i>' + esc(label) + '</a>';
    }

    /* ---------- Header and footer ---------- */

    function renderHeader() {
        var slot = document.getElementById('site-header');
        if (slot && slot.querySelector('.header-inner')) { return; } // PHP header already rendered
        var menu = [
            ['index.php', 'Home', 'home'],
            ['about.php', 'About Us', 'about'],
            ['projects.php', 'Research &amp; Projects', 'projects'],
            ['publications.php', 'Publications', 'publications'],
            ['news.php', 'News', 'news'],
            ['team.php', 'Team', 'team'],
            ['gallery.php', 'Gallery', 'gallery'],
            ['contact.php', 'Contact Us', 'contact'],
        ];
        var active = { project: 'projects' }[page] || page;
        var html = '';
        if (S.previewNotice) {
            html += '<div class="preview-bar" role="note"><div class="wrap">' + esc(S.previewNotice) + '</div></div>';
        }
        html += '<header class="site-header" id="site-header"><div class="wrap header-inner">' +
            '<a class="brand" href="index.php" aria-label="TEP Research &amp; Consultancy Cell, Department of Civil Engineering, SVNIT Surat"><span class="brand-logo-wrap"><img class="brand-logo-svnit" src="assets/img/svnit-logo.png" alt="' + esc(S.instituteShort) + '" width="38" height="36"><img class="brand-logo-trc" src="assets/img/logo-mark.svg" alt="" width="34" height="34"></span>' +
            '<span class="brand-text"><strong class="brand-title">' + esc(S.name) + '</strong><span class="brand-sub">' + esc(S.dept) + ' &bull; ' + esc(S.instituteShort) + '</span></span></a>' +
            '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span></button>' +
            '<nav id="site-nav" class="nav" aria-label="Main"><ul class="nav-list">' +
            menu.map(function (m) {
                return '<li class="nav-item"><a class="nav-link' + (active === m[2] ? ' is-active' : '') + '" href="' + m[0] + '">' + m[1] + '</a></li>';
            }).join('') +
            '</ul></nav>' +
            '</div></header>';
        if (slot) { slot.outerHTML = html; }
    }

    function renderFooter() {
        var slot = document.getElementById('site-footer');
        // If footer is already rendered by PHP on the server, never overwrite it!
        if (slot && (slot.tagName.toLowerCase() === 'footer' || slot.querySelector('.footer-15-inner') || slot.querySelector('.footer-15-content-wrap') || slot.children.length > 0)) {
            return;
        }
        var html = '<footer class="site-footer footer-15-container" id="site-footer">' +
            '<div class="footer-15-inner"><div class="footer-15-content-wrap">' +
            '<div class="footer-15-brand-col"><div class="footer-15-logo-row"><span class="footer-15-logo-icon"><img src="assets/img/logo-mark.svg" alt="TRC" width="32" height="32" class="footer-15-logo-img"></span>' +
            '<span class="footer-15-brand-name">TEP CELL</span></div>' +
            '<p class="footer-15-description">Department of Civil Engineering\nSVNIT Surat &ndash; Advancing evidence-based road safety, transport planning &amp; infrastructure consultancy since 2010.</p>' +
            '<a href="contact.php" class="footer-15-cta-btn"><span class="footer-15-cta-label">Discuss a Project</span><span class="footer-15-cta-icon-circle"><svg class="footer-15-cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></span></a></div>' +
            '<nav class="footer-15-nav-grid" aria-label="Footer navigation">' +
            '<div class="footer-15-nav-col"><h3 class="footer-15-col-title">Services</h3><ul class="footer-15-links-list"><li><a href="about.php#road-safety" class="footer-15-nav-link">Road Safety Audit</a></li><li><a href="about.php#traffic-studies" class="footer-15-nav-link">Traffic Impact Studies</a></li><li><a href="about.php#highway-design" class="footer-15-nav-link">Highway &amp; Pavement</a></li><li><a href="about.php#its-analytics" class="footer-15-nav-link">AI &amp; ITS Analytics</a></li></ul></div>' +
            '<div class="footer-15-nav-col"><h3 class="footer-15-col-title">Research</h3><ul class="footer-15-links-list"><li><a href="publications.php" class="footer-15-nav-link">IRC:SP:88 Manual</a></li><li><a href="publications.php" class="footer-15-nav-link">Indo-HCM Guidelines</a></li><li><a href="about.php#road-safety" class="footer-15-nav-link">Blackspot Diagnostics</a></li><li><a href="publications.php" class="footer-15-nav-link">Publications</a></li></ul></div>' +
            '<div class="footer-15-nav-col"><h3 class="footer-15-col-title">About Cell</h3><ul class="footer-15-links-list"><li><a href="about.php" class="footer-15-nav-link">About TRC Cell</a></li><li><a href="about.php#svnit" class="footer-15-nav-link">SVNIT Civil Dept</a></li><li><a href="team.php" class="footer-15-nav-link">Faculty Advisors</a></li><li><a href="projects.php" class="footer-15-nav-link">Projects &amp; Audits</a></li></ul></div>' +
            '<div class="footer-15-nav-col"><h3 class="footer-15-col-title">Connect</h3><ul class="footer-15-links-list"><li><a href="contact.php" class="footer-15-nav-link">Contact Us</a></li><li><a href="contact.php?action=inquiry" class="footer-15-nav-link">Discuss a Project</a></li><li><a href="https://www.svnit.ac.in" target="_blank" rel="noopener" class="footer-15-nav-link">SVNIT Portal</a></li><li><a href="about.php#privacy" class="footer-15-nav-link">Privacy Policy</a></li></ul></div>' +
            '</nav></div>' +
            '<div class="footer-15-sub-bar"><p class="footer-15-copyright">&copy; ' + new Date().getFullYear() + ' TEP Research &amp; Consultancy Cell, Department of Civil Engineering, SVNIT Surat. All rights reserved.</p><div class="footer-15-morth-tag">IRC:SP:88 &bull; Indo-HCM &bull; Academic Rigor</div></div></div>' +
            '<div class="footer-15-hero-wrap"><svg class="footer-15-hero-svg" viewBox="0 0 400 110" preserveAspectRatio="xMidYMid meet" aria-label="TEP"><text x="50%" y="100%" dominant-baseline="alphabetic" text-anchor="middle" textLength="95%" lengthAdjust="spacing" class="footer-15-hero-text" font-size="160">TEP</text></svg></div>' +
            '</footer>';
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
        var sign = D.capabilities.slice(0, 4);
        set('hero-sign',
            '<span class="sign-shield" aria-hidden="true">' + esc(S.short) + '</span><ul>' +
            sign.map(function (s) {
                return '<li><a href="about.php#' + esc(s.id) + '"><span>' + esc(s.title) + '</span>' + arrowSvg('right', 'sign-arrow') + '</a></li>';
            }).join('') + '</ul>' +
            '<a class="sign-more" href="about.php#capabilities">All ' + D.capabilities.length + ' capabilities</a>');

        set('home-capabilities', D.capabilities.map(function (s, i) {
            return '<li class="service-card" data-reveal="fade-in-up" style="--reveal-delay:' + (i * 0.08) + 's">' +
                '<div class="service-card-icon">' + capabilityPict(s) + '</div>' +
                '<h3 class="service-card-title">' + esc(s.title) + '</h3>' +
                '<p class="service-card-body">' + esc(s.short) + '</p>' +
                '<a href="about.php#' + esc(s.id) + '" class="service-card-link">Read More ' + arrowSvg('right', '') + '</a>' +
                '</li>';
        }).join(''));

        // Moving associations strip. The list repeats until it can fill a very wide screen,
        // then the whole set is doubled so the scroll loops without a visible jump.
        var associations = D.associations || [];
        if (associations.length) {
            var loop = [];
            while (loop.length < 12) { loop = loop.concat(associations); }
            set('home-associations', '<ul class="association-track" style="animation-duration:' + (loop.length * 3.5) + 's">' +
                loop.concat(loop).map(function (c, i) {
                    var copy = i >= associations.length;
                    return '<li class="association-tile"' + (copy ? ' aria-hidden="true"' : '') + '>' +
                        (c.logo ? '<img src="' + esc(c.logo) + '" alt="' + (copy ? '' : esc(c.name)) + '">' : '<span>' + esc(c.name) + '</span>') +
                        '</li>';
                }).join('') + '</ul>');
        } else {
            hide('associations-section');
        }

        var featured = D.projects.filter(function (p) { return p.featured; }).slice(0, 3);
        if (featured.length < 3) {
            featured = featured.concat(sortProjects(D.projects.filter(function (p) { return !p.featured; })).slice(0, 3 - featured.length));
        }
        if (featured.length) {
            var editHtml = '';
            if (featured.length > 0) {
                var p0 = featured[0];
                var st0 = D.statuses[p0.status] || p0.status || 'Completed';
                var cls0 = p0.status === 'ongoing' ? 'status-ongoing' : 'status-completed';
                editHtml += '<div class="project-card project-card-large">' +
                    (p0.image ? '<img src="' + esc(p0.image) + '" alt="" loading="lazy">' : '') +
                    '<div class="project-card-overlay"></div>' +
                    '<div class="project-card-content">' +
                    '<span class="status-badge ' + cls0 + '">' + esc(st0) + '</span>' +
                    '<h3 class="project-card-title">' + esc(p0.title) + '</h3>' +
                    (p0.associatedWith ? '<p class="project-card-org">' + esc(p0.associatedWith) + (p0.location ? ' &bull; ' + esc(p0.location) : '') + '</p>' : '') +
                    '</div>' +
                    '<a href="project.php?id=' + encodeURIComponent(p0.id) + '" class="project-card-view">View &rarr;</a>' +
                    '</div>';
            }
            if (featured.length > 1) {
                editHtml += '<div class="projects-side">';
                featured.slice(1).forEach(function (p) {
                    var st = D.statuses[p.status] || p.status || 'Completed';
                    var cls = p.status === 'ongoing' ? 'status-ongoing' : 'status-completed';
                    editHtml += '<div class="project-card">' +
                        (p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : '') +
                        '<div class="project-card-overlay"></div>' +
                        '<div class="project-card-content">' +
                        '<span class="status-badge ' + cls + '">' + esc(st) + '</span>' +
                        '<h3 class="project-card-title">' + esc(p.title) + '</h3>' +
                        '</div>' +
                        '<a href="project.php?id=' + encodeURIComponent(p.id) + '" class="project-card-view">View &rarr;</a>' +
                        '</div>';
                });
                editHtml += '</div>';
            }
            set('home-featured', editHtml);
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
        if (document.getElementById('trcCapStage')) { return; }
        set('count-projects', String(D.projects.length));
        set('count-pubs', String(D.publications.length));
        set('count-professors', String(D.team.filter(function (m) { return m.group === 'professors'; }).length));

        // Our capabilities modern cards
        set('capability-list', D.capabilities.map(function (s) {
            return '<article class="service-card" id="' + esc(s.id) + '" style="text-align:left;margin-bottom:2.5rem;padding:2.5rem;">' +
                '<div style="display:flex;align-items:center;gap:1.25rem;margin-bottom:1.5rem;">' +
                '<div class="service-card-icon" style="margin:0;">' + capabilityPict(s) + '</div>' +
                '<h3 style="font-size:1.5rem;color:var(--text);margin:0;">' + esc(s.title) + '</h3>' +
                '</div>' +
                '<p style="font-size:1.05rem;line-height:1.75;color:var(--text);margin-bottom:1.5rem;">' + esc(s.text) + '</p>' +
                '<h4 style="font-size:1rem;color:var(--green);font-weight:700;margin-bottom:0.75rem;">Typical Outputs &amp; Scope</h4>' +
                '<ul style="list-style:disc;margin-left:1.5rem;margin-bottom:1.5rem;color:var(--muted);">' +
                s.outputs.map(function (o) { return '<li style="margin-bottom:0.35rem;">' + esc(o) + '</li>'; }).join('') +
                '</ul>' +
                '<a class="btn btn-secondary" href="contact.php?work=' + encodeURIComponent(s.id) + '">Discuss ' +
                esc(s.title) + ' &rarr;</a>' +
                '</article>';
        }).join(''));
        // Jump to the capability named in the link (content is added after the page loads)
        if (window.location.hash) {
            var target = document.getElementById(window.location.hash.slice(1));
            if (target) { setTimeout(function () { target.scrollIntoView(); }, 0); }
        }
    };

    pages.projects = function () {
        if (!document.getElementById('project-grid')) { return; }
        var status = params.get('status') || '';
        var sector = params.get('sector') || '';
        if (!D.statuses[status]) { status = ''; }
        if (!D.sectors[sector]) { sector = ''; }

        function link(st, se) {
            var q = [];
            if (st) { q.push('status=' + st); }
            if (se) { q.push('sector=' + se); }
            return 'projects.php' + (q.length ? '?' + q.join('&') : '');
        }

        var chips = chip(link('', sector), 'All', !status) +
            Object.keys(D.statuses).map(function (k) {
                return chip(link(k, sector), D.statuses[k], status === k, k === 'ongoing' ? 'lamp-amber' : '');
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
            set('result-count', list.length + ' listed');
            set('project-grid', list.map(function (p) { return projectCard(p, false); }).join(''));
        } else {
            set('result-count', '');
            set('project-grid', '');
            set('projects-empty', '<p>Nothing matches these filters.</p><p><a class="text-link" href="projects.php">Show all research &amp; projects</a></p>');
        }
    };

    pages.project = function () {
        if (!document.getElementById('content')) { return; }
        var id = params.get('id');
        var p = D.projects.filter(function (x) { return String(x.id) === id; })[0];
        if (!p) { set('content', notFound('item', 'projects.php', 'Show all research & projects')); return; }

        document.title = p.title + ' | ' + S.short + ', ' + S.instituteShort;
        var years = projectYears(p);
        var facts = '';
        if (p.associatedWith) { facts += '<div><dt>In association with</dt><dd>' + esc(p.associatedWith) + '</dd></div>'; }
        if (p.location) { facts += '<div><dt>Location</dt><dd>' + esc(p.location) + '</dd></div>'; }
        if (D.sectors[p.sector]) { facts += '<div><dt>Area of work</dt><dd>' + esc(D.sectors[p.sector]) + '</dd></div>'; }
        if (years) { facts += '<div><dt>Period</dt><dd>' + esc(years) + '</dd></div>'; }
        facts += '<div><dt>Status</dt><dd>' + statusTag(p) + '</dd></div>';

        var related = D.projects.filter(function (x) { return x.id !== p.id && x.sector === p.sector; }).slice(0, 3);

        set('content',
            pageHead(p.title, '', 'projects.php', 'All research & projects', 'road', '') +
            '<section class="section section-tight"><div class="wrap detail-layout"><div class="detail-main">' +
            (p.image ? '<figure class="detail-image"><img src="' + esc(p.image) + '" alt=""></figure>' : '') +
            (p.summary ? '<p class="lead-text">' + esc(p.summary) + '</p>' : '') +
            '<div class="prose">' + renderText(p.description) + '</div></div>' +
            '<aside class="detail-facts"><dl>' + facts + '</dl>' +
            '<a class="btn btn-yellow btn-block" href="contact.php">Discuss a similar project</a></aside></div></section>' +
            (related.length ? '<section class="section section-concrete"><div class="wrap"><div class="section-head"><h2>Related work</h2></div><div class="project-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;">' +
                related.map(function (r) { return projectCard(r, false); }).join('') + '</div></div></section>' : ''));
    };

    pages.publications = function () {
        var type = params.get('type') || '';
        if (!D.pubTypes[type]) { type = ''; }
        set('type-chips', chip('publications.php', 'All', !type) +
            Object.keys(D.pubTypes).map(function (k) {
                return chip('publications.php?type=' + k, D.pubTypes[k] + 's', type === k);
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
                html += '<section class="pub-year"><h2 class="kmstone"><span class="kmstone-top" aria-hidden="true">Year</span><span class="kmstone-main">' + esc(year) + '</span></h2><ul class="pub-list">';
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
        if (!n) { set('content', notFound('news item', 'news.php', 'Show all news')); return; }
        document.title = n.title + ' | ' + S.short + ', ' + S.instituteShort;
        set('content',
            pageHead(n.title, '', 'news.php', 'All news', 'paper') +
            '<section class="section section-tight"><div class="wrap narrow">' +
            '<p class="news-date">' + dateStone(n.date) + '</p>' +
            (n.image ? '<figure class="detail-image"><img src="' + esc(n.image) + '" alt=""></figure>' : '') +
            (n.summary ? '<p class="lead-text">' + esc(n.summary) + '</p>' : '') +
            '<div class="prose">' + renderText(n.body) + '</div></div></section>');
    };

    // "Surat, Gujarat, 2026": whichever of the place and year are filled in
    function photoDetails(p) { return [p.place, p.year].filter(Boolean).join(', '); }

    // Opens a photo full-screen, with next and previous. If a browser cannot do this, the
    // gallery links simply open the photo file itself.
    function startPhotoViewer(list) {
        var viewer = document.getElementById('photo-viewer');
        var grid = document.getElementById('gallery-grid');
        if (!viewer || !grid || typeof viewer.showModal !== 'function') { return; }

        var image = document.getElementById('viewer-image');
        var caption = document.getElementById('viewer-caption');
        var count = document.getElementById('viewer-count');
        var prev = document.getElementById('viewer-prev');
        var next = document.getElementById('viewer-next');
        var stage = document.getElementById('viewer-stage');
        var at = 0, opener = null, touchX = null;

        prev.innerHTML = arrowSvg('left');
        next.innerHTML = arrowSvg('right');
        prev.hidden = next.hidden = list.length < 2;

        function show(index) {
            at = (index + list.length) % list.length;
            var p = list[at], details = photoDetails(p);
            image.src = p.image;
            image.alt = p.title;
            caption.innerHTML = '<strong>' + esc(p.title) + '</strong>' + (details ? '<span>' + esc(details) + '</span>' : '');
            count.textContent = (at + 1) + ' of ' + list.length;
            // Load the photos on either side, so moving between them feels instant
            [at + 1, at - 1].forEach(function (n) { new Image().src = list[(n + list.length) % list.length].image; });
        }

        grid.addEventListener('click', function (e) {
            var link = e.target.closest('a[data-photo]');
            if (!link || e.ctrlKey || e.metaKey || e.shiftKey) { return; } // Let "open in new tab" work as usual
            e.preventDefault();
            opener = link;
            show(parseInt(link.getAttribute('data-photo'), 10));
            viewer.showModal();
        });
        document.getElementById('viewer-close').addEventListener('click', function () { viewer.close(); });
        prev.addEventListener('click', function () { show(at - 1); });
        next.addEventListener('click', function () { show(at + 1); });
        viewer.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { show(at - 1); }
            if (e.key === 'ArrowRight') { show(at + 1); }
        });
        // Clicking the dark area around the photo closes the viewer
        viewer.addEventListener('click', function (e) {
            if (e.target === viewer || e.target === stage) { viewer.close(); }
        });
        // Swipe left or right on a phone
        stage.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
        stage.addEventListener('touchend', function (e) {
            if (touchX === null) { return; }
            var moved = e.changedTouches[0].clientX - touchX;
            touchX = null;
            if (Math.abs(moved) > 50 && list.length > 1) { show(moved < 0 ? at + 1 : at - 1); }
        });
        viewer.addEventListener('close', function () {
            image.removeAttribute('src'); // So the last photo does not flash when the viewer next opens
            if (opener) { opener.focus(); }
        });
    }

    pages.gallery = function () {
        var photos = D.gallery || [];
        var cats = D.galleryCategories || {};
        var used = {};
        photos.forEach(function (p) { used[p.category] = true; });
        var usedCats = Object.keys(cats).filter(function (k) { return used[k]; });

        var cat = params.get('category') || '';
        if (usedCats.indexOf(cat) === -1) { cat = ''; }

        if (usedCats.length > 1) {
            set('gallery-chips', chip('gallery.php', 'All', !cat) + usedCats.map(function (k) {
                return chip('gallery.php?category=' + k, cats[k], cat === k);
            }).join(''));
        } else {
            hide('gallery-filters');
        }

        var list = photos.filter(function (p) { return !cat || p.category === cat; });
        if (!list.length) {
            hide('gallery-grid');
            set('gallery-empty', '<p>Photos will be added here soon.</p>');
            return;
        }
        set('gallery-count', list.length + (list.length === 1 ? ' photo' : ' photos'));
        set('gallery-grid', list.map(function (p, i) {
            var details = photoDetails(p);
            return '<li><figure class="gallery-item">' +
                '<a class="hoarding" href="' + esc(p.image) + '" data-photo="' + i + '" aria-label="Open larger photo: ' + esc(p.title) + '">' +
                '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy"></a>' +
                '<figcaption class="gallery-caption"><strong>' + esc(p.title) + '</strong>' +
                (details ? '<span>' + esc(details) + '</span>' : '') + '</figcaption></figure></li>';
        }).join(''));
        startPhotoViewer(list);
    };

    pages.team = function () {
        var members = D.team.slice().sort(function (a, b) { return (a.order || 100) - (b.order || 100) || a.name.localeCompare(b.name); });
        var html = '';
        Object.keys(D.teamGroups).forEach(function (g) {
            var list = members.filter(function (m) { return m.group === g; });
            if (!list.length) { return; }
            html += '<section class="team-group"><div class="section-heading" style="text-align:left;margin-bottom:2rem;"><span class="section-label">Our People</span><h2>' + esc(D.teamGroups[g]) + '</h2><div class="section-accent-line" style="margin:0.5rem 0 0 0;"></div></div><ul class="team-grid' + (g === 'professors' ? ' is-professors' : '') + '">' +
                list.map(function (m) {
                    var photo = m.photo
                        ? '<img class="person-photo" src="' + esc(m.photo) + '" alt="" loading="lazy">'
                        : '<span class="person-photo is-initials" aria-hidden="true">' + esc(initials(m.name)) + '</span>';
                    var links = '';
                    if (m.email) { links += '<a href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>'; }
                    if (m.profile) { links += '<a href="' + esc(m.profile) + '" target="_blank" rel="noopener" aria-label="Website of ' + esc(m.name) + '">Profile Website &rarr;</a>'; }
                    return '<li class="person"><div class="person-face">' + photo + '<div class="person-text"><h3>' + esc(m.name) + '</h3>' +
                        (m.designation ? '<p class="person-role">' + esc(m.designation) + '</p>' : '') +
                        (m.expertise ? '<p class="person-areas">' + esc(m.expertise) + '</p>' : '') +
                        (links ? '<p class="person-links">' + links + '</p>' : '') + '</div></div></li>';
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
        var select = form.elements.work;
        var labels = {};
        D.capabilities.forEach(function (s) { labels[s.id] = s.title; });
        labels.other = 'Something else';
        Object.keys(labels).forEach(function (k) {
            var o = document.createElement('option');
            o.value = k;
            o.textContent = labels[k];
            select.appendChild(o);
        });
        if (labels[params.get('work')]) {
            select.value = params.get('work');
            select.dispatchEvent(new Event('change'));
        }
        if (window.__trcAjaxFormHandled) { return; }

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
            if (!labels[v('work')]) { showError('work', 'Choose the type of work.'); errors++; }
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

            var work = labels[v('work')];
            if (usingEmailApp) {
                var body = 'Name: ' + v('name') + '\nOrganisation: ' + v('organisation') + '\nEmail: ' + v('email') +
                    '\nPhone: ' + v('phone') + '\nType of work: ' + work + '\n\n' + v('message');
                window.location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Website enquiry: ' + work) +
                    '&body=' + encodeURIComponent(body);
                status('success', '<h2>Your email app should now be open</h2><p>The enquiry is filled in there. Press <strong>Send</strong> in your email app to deliver it. ' +
                    'If no email app opened, write to <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a> directly.</p>');
                return;
            }

            var data = new FormData(form);
            data.set('work', work);
            data.append('_subject', 'Website enquiry: ' + work);
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

    // Draw the pictogram for any element marked data-pict (signs written directly in the HTML pages)
    function fillPicts() {
        document.querySelectorAll('[data-pict]').forEach(function (el) {
            el.innerHTML = pict(el.getAttribute('data-pict'));
        });
    }

    // Drive the little car along the road under the header as the page scrolls
    function startCar() {
        var car = document.querySelector('.header-car');
        if (!car) { return; }
        var waiting = false;
        function place() {
            waiting = false;
            var distance = document.documentElement.scrollHeight - window.innerHeight;
            car.style.setProperty('--trip', distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)).toFixed(4) : '0');
        }
        function request() {
            if (!waiting) { waiting = true; window.requestAnimationFrame(place); }
        }
        window.addEventListener('scroll', request, { passive: true });
        window.addEventListener('resize', request);
        place();
    }

    renderHeader();
    renderFooter();
    fillContactBits();
    if (pages[page]) { pages[page](); }
    fillPicts();
    startCar();

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
