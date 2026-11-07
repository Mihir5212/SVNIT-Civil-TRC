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

    // A date as a small block: the day large, the month and year beside it
    function dateBlock(iso) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
        if (!m) { return '<time class="date" datetime="' + esc(iso) + '">' + esc(iso) + '</time>'; }
        return '<time class="date" datetime="' + esc(iso) + '"><span class="date-d">' + parseInt(m[3], 10) + '</span><span class="date-my">' + MONTHS[parseInt(m[2], 10) - 1] + ' ' + m[1] + '</span></time>';
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

    // The opening of a detail page: back link, title and a drawing of the kind of work
    function detailHead(title, lead, backHref, backLabel, artHtml, statusHtml) {
        return '<section class="hero hero-detail"><div class="wrap hero-grid">' +
            '<div class="hero-text"><p class="back-link"><a href="' + backHref + '">' + arrowSvg('left') + esc(backLabel) + '</a></p>' + arrivalNote() +
            (statusHtml ? '<p class="hero-tags">' + statusHtml + '</p>' : '') +
            '<h1>' + esc(title) + '</h1>' + (lead ? '<p class="lead">' + esc(lead) + '</p>' : '') + '</div>' +
            (artHtml ? '<div class="hero-art hero-art-small">' + artHtml + '</div>' : '') + '</div></section>';
    }

    // The status of a project: amber for ongoing, green once completed
    function statusTag(p) {
        return '<span class="status status-' + esc(p.status) + '"><i aria-hidden="true"></i>' + esc(D.statuses[p.status] || p.status) + '</span>';
    }
    function sectorTag(p) {
        return D.sectors[p.sector] ? '<span class="sector sector-' + esc(p.sector) + '">' + esc(D.sectors[p.sector]) + '</span>' : '';
    }

    function projectArt(p) {
        if (!window.TRCArt) { return ''; }
        var t = String(p.title);
        var kind = /impact/i.test(t) ? 'impact' : /signal|junction|intersection/i.test(t) ? 'junction' : window.TRCArt.SECTOR[p.sector] || 'traffic';
        return window.TRCArt.small(kind);
    }
    function projectCard(p, large) {
        var href = 'project.html?id=' + encodeURIComponent(p.id);
        var art = p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : projectArt(p);
        return '<article class="pcard' + (large ? ' is-wide' : '') + '">' +
            '<a class="pcard-art" href="' + href + '" tabindex="-1" aria-hidden="true">' + art + '</a>' +
            '<div class="pcard-body"><p class="pcard-meta">' + sectorTag(p) + statusTag(p) + '</p>' +
            '<h3><a href="' + href + '">' + esc(p.title) + '</a></h3>' +
            (p.associatedWith ? '<p class="pcard-partner">' + esc(p.associatedWith) + (p.location ? ', ' + esc(p.location) : '') + '</p>' : '') +
            (large && p.summary ? '<p class="pcard-summary">' + esc(excerpt(p.summary, 240)) + '</p>' : '') +
            '<p class="pcard-foot"><span>' + esc(projectYears(p)) + '</span>' + arrowSvg('right', 'go') + '</p></div></article>';
    }

    function pubItem(p) {
        var title = p.link
            ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>'
            : esc(p.title);
        return '<li class="pub pub-' + esc(p.type) + '">' +
            '<p class="pub-type"><i aria-hidden="true"></i>' + esc(D.pubTypes[p.type] || p.type) + '</p>' +
            '<p class="pub-title">' + title + '</p>' +
            '<p class="pub-authors">' + esc(p.authors) + ' (' + esc(p.year) + ')</p>' +
            '<p class="pub-venue">' + esc(p.venue || '') + '</p>' +
            '</li>';
    }

    function newsListItem(n, lead) {
        var href = 'news-item.html?id=' + encodeURIComponent(n.id);
        var cover = n.image
            ? '<img src="' + esc(n.image) + '" alt="" loading="lazy">'
            : (window.TRCArt ? window.TRCArt.cover(n.date + n.title) : '');
        return '<li class="story' + (lead ? ' is-lead' : '') + '">' +
            '<a class="story-cover" href="' + href + '" tabindex="-1" aria-hidden="true">' + cover + '</a>' +
            '<div class="story-text">' + dateBlock(n.date) +
            '<h2><a href="' + href + '">' + esc(n.title) + '</a></h2>' +
            (n.summary ? '<p>' + esc(lead ? n.summary : excerpt(n.summary, 170)) + '</p>' : '') + '</div></li>';
    }

    // Road closed: a barricade and the ways round it
    function notFound(what, backHref, backLabel) {
        document.title = 'Not found | ' + S.short + ', ' + S.instituteShort;
        return '<section class="closure"><div class="wrap"><div class="barricade" aria-hidden="true"></div>' +
            '<h1>This ' + what + ' could not be found</h1>' +
            '<p class="lead">The link may be old, or the item may have been removed.</p>' +
            '<ul class="diversion"><li><a href="' + backHref + '">' + arrowSvg('right') + esc(backLabel) + '</a></li><li><a href="index.html">' + arrowSvg('right') + 'Home</a></li></ul>' +
            '</div></section>';
    }

    /* If the visitor reached this page by turning off the road on the Home page, say so, and offer the way back */
    var arrivalInfo = null;
    try {
        arrivalInfo = JSON.parse(sessionStorage.getItem('trc-arrival') || 'null');
        sessionStorage.removeItem('trc-arrival');
        if (arrivalInfo && Date.now() - arrivalInfo.t > 15000) { arrivalInfo = null; }
    } catch (e) { arrivalInfo = null; }
    function arrivalNote() {
        if (!arrivalInfo) { return ''; }
        var a = arrivalInfo, went = a.dir === 'straight' ? 'Straight on from ' : a.dir === 'left' ? 'Turned left at ' : 'Turned right at ';
        return '<p class="arrival-note">' + arrowSvg(a.dir === 'straight' ? 'up' : a.dir, 'arrival-arrow') + esc(went + a.from) +
            ' <a href="index.html#stop-' + (+a.i || 0) + '">Back to the road</a></p>';
    }

    // One filter button
    function chip(href, label, current, count) {
        return '<a class="chip" href="' + href + '"' + (current ? ' aria-current="true"' : '') + '>' + esc(label) + (count !== undefined ? '<span class="chip-n">' + count + '</span>' : '') + '</a>';
    }

    /* ---------- Header and footer ---------- */

    function renderHeader() {
        var menu = [
            ['index.html', 'Home', 'home'],
            ['about.html', 'About', 'about'],
            ['projects.html', 'Research &amp; Projects', 'projects'],
            ['publications.html', 'Publications', 'publications'],
            ['gallery.html', 'Gallery', 'gallery'],
            ['team.html', 'Team', 'team'],
        ];
        var active = { project: 'projects' }[page] || page;
        var html = '';
        if (S.previewNotice) {
            html += '<div class="preview-bar" role="note"><div class="wrap">' + esc(S.previewNotice) + '</div></div>';
        }
        html += '<header class="site-header"><div class="wrap header-inner">' +
            '<a class="brand" href="index.html"><span class="brand-logos"><img class="brand-logo-svnit" src="assets/img/svnit-logo.png" alt="' + esc(S.instituteShort) + '" width="42" height="40"><img src="assets/img/logo-mark.svg" alt="" width="38" height="38"></span>' +
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
            '<li><a href="about.html">About TRC</a></li><li><a href="about.html#capabilities">Our capabilities</a></li>' +
            '<li><a href="projects.html">Research &amp; Projects</a></li><li><a href="publications.html">Publications</a></li>' +
            '<li><a href="gallery.html">Gallery</a></li><li><a href="team.html">Team</a></li></ul></div>' +
            '<div><h2 class="footer-head">Contact</h2><address>' + S.address.map(esc).join('<br>') + '<br>' +
            '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a><br>' +
            '<a href="' + esc(telHref(S.phone)) + '">' + esc(S.phone) + '</a></address>' +
            '<p><a class="btn btn-light" href="contact.html">Send an enquiry</a></p></div>' +
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
            if (/example\.com$/.test(S.email)) { a.insertAdjacentHTML('afterend', ' <span class="placeholder-tag">placeholder</span>'); }
        });
        document.querySelectorAll('[data-phone]').forEach(function (a) {
            a.textContent = S.phone;
            a.setAttribute('href', telHref(S.phone));
            if (/00000 00000/.test(S.phone)) { a.insertAdjacentHTML('afterend', ' <span class="placeholder-tag">placeholder</span>'); }
        });
    }

    /* ---------- Pages ---------- */

    var pages = {};

    pages.about = function () {
        set('count-projects', String(D.projects.length));
        set('count-pubs', String(D.publications.length));
        set('count-professors', String(D.team.filter(function (m) { return m.group === 'professors'; }).length));

        // Our capabilities: a drawing of the work, what we do, and what it delivers
        set('capability-list', D.capabilities.map(function (s, i) {
            return '<article class="cap" id="' + esc(s.id) + '">' +
                '<div class="cap-art">' + (window.TRCArt ? window.TRCArt.small(window.TRCArt.CAP[s.id] || 'traffic') : '') + '</div>' +
                '<div class="cap-body"><p class="cap-no">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</p><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p>' +
                '<p class="cap-ask"><a class="text-link" href="contact.html?work=' + encodeURIComponent(s.id) + '">Ask about ' + esc(s.title.charAt(0).toLowerCase() + s.title.slice(1)) + '</a></p></div>' +
                '<div class="cap-out"><h4>Typical outputs</h4><ul class="ticks">' + s.outputs.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></div>' +
                '</article>';
        }).join(''));
        // Jump to the capability named in the link (content is added after the page loads)
        if (window.location.hash) {
            var target = document.getElementById(window.location.hash.slice(1));
            if (target) {
                var jump = function () { target.scrollIntoView({ behavior: 'instant' }); };
                setTimeout(jump, 0);
                // Web fonts and pictures can still shift the page while it loads
                window.addEventListener('load', jump);
                if (document.fonts && document.fonts.ready) { document.fonts.ready.then(jump); }
            }
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

        var chips = chip(link('', sector), 'All', !status, D.projects.length) +
            Object.keys(D.statuses).map(function (k) {
                return chip(link(k, sector), D.statuses[k], status === k, D.projects.filter(function (p) { return p.status === k; }).length);
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
            set('project-grid', list.map(function (p, i) { return projectCard(p, i === 0); }).join(''));
        } else {
            set('result-count', '');
            set('project-grid', '');
            set('projects-empty', '<p>Nothing matches these filters.</p><p><a class="text-link" href="projects.html">Show all research &amp; projects</a></p>');
        }
    };

    pages.project = function () {
        var id = params.get('id');
        var p = D.projects.filter(function (x) { return String(x.id) === id; })[0];
        if (!p) { set('content', notFound('item', 'projects.html', 'Show all research & projects')); return; }

        document.title = p.title + ' | ' + S.short + ', ' + S.instituteShort;
        var years = projectYears(p);
        var facts = '';
        if (p.associatedWith) { facts += '<div><dt>In association with</dt><dd>' + esc(p.associatedWith) + '</dd></div>'; }
        if (p.location) { facts += '<div><dt>Location</dt><dd>' + esc(p.location) + '</dd></div>'; }
        if (D.sectors[p.sector]) { facts += '<div><dt>Area of work</dt><dd>' + esc(D.sectors[p.sector]) + '</dd></div>'; }
        if (years) { facts += '<div><dt>Period</dt><dd>' + esc(years) + '</dd></div>'; }
        facts += '<div><dt>Status</dt><dd>' + statusTag(p) + '</dd></div>';

        var related = D.projects.filter(function (x) { return x.id !== p.id && x.sector === p.sector; }).slice(0, 3);
        var art = projectArt(p);

        set('content',
            detailHead(p.title, '', 'projects.html', 'All research & projects', art, sectorTag(p) + statusTag(p)) +
            '<section class="section"><div class="wrap detail-layout"><div class="detail-main">' +
            (p.image ? '<figure class="detail-image"><img src="' + esc(p.image) + '" alt=""></figure>' : '') +
            (p.summary ? '<p class="lead-text">' + esc(p.summary) + '</p>' : '') +
            '<div class="prose">' + renderText(p.description) + '</div></div>' +
            '<aside class="facts"><dl>' + facts + '</dl>' +
            '<a class="btn btn-primary btn-block" href="contact.html">Discuss a similar project</a></aside></div></section>' +
            (related.length ? '<section class="section section-tint"><div class="wrap"><h2 class="section-title">Related work</h2><div class="project-grid">' +
                related.map(function (r) { return projectCard(r, false); }).join('') + '</div></div></section>' : ''));
    };

    pages.publications = function () {
        var type = params.get('type') || '';
        if (!D.pubTypes[type]) { type = ''; }
        function countOf(k) { return D.publications.filter(function (x) { return x.type === k; }).length; }
        set('type-chips', chip('publications.html', 'All', !type, D.publications.length) +
            Object.keys(D.pubTypes).filter(function (k) { return countOf(k) > 0; }).map(function (k) {
                return chip('publications.html?type=' + k, D.pubTypes[k] + 's', type === k, countOf(k));
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
                html += '<section class="pub-year"><h2 class="year">' + esc(year) + '</h2><ul class="pub-list">';
            }
            html += pubItem(p);
        });
        set('pub-years', html + '</ul></section>');
    };

    pages.news = function () {
        var list = D.news.slice().sort(byDateDesc);
        if (list.length) {
            set('news-list', list.map(function (n, i) { return newsListItem(n, i === 0); }).join(''));
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
            detailHead(n.title, '', 'news.html', 'All news', '', dateBlock(n.date)) +
            '<section class="section"><div class="wrap narrow article">' +
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
        var thumbs = document.getElementById('viewer-thumbs');
        if (thumbs) {
            thumbs.innerHTML = list.map(function (p, i) { return '<button type="button" data-go="' + i + '" aria-label="Show photo ' + (i + 1) + ': ' + esc(p.title) + '"><img src="' + esc(p.image) + '" alt=""></button>'; }).join('');
            thumbs.hidden = list.length < 2;
            thumbs.addEventListener('click', function (e) {
                var b = e.target.closest('button[data-go]');
                if (b) { show(parseInt(b.getAttribute('data-go'), 10)); }
            });
        }

        function show(index) {
            at = (index + list.length) % list.length;
            var p = list[at], details = photoDetails(p);
            image.src = p.image;
            image.alt = p.title;
            caption.innerHTML = '<strong>' + esc(p.title) + '</strong>' + (details ? '<span>' + esc(details) + '</span>' : '');
            count.textContent = (at + 1) + ' of ' + list.length;
            if (thumbs) {
                [].forEach.call(thumbs.children, function (b, i) { b.classList.toggle('is-on', i === at); if (i === at) { b.setAttribute('aria-current', 'true'); } else { b.removeAttribute('aria-current'); } });
            }
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
            set('gallery-chips', chip('gallery.html', 'All', !cat, photos.length) + usedCats.map(function (k) {
                return chip('gallery.html?category=' + k, cats[k], cat === k, photos.filter(function (p) { return p.category === k; }).length);
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
            var group = cats[p.category] || '';
            return '<li class="shot' + (i % 5 < 2 ? ' shot-large' : '') + '"><figure>' +
                '<a href="' + esc(p.image) + '" data-photo="' + i + '" aria-label="Open larger photo: ' + esc(p.title) + '">' +
                '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy"></a>' +
                '<figcaption><strong>' + esc(p.title) + '</strong><span>' + esc([group, details].filter(Boolean).join(' · ')) + '</span></figcaption></figure></li>';
        }).join(''));
        startPhotoViewer(list);
    };

    pages.team = function () {
        var members = D.team.slice().sort(function (a, b) { return (a.order || 100) - (b.order || 100) || a.name.localeCompare(b.name); });
        // The opening of the page shows the actual team
        var band = document.getElementById('team-band');
        if (band) {
            var profs = members.filter(function (m) { return m.group === 'professors' && m.photo; });
            var staff = members.filter(function (m) { return m.group !== 'professors' && m.photo; });
            band.innerHTML = '<div class="band-profs">' + profs.map(function (m) { return '<img src="' + esc(m.photo) + '" alt="">'; }).join('') + '</div>' +
                '<div class="band-staff">' + staff.map(function (m) { return '<img src="' + esc(m.photo) + '" alt="">'; }).join('') + '</div>';
        }
        function person(m, big) {
            var photo = m.photo
                ? '<img class="person-photo" src="' + esc(m.photo) + '" alt="" loading="' + (big ? 'eager' : 'lazy') + '">'
                : '<span class="person-photo is-initials" aria-hidden="true">' + esc(initials(m.name)) + '</span>';
            var links = '';
            if (m.email) { links += '<a href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>'; }
            if (m.profile) { links += '<a href="' + esc(m.profile) + '" target="_blank" rel="noopener" aria-label="Website of ' + esc(m.name) + '">Website</a>'; }
            return '<li class="person' + (big ? ' person-big' : '') + '">' + photo + '<div class="person-text"><h3>' + esc(m.name) + '</h3>' +
                (m.designation ? '<p class="person-role">' + esc(m.designation) + '</p>' : '') +
                (m.expertise ? '<p class="person-areas">' + esc(m.expertise) + '</p>' : '') +
                (links ? '<p class="person-links">' + links + '</p>' : '') + '</div></li>';
        }
        var html = '';
        Object.keys(D.teamGroups).forEach(function (g) {
            var list = members.filter(function (m) { return m.group === g; });
            if (!list.length) { return; }
            var big = g === 'professors';
            html += '<section class="team-group team-' + esc(g) + '"><h2 class="section-title">' + esc(D.teamGroups[g]) + '</h2><ul class="' + (big ? 'prof-list' : 'staff-grid') + '">' +
                list.map(function (m) { return person(m, big); }).join('') + '</ul></section>';
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
        if (labels[params.get('work')]) { select.value = params.get('work'); }

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

    // Draw the pictogram for any element marked data-pict
    function fillPicts() {
        document.querySelectorAll('[data-pict]').forEach(function (el) {
            el.innerHTML = pict(el.getAttribute('data-pict'));
        });
    }
    // The drawing that opens a page
    function fillArt() {
        var A = window.TRCArt;
        if (!A) { return; }
        document.querySelectorAll('[data-art]').forEach(function (el) {
            var kind = el.getAttribute('data-art');
            if (kind === 'about') { el.innerHTML = A.crossSection(); }
            if (kind === 'projects') { el.innerHTML = A.corridor(sortProjects(D.projects), D.sectors); }
            if (kind === 'publications') { el.innerHTML = A.paperAndPlot(); }
            if (kind === 'news') { el.innerHTML = A.newsLine(D.news, MONTHS); }
            if (kind === 'gallery') {
                el.innerHTML = (D.gallery || []).slice(0, 5).map(function (p, i) { return '<a class="mosaic-' + i + '" href="gallery.html" tabindex="-1"><img src="' + esc(p.image) + '" alt=""></a>'; }).join('');
            }
        });
        var slot = document.getElementById('arrival-slot');
        if (slot) { slot.innerHTML = arrivalNote(); }
    }

    renderHeader();
    renderFooter();
    fillContactBits();
    fillArt();
    if (pages[page]) { pages[page](); }
    fillPicts();

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
