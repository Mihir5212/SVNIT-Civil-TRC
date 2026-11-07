/*
 * The drawings on the inner pages, in the manner of engineering drawings: thin lines, dimension chains and data plots.
 * They are illustrations of the kind of work, not records of any real project. The project strip and the news line are drawn from data.js.
 */
(function () {
    'use strict';

    function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function svg(w, h, body, cls) {
        return '<svg class="' + (cls || 'art') + '" viewBox="0 0 ' + w + ' ' + h + '" fill="none" aria-hidden="true" focusable="false">' + body + '</svg>';
    }
    const L = (x1, y1, x2, y2, c) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"' + (c ? ' class="' + c + '"' : '') + '/>';
    const T = (x, y, s, c, a) => '<text x="' + x + '" y="' + y + '"' + (c ? ' class="' + c + '"' : '') + (a ? ' text-anchor="' + a + '"' : '') + '>' + esc(s) + '</text>';
    const P = (d, c, extra) => '<path d="' + d + '"' + (c ? ' class="' + c + '"' : '') + (extra ? ' ' + extra : '') + '/>';
    const DRAW = 'pathLength="1"';

    // A dimension line with its end ticks and label
    function dim(x0, x1, y, label) {
        const m = (x0 + x1) / 2;
        return '<g class="dim">' + L(x0, y, x1, y) + L(x0, y - 7, x0, y + 7) + L(x1, y - 7, x1, y + 7) + T(m, y - 10, label, 'lbl', 'middle') + '</g>';
    }
    // A simple tree in outline, as drawn on engineering sections
    function tree(x, y, r) {
        return '<g class="tree">' + L(x, y, x, y - r * 1.4) + '<circle cx="' + x + '" cy="' + (y - r * 2) + '" r="' + r + '"/><circle cx="' + (x - r * .7) + '" cy="' + (y - r * 1.5) + '" r="' + r * .72 + '"/><circle cx="' + (x + r * .7) + '" cy="' + (y - r * 1.55) + '" r="' + r * .76 + '"/></g>';
    }

    /* About: a highway cross-section, the standard drawing of a road engineer */
    function crossSection() {
        const defs = '<defs><pattern id="hatch-a" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="9" class="hatch"/></pattern>' +
            '<pattern id="hatch-b" width="16" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="3" r="1" class="dot"/><circle cx="12" cy="6" r="1" class="dot"/></pattern></defs>';
        const g = 300;     // the level of the fields
        const top = 214;   // the road surface
        let out = defs;
        // The land each side, the embankment and the layers of the road
        out += P('M0 ' + g + 'H300L350 ' + (g + 22) + 'H392L436 ' + top + 'H1164L1208 ' + (g + 22) + 'H1250L1300 ' + g + 'H1600', 'draw thick', DRAW);
        out += P('M436 ' + top + 'H1164L1188 ' + (top + 12) + 'H412Z', 'layer surface');
        out += P('M412 ' + (top + 12) + 'H1188L1208 ' + (top + 30) + 'H392Z', 'layer base');
        out += P('M392 ' + (top + 30) + 'H1208L1236 ' + (g + 8) + 'H364Z', 'layer sub');
        // Crossfall and lane markings on the surface
        out += P('M520 ' + (top - 1) + 'H560M660 ' + (top - 1) + 'H700M900 ' + (top - 1) + 'H940M1040 ' + (top - 1) + 'H1080', 'mark');
        out += P('M800 ' + (top - 5) + 'v-4', 'mark accent');
        // A delineator, a crash barrier and an overhead sign support
        out += L(490, top, 490, top - 26, 'furn') + L(1110, top, 1110, top - 26, 'furn');
        out += P('M448 ' + top + 'v-30M442 ' + (top - 24) + 'h12M442 ' + (top - 16) + 'h12', 'furn');
        out += P('M1152 ' + top + 'v-30M1146 ' + (top - 24) + 'h12M1146 ' + (top - 16) + 'h12', 'furn');
        out += P('M468 ' + top + 'V70H1132V' + top, 'gantry draw', DRAW);
        out += P('M468 84H1132M468 70L492 84L516 70L540 84L564 70L588 84L612 70L636 84L660 70L684 84L708 70L732 84L756 70L780 84L804 70L828 84L852 70L876 84L900 70L924 84L948 70L972 84L996 70L1020 84L1044 70L1068 84L1092 70L1116 84L1132 74', 'truss');
        out += '<rect x="608" y="92" width="384" height="56" class="sign"/>';
        out += P('M630 120h46M664 110l12 10-12 10', 'signmark');
        out += P('M970 120h-46M936 110l-12 10 12 10', 'signmark');
        // Trees, a pole and fields
        out += tree(120, g, 22) + tree(210, g, 16) + tree(1390, g, 20) + tree(1500, g, 25);
        out += P('M300 ' + g + 'v-110M284 ' + (g - 104) + 'h32', 'furn') + P('M1310 ' + g + 'v-110M1294 ' + (g - 104) + 'h32', 'furn');
        out += P('M0 ' + (g + 2) + 'H300M1300 ' + (g + 2) + 'H1600', 'ground');
        // Dimension chains
        out += dim(436, 800, top + 88, 'Lane') + dim(800, 1164, top + 88, 'Lane');
        out += dim(392, 436, top + 88, '') + dim(1164, 1208, top + 88, '');
        out += dim(392, 1208, top + 122, 'Formation width');
        out += T(1600, 395, 'Typical section. Illustration only, not to scale.', 'note', 'end');
        return svg(1600, 400, out, 'art art-section');
    }

    /* Projects: a corridor strip, as used in highway planning, with one marker for each project in data.js */
    function corridor(projects, sectors) {
        const W = 1600, y = 190, list = projects || [];
        let out = '';
        // The road
        out += '<rect x="0" y="' + (y - 34) + '" width="' + W + '" height="68" class="road"/>';
        out += L(0, y - 34, W, y - 34, 'edge') + L(0, y + 34, W, y + 34, 'edge');
        out += P('M0 ' + y + 'H' + W, 'lane');
        // Side roads and junctions along the way
        const stubs = [[170, -1], [420, 1], [640, -1], [905, 1], [1120, -1], [1370, 1]];
        for (const [x, d] of stubs) {
            out += P('M' + (x - 16) + ' ' + (y + d * 34) + 'V' + (y + d * 150) + 'M' + (x + 16) + ' ' + (y + d * 34) + 'V' + (y + d * 150), 'stub draw', DRAW);
            out += L(x, y + d * 50, x, y + d * 150, 'stub-lane');
        }
        // Chainage marks
        for (let x = 0; x <= W; x += 100) {
            const major = x % 400 === 0;
            out += L(x, y + 34, x, y + 34 + (major ? 12 : 6), 'tick');
            if (major) { out += T(x + 4, y + 62, (x / 400) + '+000', 'chain'); }
        }
        // Long curves of the traffic that uses it
        out += P('M0 ' + (y - 16) + 'C260 ' + (y - 16) + ' 300 ' + (y - 16) + ' 410 ' + (y - 16) + 'S520 ' + (y - 16) + ' ' + W + ' ' + (y - 16), 'flow');
        out += P('M' + W + ' ' + (y + 16) + 'C1200 ' + (y + 16) + ' 900 ' + (y + 16) + ' 700 ' + (y + 16) + 'S300 ' + (y + 16) + ' 0 ' + (y + 16), 'flow flow-b');
        // One marker per project
        const n = list.length;
        list.forEach((p, i) => {
            const x = 110 + (W - 220) * (n > 1 ? i / (n - 1) : .5);
            const up = i % 2 === 0;
            const on = p.status === 'ongoing';
            const tipY = up ? 58 : 322;
            out += '<a href="project.html?id=' + encodeURIComponent(p.id) + '" class="marker' + (on ? ' is-ongoing' : '') + '"><title>' + esc(p.title) + '</title>' +
                L(x, y, x, tipY, 'stem') + '<circle cx="' + x + '" cy="' + y + '" r="8" class="node"/>' +
                '<rect x="' + (x - 58) + '" y="' + (up ? tipY - 28 : tipY) + '" width="116" height="28" rx="2" class="tag"/>' +
                T(x, up ? tipY - 9 : tipY + 19, (sectors && sectors[p.sector] ? sectors[p.sector] : '').split(' ')[0], 'tagtext', 'middle') + '</a>';
        });
        return svg(W, 380, out, 'art art-corridor');
    }

    /* Publications: pages of a paper over a speed-flow plot */
    function paperAndPlot() {
        let out = '';
        // The plot
        const ox = 90, oy = 390, W = 560, H = 320;
        out += L(ox, oy, ox + W, oy, 'axis') + L(ox, oy, ox, oy - H, 'axis');
        for (let i = 1; i <= 6; i++) { out += L(ox + i * W / 6, oy, ox + i * W / 6, oy + 6, 'axis') + L(ox, oy - i * H / 6, ox - 6, oy - i * H / 6, 'axis'); }
        for (let i = 1; i < 6; i++) { out += L(ox + i * W / 6, oy, ox + i * W / 6, oy - H, 'grid') + L(ox, oy - i * H / 6, ox + W, oy - i * H / 6, 'grid'); }
        out += T(ox + W, oy + 28, 'Flow', 'lbl', 'end');
        out += '<text transform="translate(' + (ox - 22) + ' ' + (oy - H) + ') rotate(-90)" class="lbl" text-anchor="end">Speed</text>';
        // Points scattered around the speed-flow curve
        let seed = 7;
        const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
        let pts = '';
        for (let i = 0; i < 150; i++) {
            const k = rnd();                        // density along the curve
            const flow = 4 * k * (1 - k);
            const x = ox + 24 + flow * (W - 70) + (rnd() - .5) * 26;
            const y = oy - 26 - (1 - k) * (H - 54) + (rnd() - .5) * 24;
            pts += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2.6"/>';
        }
        out += '<g class="pts">' + pts + '</g>';
        let curve = 'M';
        for (let i = 0; i <= 40; i++) {
            const k = i / 40, flow = 4 * k * (1 - k);
            curve += (i ? 'L' : '') + (ox + 24 + flow * (W - 70)).toFixed(1) + ' ' + (oy - 26 - (1 - k) * (H - 54)).toFixed(1);
        }
        out += P(curve, 'curve draw', DRAW);
        // Pages behind and in front
        const page = (x, y, w, h, rot, cls) => {
            let lines = '';
            lines += '<rect x="' + (x + 26) + '" y="' + (y + 30) + '" width="' + (w * .62) + '" height="10" class="tl"/>';
            lines += '<rect x="' + (x + 26) + '" y="' + (y + 50) + '" width="' + (w * .38) + '" height="6" class="tl2"/>';
            for (let i = 0; i < 10; i++) { lines += '<rect x="' + (x + 26) + '" y="' + (y + 78 + i * 15) + '" width="' + ((w - 52) * (i === 9 ? .6 : 1)) + '" height="4" class="tl2"/>'; }
            return '<g class="' + cls + '" transform="rotate(' + rot + ' ' + (x + w / 2) + ' ' + (y + h / 2) + ')"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" class="sheet"/>' + lines + '</g>';
        };
        out += page(690, 90, 250, 330, 5, 'pg pg1') + page(650, 70, 250, 330, -3, 'pg pg2');
        out += T(ox, 440, 'Illustrative speed and flow plot, of the kind used in traffic research.', 'note');
        return svg(980, 450, out, 'art art-paper');
    }

    /* News: the dates of real news items as stones along a line */
    function newsLine(items, monthNames) {
        const W = 1200, y = 96, list = (items || []).slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
        let out = '';
        out += L(0, y, W, y, 'base');
        for (let x = 0; x <= W; x += 40) { out += L(x, y, x, y + (x % 200 === 0 ? 12 : 6), 'tick'); }
        const n = list.length;
        list.forEach((it, i) => {
            const x = 120 + (W - 240) * (n > 1 ? i / (n - 1) : .5);
            const p = String(it.date).split('-');
            out += '<a href="news-item.html?id=' + encodeURIComponent(it.id) + '" class="stone"><title>' + esc(it.title) + '</title>' +
                '<circle cx="' + x + '" cy="' + y + '" r="7" class="node"/>' + L(x, y - 7, x, y - 30, 'stem') +
                T(x, y - 38, (monthNames ? monthNames[+p[1] - 1] : p[1]) + ' ' + (+p[2]), 'stone-d', 'middle') + T(x, y + 34, p[0], 'stone-y', 'middle') + '</a>';
        });
        return svg(W, 150, out, 'art art-newsline');
    }

    /* Small diagrams, one for each kind of work */
    const SMALL = {
        // Bars for vehicle classes, with a counting line across a road
        traffic: () => {
            let s = '<rect x="0" y="118" width="400" height="44" class="road"/>' + L(0, 140, 400, 140, 'lane') + L(70, 106, 70, 174, 'accentline');
            const bars = [62, 94, 40, 72, 26];
            bars.forEach((h, i) => { s += '<rect x="' + (140 + i * 44) + '" y="' + (100 - h) + '" width="30" height="' + h + '" class="bar' + (i === 1 ? ' bar-a' : '') + '"/>'; });
            s += '<rect x="24" y="126" width="26" height="12" class="veh"/><rect x="96" y="142" width="22" height="11" class="veh"/><rect x="288" y="126" width="46" height="13" class="veh"/>';
            return s;
        },
        // Conflict points along a road, ranked
        safety: () => {
            let s = P('M0 142C110 142 150 62 260 58S360 58 400 58', 'wide') + P('M0 142C110 142 150 62 260 58S360 58 400 58', 'lane');
            [[86, 130, 1], [174, 88, 3], [236, 62, 2], [330, 58, 1]].forEach((c) => { s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + (6 + c[2] * 5) + '" class="hot"/><circle cx="' + c[0] + '" cy="' + c[1] + '" r="3" class="hotc"/>'; });
            s += P('M38 40l18 -28 18 28z', 'tri') + L(56, 22, 56, 31, 'triline');
            return s;
        },
        // Trips from a new development onto nearby roads
        impact: () => {
            let s = '<rect x="150" y="24" width="100" height="62" class="site"/>' + L(150, 44, 250, 44, 'grid') + L(150, 64, 250, 64, 'grid') + L(200, 24, 200, 86, 'grid');
            s += '<rect x="0" y="118" width="400" height="36" class="road"/>' + L(0, 136, 400, 136, 'lane');
            s += P('M185 86V112C185 124 170 128 150 128H20', 'trip') + P('M215 86V112C215 124 230 128 250 128H380', 'trip');
            s += P('M28 122l-10 6 10 6M372 122l10 6-10 6', 'tripend');
            return s;
        },
        // A signalised junction in plan
        junction: () => {
            let s = '<rect x="0" y="66" width="400" height="48" class="road"/><rect x="176" y="0" width="48" height="180" class="road"/>';
            s += L(0, 90, 158, 90, 'lane') + L(242, 90, 400, 90, 'lane') + L(200, 0, 200, 48, 'lane') + L(200, 132, 200, 180, 'lane');
            for (let i = 0; i < 6; i++) { s += '<rect x="' + (158 - i * 0) + '" y="' + (69 + i * 7.6) + '" width="12" height="4" class="zeb"/><rect x="230" y="' + (69 + i * 7.6) + '" width="12" height="4" class="zeb"/><rect x="' + (179 + i * 7.6) + '" y="48" width="4" height="12" class="zeb"/><rect x="' + (179 + i * 7.6) + '" y="120" width="4" height="12" class="zeb"/>'; }
            s += P('M60 78H150C172 78 188 62 188 30', 'trip') + P('M340 102H250C228 102 212 118 212 150', 'trip');
            s += '<circle cx="146" cy="56" r="5" class="sig-r"/><circle cx="254" cy="124" r="5" class="sig-g"/>';
            return s;
        },
        // A network of routes and stops
        planning: () => {
            let s = P('M20 150C90 120 120 70 200 80S330 30 380 20', 'route') + P('M20 40C100 50 160 110 220 120S330 130 384 150', 'route route-b') + P('M210 10V170', 'route route-c');
            [[20, 150], [116, 92], [207, 80], [300, 54], [380, 20], [20, 40], [120, 70], [222, 120], [310, 128], [384, 150], [210, 10], [210, 170]].forEach((p) => { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5.5" class="stop"/>'; });
            return s;
        },
        // A report being checked
        review: () => {
            let s = '<rect x="110" y="10" width="130" height="160" class="sheet"/>';
            for (let i = 0; i < 7; i++) { s += '<rect x="126" y="' + (30 + i * 18) + '" width="' + (i % 3 === 2 ? 60 : 98) + '" height="5" class="tl2"/>'; }
            s += '<circle cx="268" cy="104" r="42" class="lens"/>' + L(298, 134, 336, 170, 'handle') + P('M250 104l13 13 24-28', 'tick2');
            return s;
        },
        // Vehicle tracks from video, with detection boxes
        analytics: () => {
            let s = '<rect x="0" y="0" width="400" height="180" class="frame"/>';
            s += P('M0 150C100 140 180 100 400 40', 'tr') + P('M0 110C120 100 220 80 400 70', 'tr tr-b') + P('M60 180C120 130 240 110 400 100', 'tr tr-c');
            s += '<rect x="120" y="110" width="40" height="24" class="box"/><rect x="250" y="66" width="34" height="20" class="box"/><rect x="170" y="130" width="24" height="16" class="box box-b"/>';
            s += L(0, 20, 54, 20, 'hud') + L(0, 30, 34, 30, 'hud');
            return s;
        },
        // A lecture room in plan
        training: () => {
            let s = '<rect x="100" y="10" width="200" height="56" class="sheet"/>' + P('M120 50L160 28 200 42 240 22 280 36', 'tr') + L(200, 66, 200, 84, 'hud');
            for (let r = 0; r < 3; r++) { for (let c = 0; c < 6 - (r === 0 ? 0 : 0); c++) { s += '<rect x="' + (68 + c * 46 - r * 0) + '" y="' + (98 + r * 26) + '" width="32" height="14" class="seat"/>'; } }
            return s;
        },
        // A highway in plan and profile
        highways: () => {
            let s = P('M0 60C80 60 110 30 200 30S320 60 400 60', 'wide') + P('M0 60C80 60 110 30 200 30S320 60 400 60', 'lane');
            s += L(0, 150, 400, 150, 'hud') + P('M0 150L100 118L220 132L320 104L400 118', 'tr');
            [100, 220, 320].forEach((x) => { s += L(x, 96, x, 150, 'grid'); });
            return s;
        },
        // People on a bus stop line
        public: () => {
            let s = L(0, 110, 400, 110, 'routeline');
            [50, 150, 250, 350].forEach((x) => { s += '<circle cx="' + x + '" cy="110" r="10" class="stop"/>'; });
            s += '<rect x="170" y="66" width="130" height="34" rx="3" class="veh"/>' + L(210, 66, 210, 100, 'hud') + L(250, 66, 250, 100, 'hud');
            return s;
        }
    };
    function small(name) { return svg(400, 180, (SMALL[name] || SMALL.traffic)(), 'art art-small art-' + name); }

    // Which small diagram goes with each capability and each area of work
    const CAP = { 'traffic-studies': 'traffic', 'road-safety': 'safety', 'traffic-impact': 'impact', 'junction-design': 'junction', 'transport-planning': 'planning', 'independent-review': 'review', 'its-analytics': 'analytics', 'training': 'training' };
    const SECTOR = { traffic: 'traffic', safety: 'safety', planning: 'planning', public: 'public', highways: 'highways', analytics: 'analytics', review: 'review', training: 'training' };

    /* A generated cover for a news item that has no photo: an abstract road plan seeded by its date */
    function cover(seedText) {
        let seed = 0;
        for (const ch of String(seedText)) { seed = (seed * 31 + ch.charCodeAt(0)) % 9973; }
        const r = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        let s = '';
        const kind = Math.floor(r() * 3);
        if (kind === 0) {
            // A road bending across the land, with two lanes joining it
            const y1 = 30 + r() * 120, y2 = 40 + r() * 100, x1 = 60 + r() * 120, x2 = 230 + r() * 120;
            s += P('M' + x1 + ' 0V180', 'thin') + P('M' + x2 + ' 0C' + x2 + ' 60 ' + (x2 - 40) + ' 120 ' + (x2 - 50) + ' 180', 'thin');
            s += P('M0 ' + y1 + 'C120 ' + (y1 - 40) + ' 220 ' + (y2 + 40) + ' 400 ' + y2, 'wide') + P('M0 ' + y1 + 'C120 ' + (y1 - 40) + ' 220 ' + (y2 + 40) + ' 400 ' + y2, 'lane');
        } else if (kind === 1) {
            // A junction seen from above
            const cx = 120 + r() * 160, cy = 60 + r() * 60;
            s += P('M0 ' + cy + 'H400', 'wide') + P('M' + cx + ' 0V180', 'wide') + P('M0 ' + cy + 'H' + (cx - 26) + 'M' + (cx + 26) + ' ' + cy + 'H400', 'lane') + P('M' + cx + ' 0V' + (cy - 26) + 'M' + cx + ' ' + (cy + 26) + 'V180', 'lane');
            s += '<circle cx="' + cx + '" cy="' + cy + '" r="7" class="pin"/>';
        } else {
            // A road with stones marking the way
            const y = 70 + r() * 50;
            s += P('M0 ' + y + 'H400', 'wide') + P('M0 ' + y + 'H400', 'lane');
            for (let x = 40 + r() * 40; x < 400; x += 90) { s += '<rect x="' + x + '" y="' + (y - 30) + '" width="12" height="16" class="pin"/>'; }
        }
        return svg(400, 180, s, 'art art-small art-cover');
    }

    window.TRCArt = { crossSection, corridor, paperAndPlot, newsLine, small, cover, CAP, SECTOR };
})();
