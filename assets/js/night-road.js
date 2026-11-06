/*
 * The night road: draws the road, its markings and its surroundings on a canvas, and
 * places overhead boards on it. The Home page drives along it as you scroll. Every other
 * page opens at the place on the road where its board stands on the Home page.
 *
 * NightRoad(canvas, options) needs:
 *   options.boards   ten stretches of road in order, each { el: the board's element } or {} for no board
 *   options.still    true for a road with no gantries, behind a plain list of boards
 *   options.closure  true for barricades across the road just past the board
 *   options.onLayout called whenever the road has been measured and laid out again
 */
window.NightRoad = function (canvas, options) {
    'use strict';
    options = options || {};

    /* ---------- The road, in metres ---------- */
    var ctx = canvas.getContext('2d');
    var RUR = 3.5;          // half width of the two-lane rural road
    var URB = 7;            // half width of the four-lane city road
    var CAM_H = 2.2;        // eye height, as from a bus or a survey vehicle
    var BOARD_W = 16;       // every overhead board is this wide
    var CLEARANCE = 4.8;    // height of the underside of every board
    var COLUMN = 9.5;       // gantry columns stand this far from the centre line
    var CW = 7, RAD = 4, FOOT = 3, XFAR = 220;   // cross road half width, corner radius, footpath width, how far the cross road runs
    var GAP = 78, JOFF = 22;                     // metres between boards, and from a board to the junction after it
    var RANGE = 400;
    var TEX = 18, TEXW = 24, TEXH = 60;

    var BOARDS = options.boards;
    var W = 0, H = 0, DPR = 1, F = 1, CX = 0, HY = 0, NEAR = 1, QUALITY = 1, MOTION = 1, MOVING = false;
    var U0 = 0, U1 = 0, K0 = 0, W0 = 0, W1 = 0, JUNCTIONS = [], BLOCKS = [], LAMPS = [], ROADSIGNS = [], BUS = 0, CLOSURE = 0;
    var CAM = 0;
    var SKY = null, DAWN = null, CITY = null, LAND = null, FACADES = [], cityH = 0;

    function seeded(n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
    function px(x, y, dz) { var s = F / dz; return [CX + x * s, HY + (CAM_H - y) * s, s]; }
    function fade(dz, far) { return Math.max(0, 1 - Math.pow(dz / far, 0.62)); }
    function smooth(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
    function val(f, z) { return typeof f === 'function' ? f(z) : f; }
    function road(z) { return RUR + (URB - RUR) * smooth(W0, W1, z); }
    function nroad(z) { return -road(z); }
    function rural(z) { return 1 - smooth(K0 - 40, K0, z); }
    function soilW(z) { return road(z) + 3.5 * rural(z); }
    function pavedW(z) { return road(z) + 1.5 * rural(z); }
    function inJunction(z, pad) {
        for (var i = 0; i < JUNCTIONS.length; i++) { if (Math.abs(z - JUNCTIONS[i].z) < pad) { return true; } }
        return false;
    }
    // The parts of a stretch of road that are not inside a junction
    function spans(a, b, nearPad, farPad) {
        var out = [], s = a;
        JUNCTIONS.forEach(function (J) {
            var g1 = J.z - nearPad, g2 = J.z + farPad;
            if (g2 < s || g1 > b) { return; }
            if (g1 > s) { out.push([s, g1]); }
            s = g2;
        });
        if (s < b) { out.push([s, b]); }
        return out;
    }

    /* ---------- Sprites, drawn once ---------- */
    function sheet(w, h) { var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
    var GLOWS = {};
    function glowSprite(color) {
        if (GLOWS[color]) { return GLOWS[color]; }
        var c = sheet(96, 96), g = c.getContext('2d'), r = g.createRadialGradient(48, 48, 0, 48, 48, 48);
        r.addColorStop(0, '#ffffff'); r.addColorStop(.1, color); r.addColorStop(.32, color + '55'); r.addColorStop(1, color + '00');
        g.fillStyle = r; g.fillRect(0, 0, 96, 96);
        GLOWS[color] = c;
        return c;
    }
    var TREES = [];
    (function makeTrees() {
        for (var v = 0; v < 4; v++) {
            var c = sheet(320, 400), g = c.getContext('2d');
            g.fillStyle = '#121812';
            g.beginPath(); g.moveTo(148, 400); g.lineTo(154, 215); g.lineTo(168, 215); g.lineTo(175, 400); g.closePath(); g.fill();
            var i, n = 58;
            for (i = 0; i < n; i++) {
                var a = seeded(v * 91 + i) * 6.283, d = Math.pow(seeded(v * 37 + i * 3), .55), rx = 122 + v * 7, ry = 118 - v * 6;
                var x = 160 + Math.cos(a) * d * rx, y = 150 + Math.sin(a) * d * ry, r = 16 + seeded(i * 5 + v) * 25;
                g.fillStyle = i % 3 ? '#0b130e' : '#0d1811';
                g.beginPath(); g.arc(x, y, r, 0, 6.3); g.fill();
            }
            var leaves = sheet(320, 400), lg = leaves.getContext('2d');
            for (i = 0; i < 520; i++) {
                var b = seeded(v * 17 + i * 7) * 6.283, e = Math.pow(seeded(v * 53 + i), .5), bx = 160 + Math.cos(b) * e * 118, by = 152 + Math.sin(b) * e * 110;
                var lit = Math.max(0, (bx - 80) / 200) * Math.max(.2, (by - 20) / 230);
                lg.globalAlpha = .03 + lit * .2;
                lg.fillStyle = seeded(i + v) > .62 ? '#5a5b2c' : '#2c4029';
                lg.beginPath(); lg.arc(bx, by, 1.6 + seeded(i * 2 + v) * 4.6, 0, 6.3); lg.fill();
            }
            g.filter = 'blur(1.2px)';
            g.drawImage(leaves, 0, 0);
            g.filter = 'none';
            g.globalAlpha = 1;
            TREES.push(c);
        }
    })();
    var TUFT = (function () {
        var c = sheet(160, 80), g = c.getContext('2d');
        g.lineCap = 'round';
        for (var i = 0; i < 70; i++) {
            var x = 8 + seeded(i * 3) * 144, h = 18 + seeded(i * 7) * 58, lean = (seeded(i * 11) - .5) * 26;
            g.strokeStyle = i % 5 ? '#151f15' : '#27331f'; g.lineWidth = 1.2 + seeded(i) * 1.6;
            g.beginPath(); g.moveTo(x, 80); g.quadraticCurveTo(x + lean * .3, 80 - h * .6, x + lean, 80 - h); g.stroke();
        }
        return c;
    })();
    var PEOPLE = (function () {
        var clothes = ['#d9dce0', '#3a6bab', '#a84a3d', '#d4ad3a', '#3f8060', '#7a6699'], out = [];
        clothes.forEach(function (col, i) {
            [false, true].forEach(function (walking) {
                var c = sheet(80, 200), g = c.getContext('2d');
                g.lineCap = 'round';
                g.strokeStyle = i % 2 ? '#1a2230' : '#26262b'; g.lineWidth = 13;
                g.beginPath();
                if (walking) { g.moveTo(40, 112); g.lineTo(22, 190); g.moveTo(40, 112); g.lineTo(58, 190); } else { g.moveTo(33, 112); g.lineTo(32, 192); g.moveTo(47, 112); g.lineTo(48, 192); }
                g.stroke();
                g.strokeStyle = col; g.lineWidth = 9;
                g.beginPath();
                if (walking) { g.moveTo(25, 52); g.lineTo(13, 92); g.moveTo(55, 52); g.lineTo(66, 90); } else { g.moveTo(24, 52); g.lineTo(20, 104); g.moveTo(56, 52); g.lineTo(60, 104); }
                g.stroke();
                g.fillStyle = col; g.beginPath();
                if (g.roundRect) { g.roundRect(23, 40, 34, 76, 9); } else { g.rect(23, 40, 34, 76); }
                g.fill();
                g.fillStyle = '#8c5d40'; g.beginPath(); g.arc(40, 22, 14, 0, 6.3); g.fill();
                g.fillStyle = '#0d0d0f'; g.beginPath(); g.arc(40, 18, 14, 3.14, 6.28); g.fill();
                // night falls on people too
                g.globalCompositeOperation = 'source-atop'; g.fillStyle = 'rgba(4,8,16,.34)'; g.fillRect(0, 0, 80, 200);
                out.push(c);
            });
        });
        return out;
    })();
    var VEHICLES = (function () {
        function make(w, h, draw) { var c = sheet(w, h); draw(c.getContext('2d'), w, h); return c; }
        function wheel(g, x, y, r) { g.fillStyle = '#07080a'; g.beginPath(); g.arc(x, y, r, 0, 6.3); g.fill(); g.fillStyle = '#4d5359'; g.beginPath(); g.arc(x, y, r * .45, 0, 6.3); g.fill(); }
        var car = make(264, 90, function (g) {
            g.fillStyle = '#b6bcc2'; g.beginPath(); g.moveTo(6, 74); g.lineTo(6, 50); g.lineTo(52, 42); g.lineTo(86, 12); g.lineTo(168, 12); g.lineTo(206, 42); g.lineTo(256, 50); g.lineTo(258, 74); g.closePath(); g.fill();
            g.fillStyle = '#1b2732'; g.beginPath(); g.moveTo(66, 42); g.lineTo(90, 19); g.lineTo(126, 19); g.lineTo(126, 42); g.closePath(); g.moveTo(134, 42); g.lineTo(134, 19); g.lineTo(165, 19); g.lineTo(190, 42); g.closePath(); g.fill();
            wheel(g, 62, 74, 15); wheel(g, 204, 74, 15);
        });
        var auto = make(180, 116, function (g) {
            g.fillStyle = '#d9b32a'; g.fillRect(20, 12, 132, 12);
            g.fillStyle = '#157a4a'; g.beginPath(); g.moveTo(16, 92); g.lineTo(16, 44); g.lineTo(150, 44); g.lineTo(172, 66); g.lineTo(172, 92); g.closePath(); g.fill();
            g.fillStyle = '#d9b32a'; g.fillRect(30, 24, 8, 22); g.fillRect(128, 24, 8, 22);
            g.fillStyle = '#10161c'; g.fillRect(38, 24, 90, 34);
            wheel(g, 46, 95, 15); wheel(g, 148, 95, 15);
        });
        var bus = make(660, 190, function (g) {
            g.fillStyle = '#c1502f'; if (g.roundRect) { g.beginPath(); g.roundRect(6, 8, 648, 154, 10); g.fill(); } else { g.fillRect(6, 8, 648, 154); }
            g.fillStyle = '#e6e2d4'; g.fillRect(6, 104, 648, 12);
            for (var i = 0; i < 9; i++) {
                g.fillStyle = seeded(i * 3.3) > .3 ? '#ffe2ad' : '#20303c';
                g.fillRect(24 + i * 68, 26, 58, 54);
            }
            wheel(g, 124, 164, 26); wheel(g, 524, 164, 26);
        });
        return [{ img: car, len: 4.4, h: 1.5, front: .98, tail: .03, y: .52 }, { img: auto, len: 3, h: 1.93, front: .96, tail: .08, y: .55 }, { img: bus, len: 11, h: 3.16, front: .99, tail: .01, y: .62 }];
    })();

    var BASES = [['#222a33', '#323c47'], ['#28262d', '#39363f'], ['#1e2a30', '#2d3b42'], ['#2c2724', '#3e3733'], ['#16202d', '#243242'], ['#262b2f', '#363c41'], ['#2e2b27', '#403c36']];
    var WORDS = ['MEDICAL', 'BAKERY', 'STATIONERY', 'TEA HOUSE', 'HARDWARE', 'CYCLE REPAIR', 'TAILOR', 'OPTICALS', 'GENERAL STORE', 'CLINIC', 'BOOKS', 'FLOUR MILL', 'SWEETS', 'PHOTO STUDIO'];
    function makeFacades() {
        FACADES = [];
                var signs = ['#b81f2b', '#0f6b3f', '#13589e', '#c79c12', '#6a2a86', '#dfe3e6', '#a6491b'];
        for (var v = 0; v < 7; v++) {
            var w = TEXW * TEX, h = TEXH * TEX, c = sheet(w, h), g = c.getContext('2d');
            g.fillStyle = BASES[v][0]; g.fillRect(0, 0, w, h);
            var f, col;
            for (f = 0; f < 17; f++) {
                var bottom = h - (4.6 + f * 3.2) * TEX, top = bottom - 3.2 * TEX;
                g.fillStyle = BASES[v][1]; g.fillRect(0, bottom - .24 * TEX, w, .24 * TEX);
                if (v === 4) {
                    // glass tower: long bands of glazing
                    g.fillStyle = '#0d1520'; g.fillRect(0, top + .5 * TEX, w, 2.3 * TEX);
                    for (col = 0; col < 16; col++) {
                        var gl = seeded(f * 19 + col * 3.1);
                        if (gl > .6) { g.fillStyle = gl > .86 ? '#d6e6ff' : '#ffd493'; g.globalAlpha = .55 + (gl - .6); g.fillRect(col * 1.5 * TEX + 1, top + .55 * TEX, 1.5 * TEX - 2, 2.2 * TEX); g.globalAlpha = 1; }
                    }
                    continue;
                }
                for (col = 0; col < 8; col++) {
                    var x = (col * 3 + .6) * TEX, wy = top + .78 * TEX, ww = 1.8 * TEX, wh = 1.62 * TEX, r = seeded(v * 31.7 + f * 7.3 + col * 13.1);
                    g.fillStyle = '#0a0f15'; g.fillRect(x - 2, wy - 2, ww + 4, wh + 4);
                    if (r > .6) {
                        var warm = seeded(r * 91) > .24;
                        var lg = g.createLinearGradient(0, wy, 0, wy + wh);
                        lg.addColorStop(0, warm ? '#ffd891' : '#dbe9ff'); lg.addColorStop(1, warm ? '#d99b56' : '#94afd4');
                        g.fillStyle = lg; g.fillRect(x, wy, ww, wh);
                        // curtains and people's rooms
                        g.fillStyle = 'rgba(40,24,14,.5)'; g.fillRect(x, wy, ww * (.15 + seeded(r * 37) * .35), wh);
                        g.fillStyle = 'rgba(0,0,0,.65)'; g.fillRect(x + ww / 2 - 1, wy, 2, wh);
                    } else {
                        g.fillStyle = '#141c26'; g.fillRect(x, wy, ww, wh);
                        g.fillStyle = 'rgba(120,150,190,.1)'; g.fillRect(x, wy, ww, wh * .34);
                    }
                    // balconies and air conditioners
                    if (v % 2 === 0) { g.fillStyle = '#343c44'; g.fillRect(x - 6, wy + wh + 3, ww + 12, 4); g.fillRect(x - 6, wy + wh - 13, 3, 18); g.fillRect(x + ww + 3, wy + wh - 13, 3, 18); }
                    else if (r < .28) { g.fillStyle = '#4c5359'; g.fillRect(x + ww + 4, wy + wh - 18, 21, 15); g.fillStyle = '#2e3338'; g.fillRect(x + ww + 8, wy + wh - 15, 13, 9); }
                }
            }
            if (v === 6) {
                // A plain house: no shops at ground level, just a door and a window
                g.fillStyle = BASES[v][0]; g.fillRect(0, h - 4.6 * TEX, w, 4.6 * TEX);
                for (col = 0; col < 6; col++) {
                    var hx = (col * 4 + .9) * TEX, hy = h - 3 * TEX, on = seeded(col * 3.7) > .5;
                    g.fillStyle = on ? '#e9bc7b' : '#121a24'; g.fillRect(hx, hy, 1.5 * TEX, 1.5 * TEX);
                    g.fillStyle = '#17120e'; g.fillRect(hx + 2 * TEX, h - 2.4 * TEX, 1 * TEX, 2.4 * TEX);
                }
                FACADES.push(c);
                continue;
            }
            // Shops along the footpath
            var sx = 0, n = 0, by = h - 4.6 * TEX;
            g.fillStyle = '#0d1014'; g.fillRect(0, by, w, 4.6 * TEX);
            while (sx < w) {
                var key = v * 53 + n * 11, sw = (5 + seeded(key) * 3.2) * TEX;
                var open = seeded(key * 2) > .42, sc = signs[Math.floor(seeded(key * 3) * signs.length)];
                var glassY = by + 1.35 * TEX, glassH = 2.95 * TEX;
                if (open) {
                    var cool = seeded(key * 7) > .68, gg = g.createLinearGradient(0, glassY, 0, glassY + glassH);
                    gg.addColorStop(0, cool ? '#dfe9f7' : '#f6dcaa'); gg.addColorStop(.5, cool ? '#a5b9d2' : '#d9a15f'); gg.addColorStop(1, cool ? '#4b5a6e' : '#6e4728');
                    g.fillStyle = gg; g.fillRect(sx + 5, glassY, sw - 10, glassH);
                    // shelves and goods
                    g.fillStyle = 'rgba(30,20,12,.6)';
                    for (var sh = 0; sh < 3; sh++) { g.fillRect(sx + 7, glassY + (sh + 1) * glassH / 4, sw - 14, 3); }
                    for (var it = 0; it < 12; it++) {
                        g.fillStyle = signs[Math.floor(seeded(key + it * 5) * signs.length)];
                        g.globalAlpha = .3;
                        var ix = sx + 9 + seeded(key * 3 + it) * (sw - 26), iy = glassY + (Math.floor(seeded(key * 9 + it) * 3) + 1) * glassH / 4 - 13;
                        g.fillRect(ix, iy, 6 + seeded(it * 3) * 9, 12);
                        g.globalAlpha = 1;
                    }
                    g.fillStyle = 'rgba(0,0,0,.72)'; g.fillRect(sx + sw / 2 - 2, glassY, 4, glassH);
                } else {
                    g.fillStyle = '#272c30'; g.fillRect(sx + 5, glassY, sw - 10, glassH);
                    g.fillStyle = '#373d42';
                    for (var ln = 0; ln < glassH; ln += 6) { g.fillRect(sx + 5, glassY + ln, sw - 10, 2); }
                }
                // sign board
                g.fillStyle = sc; g.fillRect(sx + 3, by + .22 * TEX, sw - 6, 1 * TEX);
                g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(sx + 3, by + .22 * TEX, sw - 6, 1 * TEX);
                g.fillStyle = sc === '#dfe3e6' || sc === '#c79c12' ? '#101214' : '#ffffff';
                g.font = '800 ' + (.62 * TEX) + 'px Overpass, Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
                g.fillText(WORDS[(v * 3 + n) % WORDS.length], sx + sw / 2, by + .76 * TEX, sw - 18);
                sx += sw; n++;
            }
            FACADES.push(c);
        }
    }

    /* ---------- Sky, city and fields, drawn once per window size ---------- */
    function makeBackdrop() {
        var cw = Math.round(W * DPR), ch = Math.round(H * DPR), i, x;
        SKY = sheet(cw, ch); LAND = sheet(cw, ch);
        var noise = sheet(220, 220), n = noise.getContext('2d'), img = n.createImageData(220, 220);
        for (i = 0; i < img.data.length; i += 4) {
            var v = seeded(i * .37) * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 13;
        }
        n.putImageData(img, 0, 0);

        var g = SKY.getContext('2d');
        g.setTransform(DPR, 0, 0, DPR, 0, 0);
        var sky = g.createLinearGradient(0, 0, 0, HY);
        sky.addColorStop(0, '#02050c'); sky.addColorStop(.55, '#07101f'); sky.addColorStop(.86, '#142338'); sky.addColorStop(1, '#2a3243');
        g.fillStyle = sky; g.fillRect(0, 0, W, HY + 1);
        for (i = 0; i < 210; i++) {
            var sx = seeded(i * 3.1) * W, sy = seeded(i * 5.7) * HY * .82, m = seeded(i * 9.3);
            g.globalAlpha = (.14 + m * .52) * (1 - sy / (HY * 1.05));
            g.fillStyle = m > .86 ? '#ffe9c6' : '#dbe6f7';
            g.fillRect(sx, sy, m > .93 ? 1.6 : 1, m > .93 ? 1.6 : 1);
        }
        g.globalAlpha = 1;
        var glow = g.createRadialGradient(CX, HY, 0, CX, HY, Math.max(W * .55, H * .55));
        glow.addColorStop(0, 'rgba(255,176,102,.34)'); glow.addColorStop(.42, 'rgba(235,150,92,.08)'); glow.addColorStop(1, 'rgba(235,150,92,0)');
        g.save(); g.translate(CX, HY); g.scale(1, .52); g.translate(-CX, -HY);
        g.fillStyle = glow; g.fillRect(0, -H, W, H * 3); g.restore();
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.fillStyle = g.createPattern(noise, 'repeat'); g.fillRect(0, 0, cw, ch);

        DAWN = sheet(32, 256);
        var dg = DAWN.getContext('2d'), dawnSky = dg.createLinearGradient(0, 0, 0, 256), dawnEnd = HY / H;
        dawnSky.addColorStop(0, 'rgba(38,48,92,.1)');
        dawnSky.addColorStop(dawnEnd * .55, 'rgba(92,74,120,.42)');
        dawnSky.addColorStop(dawnEnd * .86, 'rgba(226,134,104,.62)');
        dawnSky.addColorStop(dawnEnd, 'rgba(255,186,120,.78)');
        dawnSky.addColorStop(Math.min(1, dawnEnd + .001), 'rgba(255,186,120,0)');
        dg.fillStyle = dawnSky; dg.fillRect(0, 0, 32, 256);

        // The skyline of Surat, on its own sheet so it can grow as the drive approaches the city
        var unit = Math.max(.72, H / 900);
        cityH = 64 * unit;
        CITY = sheet(cw, cityH * DPR);
        var c = CITY.getContext('2d');
        c.setTransform(DPR, 0, 0, DPR, 0, 0);
        x = CX - W * .36; i = 0;
        while (x < CX + W * .36) {
            var bw = (11 + seeded(i * 2.3) * 26) * unit;
            var near = 1 - Math.abs(x + bw / 2 - CX) / (W * .36);
            var bh = (6 + seeded(i * 4.1) * 40 * Math.max(.18, near)) * unit;
            c.fillStyle = seeded(i * 7.7) > .5 ? '#0d1524' : '#111a2a';
            c.fillRect(x, cityH - bh, bw, bh);
            var wy, wx;
            for (wy = cityH - bh + 3 * unit; wy < cityH - 3 * unit; wy += 4.4 * unit) {
                for (wx = x + 2 * unit; wx < x + bw - 2 * unit; wx += 3.6 * unit) {
                    if (seeded(wx * 1.3 + wy * 2.7) > .77) {
                        c.globalAlpha = .35 + seeded(wx + wy) * .55;
                        c.fillStyle = seeded(wy * 3 + wx) > .3 ? '#ffc680' : '#dceaff';
                        c.fillRect(wx, wy, 1.4 * unit, 1.5 * unit);
                    }
                }
            }
            c.globalAlpha = 1;
            if (bh > 30 * unit && seeded(i * 13) > .55) {
                c.fillStyle = '#ff4a3a'; c.beginPath(); c.arc(x + bw / 2, cityH - bh - 2, 1.5, 0, 6.3); c.fill();
            }
            x += bw + seeded(i * 8) * 4 * unit;
            i++;
        }

        // A far line of trees and the fields, which sit in front of the city
        var l = LAND.getContext('2d');
        l.setTransform(DPR, 0, 0, DPR, 0, 0);
        l.fillStyle = '#060b10';
        l.beginPath(); l.moveTo(0, HY + 2);
        for (x = 0; x <= W + 6; x += 6) {
            var dist = Math.abs(x - CX) / (W / 2);
            var th = (dist < .13 ? 2 : 4 + (Math.sin(x * .021) + 1) * 6 + seeded(Math.round(x / 6)) * 13) * unit * Math.min(1, .35 + dist);
            l.lineTo(x, HY - th);
        }
        l.lineTo(W, HY + 2); l.closePath(); l.fill();
        var field = l.createLinearGradient(0, HY, 0, H);
        field.addColorStop(0, '#111a21'); field.addColorStop(.06, '#090e10'); field.addColorStop(.4, '#080b09'); field.addColorStop(1, '#0d110c');
        l.fillStyle = field; l.fillRect(0, HY, W, H - HY);
        l.setTransform(1, 0, 0, 1, 0, 0);
        l.globalCompositeOperation = 'source-atop';
        l.fillStyle = l.createPattern(noise, 'repeat'); l.fillRect(0, 0, cw, ch);
        l.globalCompositeOperation = 'source-over';
    }

    /* ---------- What stands where: boards, zones, junctions, buildings ---------- */
    function placeWorld() {
        var last = BOARDS.length - 1, i, z;
        BOARDS[0].z = BOARDS[0].rest + 3;
        for (i = 1; i <= last; i++) { BOARDS[i].z = BOARDS[i - 1].z + (i === 5 ? JOFF + GAP : GAP); }
        var expertise = BOARDS[3].z;
        U0 = expertise - 70;       // the first houses
        K0 = expertise - 6;        // kerbs and footpaths begin
        W0 = K0; W1 = K0 + 72;     // the road widens from two lanes to four
        U1 = expertise + 66;       // full city
        JUNCTIONS = [
            { z: BOARDS[4].z + JOFF, hold: BOARDS[4].z - BOARDS[4].rest, last: false },
            { z: BOARDS[last].z + JOFF, hold: BOARDS[last].z - BOARDS[last].rest, last: true }
        ];
        BUS = BOARDS[6].z + 18;
        CLOSURE = 0;
        BOARDS.forEach(function (b) { if (b.el && !CLOSURE) { CLOSURE = b.z + 13; } });

        // Street lights: amber sodium on the highway, white LED in the city
        LAMPS = [];
        for (z = 24; z < U1 - 10; z += 48) { LAMPS.push({ z: z, col: '#ffb873', pool: '#ffae62', city: false }); }
        var end = BOARDS[last].z + 620;
        for (z = U1; z < end; z += 30) { if (!inJunction(z, CW + 3)) { LAMPS.push({ z: z, col: '#e6eeff', pool: '#c8d8ff', city: true }); } }

        // Roadside signs
        ROADSIGNS = [
            { z: BOARDS[0].z + 58, type: 'speed', text: '80' },
            { z: BOARDS[1].z + 40, type: 'bend' },
            { z: U0 + 8, type: 'city' },
            { z: K0 - 6, type: 'speed', text: '50' }
        ];
        JUNCTIONS.forEach(function (J) {
            ROADSIGNS.push({ z: J.z - 62, type: 'cross' });
            ROADSIGNS.push({ z: J.z - 40, type: 'walk' });
        });

        // Buildings: scattered low houses first, then a continuous city
        BLOCKS = [];
        [-1, 1].forEach(function (side) {
            var at = U0 + (side > 0 ? 6 : 0), n = 0;
            while (at < end) {
                n++;
                var key = n * 7.3 + side * 19.1, city = at >= U1 - 8;
                var len = city ? 16 + seeded(key) * 20 : 9 + seeded(key) * 9;
                var after = city ? seeded(key * 2) * 2 : 10 + seeded(key * 2) * 26;
                var floors = city ? 3 + Math.floor(Math.pow(seeded(key * 3), 1.6) * 11) : 1 + Math.floor(seeded(key * 3) * 2.4);
                var J = null;
                JUNCTIONS.forEach(function (one) { if (at + len > one.z - CW - FOOT - 1.5 && at < one.z + CW + FOOT + 1.5) { J = one; } });
                var depth = 14 + seeded(key * 8) * 16;
                if (J) {
                    var limit = J.z - CW - FOOT - 1.5;
                    if (at >= limit || limit - at < 7) { at = J.z + CW + FOOT + 1.5; continue; }
                    len = limit - at; after = 0;
                }
                var afterJunction = false;
                JUNCTIONS.forEach(function (one) { if (Math.abs(at - (one.z + CW + FOOT + 1.5)) < .01) { afterJunction = true; } });
                if (afterJunction) { depth = 70; floors = Math.max(floors, 6); }
                var prev = null;
                for (var bi = BLOCKS.length - 1; bi >= 0; bi--) { if (BLOCKS[bi].side === side) { prev = BLOCKS[bi]; break; } }
                var hidden = !!prev && at - prev.z2 < 3 && prev.h >= 4.6 + floors * 3.2 && prev.x0 <= (city ? URB + FOOT + .4 : prev.x0);
                BLOCKS.push({
                    hiddenFront: hidden, side: side, z1: at, z2: at + len, depth: depth, h: 4.6 + floors * 3.2, floors: floors, house: at < K0, seed: key * 3.1,
                    x0: city ? URB + FOOT + .4 : Math.max(road(at) + 7, 12) + seeded(key * 4) * 10,
                    tex: at < K0 ? 6 : Math.floor(seeded(key * 5) * 6) % 6, u0: seeded(key * 6) * 20, tank: seeded(key * 7) > .45
                });
                at += len + after;
            }
        });
    }

    function applyResolution() {
        DPR = Math.min(window.devicePixelRatio || 1, 1.5) * QUALITY * MOTION;
        canvas.width = Math.round(W * DPR);
        canvas.height = Math.round(H * DPR);
    }
    function layout() {
        var r = canvas.getBoundingClientRect();
        W = r.width; H = r.height;
        applyResolution();
        F = Math.min(H * 0.98, W * 1.08);
        CX = W / 2;
        HY = H * (W < 720 ? .75 : .74);
        NEAR = Math.max(.9, F * CAM_H / (H - HY) * .55);
        var top = 70;
        BOARDS.forEach(function (b) {
            // A stretch of road with no board on this page still keeps its place along the road
            b.domW = b.el ? b.el.offsetWidth : 880;
            var ratio = b.el ? b.domW / b.el.offsetHeight : 2.4;
            // Fit the board between the navigation bar and its place above the horizon
            var fit = (HY - top) / (1 / ratio + (CLEARANCE - CAM_H) / BOARD_W);
            var shown = Math.min(fit, W - (W < 720 ? 20 : 90), 1040, W < 1100 ? 9999 : W * .74);
            b.rest = F * BOARD_W / shown;
            b.boardH = BOARD_W / ratio;
        });
        placeWorld();
        canvas.setAttribute('data-horizon', Math.round(HY));
        makeBackdrop();
        if (options.onLayout) { options.onLayout(); }
    }

    /* ---------- Painting helpers ---------- */
    function strip(x1, x2, za, zb, fill, y) {
        y = y || 0;
        var d1 = Math.max(za - CAM, NEAR), d2 = zb - CAM;
        if (d2 <= d1) { return; }
        var varying = typeof x1 === 'function' || typeof x2 === 'function';
        var n = varying ? Math.min(22, 2 + Math.ceil(Math.log(d2 / d1) * 7)) : 1, i, d, p;
        ctx.fillStyle = fill; ctx.beginPath();
        for (i = 0; i <= n; i++) { d = d1 * Math.pow(d2 / d1, i / n); p = px(val(x1, d + CAM), y, d); if (i) { ctx.lineTo(p[0], p[1]); } else { ctx.moveTo(p[0], p[1]); } }
        for (i = n; i >= 0; i--) { d = d1 * Math.pow(d2 / d1, i / n); p = px(val(x2, d + CAM), y, d); ctx.lineTo(p[0], p[1]); }
        ctx.closePath(); ctx.fill();
    }
    function ground(x1, x2, z1, z2, fill) {
        var a = px(x1, 0, z1), b = px(x2, 0, z1), c = px(x2, 0, z2), d = px(x1, 0, z2);
        ctx.fillStyle = fill;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.fill();
    }
    function wall(x, y1, y2, z1, z2, fill) {
        var a = px(x, y1, z1), b = px(x, y2, z1), c = px(x, y2, z2), d = px(x, y1, z2);
        ctx.fillStyle = fill;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.fill();
    }
    function bloom(color, x, y, size, alpha) {
        var s = glowSprite(color);
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.drawImage(s, x - size / 2, y - size / 2, size, size);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
    }
    function rounded(x, y, w, h, r) {
        ctx.beginPath();
        if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); } else { ctx.rect(x, y, w, h); }
    }
    function paintedArrow(xc, z, dir, kind) {
        // A painted arrow about 5 m long: straight ahead, or with a left turn
        var pts = kind === 'left'
            ? [[-.1, -2.5], [.1, -2.5], [.1, 1.3], [-.55, 1.3], [-.55, 1.9], [-1.25, .95], [-.55, 0], [-.55, .55], [-.1, .55]]
            : [[-.1, -2.5], [.1, -2.5], [.1, .7], [.42, .7], [0, 2.5], [-.42, .7], [-.1, .7]];
        ctx.beginPath();
        pts.forEach(function (p, i) { var q = px(xc + p[0] * dir, 0, z + p[1] * dir); if (i) { ctx.lineTo(q[0], q[1]); } else { ctx.moveTo(q[0], q[1]); } });
        ctx.closePath(); ctx.fill();
    }
    function vGrad(a) {
        var g = ctx.createLinearGradient(0, HY, 0, H);
        a.forEach(function (s) { g.addColorStop(s[0], s[1]); });
        return g;
    }

    /* ---------- Plots of land and the cross roads, under the buildings ---------- */
    function drawPlots(c) {
        var ramp, top = c + 340;
        for (ramp = 0; ramp < 8; ramp++) {
            var za = K0 - 40 + ramp * 5, zb = ramp === 7 ? top : za + 5;
            if (zb - c < NEAR) { continue; }
            ctx.globalAlpha = (ramp + 1) / 8;
            strip(-300, 300, za, zb, '#0b0f12');
        }
        ctx.globalAlpha = 1;
    }
    function drawCrossGround(J, tar, pave) {
        var d = J.z - CAM;
        if (d > RANGE || d < -CW - 12) { return; }
        strip(-XFAR, XFAR, J.z - CW, J.z + CW, tar);
        [-1, 1].forEach(function (side) {
            var a = side * (URB + RAD + FOOT), b = side * XFAR, i, x;
            strip(a, b, J.z - CW - FOOT, J.z - CW, pave, .16);
            strip(a, b, J.z + CW, J.z + CW + FOOT, pave, .16);
            var near = J.z + CW - CAM;
            if (near > NEAR) {
                ctx.fillStyle = '#7d8182';
                var p0 = px(a, 0, near), p1 = px(b, 0, near), p2 = px(b, .16, near), p3 = px(a, .16, near);
                ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.lineTo(p3[0], p3[1]); ctx.closePath(); ctx.fill();
            }
            var alpha = Math.min(1, fade(Math.max(1, d), 360) * 1.8);
            ctx.globalAlpha = alpha;
            // Cross road markings: broken centre line and edge lines
            for (x = URB + 8; x < XFAR; x += 7.5) {
                strip(side * x, side * (x + 3), J.z - .08, J.z + .08, '#e8eae5');
            }
            strip(side * (URB + 6.4), b, J.z - CW + .15, J.z - CW + .3, '#d9dbd6');
            strip(side * (URB + 6.4), b, J.z + CW - .3, J.z + CW - .15, '#d9dbd6');
            // Zebra crossing across each arm of the cross road
            for (i = 0; i < 13; i++) {
                var zs = J.z - CW + .45 + i * 1.02;
                strip(side * (URB + 1.7), side * (URB + 5.2), zs, zs + .5, '#eff0ec');
            }
            ctx.globalAlpha = 1;
        });
    }

    /* ---------- The carriageway and everything on it ---------- */
    function drawPavement(c, tar) {
        var i, z, FAR = 460, d;
        var end = K0 + 2;
        if (c + NEAR < end) {
            var soil = vGrad([[0, '#141a1d'], [.2, '#14130f'], [1, '#2b2519']]);
            strip(function (q) { return -soilW(q); }, soilW, c + NEAR, Math.min(c + 240, end), soil);
            var paved = vGrad([[0, '#171f27'], [.2, '#1b1e20'], [1, '#3d3f3f']]);
            strip(function (q) { return -pavedW(q); }, pavedW, c + NEAR, Math.min(c + 300, end), paved);
        }
        strip(nroad, road, c + NEAR, c + FAR, tar);

        var worn = vGrad([[0, 'rgba(120,130,140,0)'], [.3, 'rgba(120,130,140,.012)'], [1, 'rgba(150,158,165,.032)']]);
        [-2.75, -.95, .95, 2.75].forEach(function (x) {
            strip(x - .5, x + .5, c + NEAR, c + 260, worn); strip(x - .3, x + .3, c + NEAR, c + 260, worn); strip(x - .14, x + .14, c + NEAR, c + 260, worn);
        });
        if (c + 260 > W1) {
            [-6.1, -4.4, 4.4, 6.1].forEach(function (x) { strip(x - .4, x + .4, Math.max(W1, c + NEAR), c + 260, worn); strip(x - .2, x + .2, Math.max(W1, c + NEAR), c + 260, worn); });
        }
        var first = Math.floor(c / 29) - 1;
        for (i = first + 9; i >= first; i--) {
            z = i * 29 + seeded(i) * 16; d = z - c;
            if (d < NEAR || d > 260 || inJunction(z, CW + 10)) { continue; }
            ctx.globalAlpha = .14 * fade(d, 300);
            var side = seeded(i * 3) > .5 ? 1 : -1, x1 = side * (.3 + seeded(i * 5) * 1.3), w = .7 + seeded(i * 7) * 1.2;
            ground(Math.min(x1, x1 + side * w), Math.max(x1, x1 + side * w), d, d + 2.2 + seeded(i * 11) * 5, seeded(i * 13) > .5 ? '#0d1012' : '#34383b');
        }
        ctx.globalAlpha = 1;

        // Rumble strips on the paved shoulder of the highway
        var r0 = Math.floor(c / .9);
        for (i = r0 + 62; i >= r0; i--) {
            z = i * .9; d = z - c;
            if (d < NEAR || z > K0 - 40) { continue; }
            ctx.globalAlpha = .2 * fade(d, 70);
            ground(-RUR - .56, -RUR - .24, d, d + .22, '#6d7276');
            ground(RUR + .24, RUR + .56, d, d + .22, '#6d7276');
        }
        ctx.globalAlpha = 1;
    }
    function drawFootpaths(c, tar, pave) {
        if (c + 340 < K0) { return; }
        var inner = function (z) { return road(z) + .22; }, outer = function (z) { return road(z) + FOOT; };
        var inn = function (z) { return -inner(z); }, out = function (z) { return -outer(z); };
        var parts = spans(Math.max(K0, c + NEAR), c + 340, CW + RAD, CW + RAD);
        parts.forEach(function (s) {
            strip(inner, outer, s[0], s[1], pave, .16);
            strip(inn, out, s[0], s[1], pave, .16);
            // Tactile paving for visually impaired walkers
            strip(function (z) { return road(z) + 1.95; }, function (z) { return road(z) + 2.25; }, s[0], s[1], 'rgba(208,170,44,.3)', .16);
            strip(function (z) { return -road(z) - 1.95; }, function (z) { return -road(z) - 2.25; }, s[0], s[1], 'rgba(208,170,44,.3)', .16);
            // Far kerbs are a plain line; near ones are painted blocks
            var nearEdge = Math.min(s[1], c + 110);
            if (s[1] > nearEdge) {
                strip(road, inner, nearEdge, s[1], '#777b7c', .16);
                strip(nroad, inn, nearEdge, s[1], '#777b7c', .16);
            }
            var i0 = Math.floor(s[0] / 1.5), i1 = Math.floor(nearEdge / 1.5), i, pathDark = new Path2D(), pathLight = new Path2D();
            for (i = i1; i >= i0; i--) {
                var za = i * 1.5, zb = za + 1.5, da = Math.max(za - c, NEAR), db = zb - c;
                if (db <= da || za < s[0] - 1) { continue; }
                var ha = road(za), hb = road(zb), path = i % 2 ? pathDark : pathLight;
                [-1, 1].forEach(function (sd) {
                    var a0 = px(sd * ha, 0, da), a1 = px(sd * ha, .16, da), b1 = px(sd * hb, .16, db), b0 = px(sd * hb, 0, db);
                    var c1 = px(sd * (ha + .22), .16, da), d1 = px(sd * (hb + .22), .16, db);
                    path.moveTo(a0[0], a0[1]); path.lineTo(a1[0], a1[1]); path.lineTo(c1[0], c1[1]); path.lineTo(d1[0], d1[1]); path.lineTo(b1[0], b1[1]); path.lineTo(b0[0], b0[1]); path.closePath();
                });
            }
            ctx.fillStyle = '#16191b'; ctx.fill(pathDark);
            ctx.fillStyle = '#cfd1cc'; ctx.fill(pathLight);
            // Paving joints close to the viewer
            var jn = Math.floor(Math.min(s[1], c + (MOVING ? 0 : 60)) / 1.2), j0 = Math.floor(s[0] / 1.2), j, lines = new Path2D();
            for (j = jn; j >= j0; j--) {
                var zj = j * 1.2, dj = zj - c;
                if (dj < NEAR) { continue; }
                var hw = road(zj), pa = px(hw + .22, .16, dj), pb = px(hw + FOOT, .16, dj), qa = px(-hw - .22, .16, dj), qb = px(-hw - FOOT, .16, dj);
                lines.moveTo(pa[0], pa[1]); lines.lineTo(pb[0], pb[1]); lines.moveTo(qa[0], qa[1]); lines.lineTo(qb[0], qb[1]);
            }
            ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.stroke(lines);
            // Light falling from the shop fronts
            if (s[1] > U1) {
                ctx.globalCompositeOperation = 'lighter';
                strip(function (z) { return road(z) + 2.3; }, outer, Math.max(s[0], U1), s[1], 'rgba(255,186,116,.11)', .16);
                strip(function (z) { return -road(z) - 2.3; }, out, Math.max(s[0], U1), s[1], 'rgba(255,186,116,.11)', .16);
                ctx.globalCompositeOperation = 'source-over';
            }
        });
        // Junction corners: paved pads, then the rounded road edge cut into them
        JUNCTIONS.forEach(function (J) {
            if (J.z - c > 300 || J.z - c < -CW - 12) { return; }
            [-1, 1].forEach(function (side) {
                [-1, 1].forEach(function (end) {
                    var z1 = end < 0 ? J.z - CW - RAD - 1 : J.z + CW, z2 = end < 0 ? J.z - CW : J.z + CW + RAD + 1;
                    if (z2 - c < NEAR) { return; }
                    strip(side * URB, side * (URB + RAD + FOOT), z1, z2, pave, .16);
                    var cx = side * (URB + RAD), cz = end < 0 ? J.z - CW - RAD : J.z + CW + RAD, t, minD = Math.min(z1, z2) - c;
                    if (minD < NEAR) { return; }
                    var pts = [];
                    for (t = 0; t <= 8; t++) {
                        var a = t / 8 * Math.PI / 2;
                        pts.push(px(cx - side * RAD * Math.cos(a), 0, cz - end * RAD * Math.sin(a) - c));
                    }
                    var corner = px(side * URB, 0, (end < 0 ? J.z - CW : J.z + CW) - c);
                    ctx.fillStyle = tar; ctx.beginPath(); ctx.moveTo(corner[0], corner[1]);
                    pts.forEach(function (p) { ctx.lineTo(p[0], p[1]); });
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = '#a9acaa'; ctx.lineWidth = Math.max(1, .18 * pts[4][2]); ctx.lineCap = 'butt';
                    ctx.beginPath(); pts.forEach(function (p, n) { if (n) { ctx.lineTo(p[0], p[1]); } else { ctx.moveTo(p[0], p[1]); } }); ctx.stroke();
                });
            });
        });
    }
    function drawMarkings(c) {
        var i, z, d, FAR = 460;
        var line = vGrad([[0, 'rgba(236,240,240,.1)'], [.1, 'rgba(236,240,240,.5)'], [.42, 'rgba(244,246,244,.78)'], [1, 'rgba(250,250,247,.95)']]);
        var yellow = vGrad([[0, 'rgba(242,190,26,.12)'], [.1, 'rgba(242,190,26,.55)'], [.42, 'rgba(242,190,26,.8)'], [1, 'rgba(246,198,40,.95)']]);
        // Edge lines follow the road as it widens
        spans(c + NEAR, c + FAR, CW + RAD + 1, CW + RAD + 1).forEach(function (s) {
            strip(function (z2) { return -road(z2) + .04; }, function (z2) { return -road(z2) + .19; }, s[0], s[1], line);
            strip(function (z2) { return road(z2) - .19; }, function (z2) { return road(z2) - .04; }, s[0], s[1], line);
        });
        // In the city, a double yellow line at the centre, and a solid approach to each stop line
        if (c + FAR > K0) {
            spans(Math.max(K0, c + NEAR), c + FAR, CW + 6.6, CW + 6).forEach(function (s) {
                strip(-.2, -.08, s[0], s[1], yellow);
                strip(.08, .2, s[0], s[1], yellow);
            });
            JUNCTIONS.forEach(function (J) {
                var a = J.z - CW - 6.6 - 22, b = J.z - CW - 6.6;
                if (b - c < NEAR || a - c > 340) { return; }
                strip(-3.57, -3.43, a, b, line);
                strip(3.43, 3.57, a, b, line);
            });
        }
        // Lane lines of the four-lane road
        var P = 7.5, f0 = Math.floor((c + NEAR) / P) - 1;
        for (i = f0 + 56; i >= f0; i--) {
            z = i * P;
            var d1 = z - c, d2 = d1 + 3;
            if (d2 < NEAR) { continue; }
            if (d1 < NEAR) { d1 = NEAR; }
            ctx.globalAlpha = Math.min(.98, fade(d1, 420) * 1.5);
            if (z < K0) {
                // The rural centre line: a 3 m dash and a 4.5 m gap
                ground(-.075, .075, d1, d2, '#f3f4ee');
            } else if (z > W1 && !inJunction(z, CW + 6.6 + 22) && !inJunction(z + 3, CW + 6)) {
                ground(-3.57, -3.43, d1, d2, '#eceee9');
                ground(3.43, 3.57, d1, d2, '#eceee9');
            } else if (z > W1 && z > 0) {
                var nearStop = false;
                JUNCTIONS.forEach(function (J) { if (z > J.z + CW + 6 && z < J.z + CW + 28) { nearStop = true; } });
                if (nearStop) { ground(-3.57, -3.43, d1, d2, '#eceee9'); ground(3.43, 3.57, d1, d2, '#eceee9'); }
            }
        }
        ctx.globalAlpha = 1;

        // Lane arrows: India drives on the left, so left-hand lanes run away from us and right-hand lanes come towards us
        var ar0 = Math.floor(c / 72);
        ctx.fillStyle = '#eceee9';
        for (i = ar0 + 5; i >= ar0; i--) {
            z = i * 72 + 40;
            if (inJunction(z, CW + 36)) { continue; }
            d = z - c;
            if (d < NEAR + 3 || d > 300) { continue; }
            ctx.globalAlpha = Math.min(.96, fade(d, 300) * 1.7);
            ctx.fillStyle = '#eceee9';
            paintedArrow(-1.75, d, 1);
            paintedArrow(1.75, d, -1);
            if (z > W1) { paintedArrow(-5.25, d, 1); paintedArrow(5.25, d, -1); }
        }
        ctx.globalAlpha = 1;

        // Each junction: arrows, stop lines and zebra crossings on the main road
        JUNCTIONS.forEach(function (J) {
            var nearCross = J.z - CW - 5.2 - c, farCross = J.z + CW + 1.7 - c;
            if (farCross + 4 < NEAR || nearCross > 340) { return; }
            var a = Math.min(1, fade(Math.max(1, nearCross), 340) * 1.8), x;
            ctx.globalAlpha = a; ctx.fillStyle = '#eef0ea';
            var arrowD = J.z - CW - 6.6 - 11 - c;
            if (arrowD > NEAR + 3) { paintedArrow(-1.75, arrowD, 1); paintedArrow(-5.25, arrowD, 1, 'left'); }
            var arrowF = J.z + CW + 6.6 + 11 - c;
            if (arrowF > NEAR + 3) { paintedArrow(1.75, arrowF, -1); paintedArrow(5.25, arrowF, -1); }
            // Stop lines
            var stopN = J.z - CW - 6.8 - c;
            if (stopN > NEAR) { ground(-URB + .25, -.25, stopN, stopN + .5, '#f4f5f1'); }
            var stopF = J.z + CW + 6.2 - c;
            if (stopF > NEAR) { ground(.25, URB - .25, stopF, stopF + .5, '#f4f5f1'); }
            // Zebra crossings: stripes run along the direction of travel
            for (x = -URB + .55; x < URB - .4; x += 1.02) {
                if (nearCross + 3.6 > NEAR) { ground(x, x + .5, Math.max(NEAR, nearCross), nearCross + 3.6, '#f1f2ee'); }
                if (farCross + 3.6 > NEAR) { ground(x, x + .5, Math.max(NEAR, farCross), farCross + 3.6, '#f1f2ee'); }
            }
            ctx.globalAlpha = 1;
        });
    }
    function drawLightPools(c) {
        LAMPS.forEach(function (L) {
            var d = L.z - c;
            if (d < 7 || d > 260) { return; }
            var a = fade(d, 280) * (L.city ? .24 : .32) * Math.min(1, d / 26), wide = L.city ? 15 : 13, reach = L.city ? 5 : 4.3;
            [-1, 1].forEach(function (side) {
                var p = px(side * reach, 0, d), far = px(0, 0, d + 12), nr = px(0, 0, Math.max(.8, d - 10));
                var w = wide * p[2];
                ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a;
                ctx.drawImage(glowSprite(L.pool), p[0] - w / 2, far[1], w, nr[1] - far[1]);
            });
        });
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'lighter';
        var head = ctx.createRadialGradient(CX, H, 0, CX, H, Math.max(W * .55, 320));
        head.addColorStop(0, 'rgba(215,226,240,.13)'); head.addColorStop(1, 'rgba(215,226,240,0)');
        ctx.fillStyle = head; ctx.fillRect(0, HY, W, H - HY);
        ctx.globalCompositeOperation = 'source-over';
    }
    function drawCatsEyes(c) {
        // Raised pavement markers: amber on the centre line, white and red along the highway edges, white on city lane lines
        var i, d, a, p, base, z;
        var n = Math.floor((c - 5) / 7.5);
        for (i = n + 42; i >= n; i--) {
            z = i * 7.5 + 5.25;
            if (inJunction(z, CW + 7)) { continue; }
            d = z - c;
            if (d < NEAR * .9) { continue; }
            a = fade(d, 330);
            if (a <= 0) { continue; }
            if (d > 170 && i % 2) { continue; }
            p = px(0, .03, d); base = Math.max(1.8, .42 * p[2]);
            bloom('#ffb21f', p[0], p[1], Math.min(base, 62), Math.min(.9, a * 1.05));
            if (p[2] > 26) {
                ctx.fillStyle = '#26231f'; rounded(p[0] - .055 * p[2], p[1] - .018 * p[2], .11 * p[2], .036 * p[2], .01 * p[2]); ctx.fill();
                ctx.fillStyle = '#ffd24a'; ctx.fillRect(p[0] - .032 * p[2], p[1] - .012 * p[2], .064 * p[2], .016 * p[2]);
            }
        }
        var m = Math.floor(c / 15);
        for (i = m + 20; i >= m; i--) {
            z = i * 15 + 8; d = z - c;
            if (d < NEAR * .9 || inJunction(z, CW + 7)) { continue; }
            a = fade(d, 280);
            if (a <= 0) { continue; }
            if (z < K0 - 4) {
                [-RUR - .12, RUR + .12].forEach(function (x, side) {
                    p = px(x, .03, d); base = Math.max(1.6, .34 * p[2]);
                    bloom(side ? '#ff5a4a' : '#dfeaff', p[0], p[1], Math.min(base, 52), Math.min(.85, a));
                });
            } else if (z > W1) {
                [-3.5, 3.5].forEach(function (x) {
                    p = px(x, .03, d); base = Math.max(1.6, .3 * p[2]);
                    bloom('#dfeaff', p[0], p[1], Math.min(base, 46), Math.min(.8, a));
                });
            }
        }
    }

    /* ---------- Layer behind the road: trees, poles, buildings ---------- */
    function drawTree(side, x, d, height, a, idx) {
        var p = px(x, 0, d), h = height * p[2], w = h * .8, sx = p[0];
        if (sx + w < 0 || sx - w > W || h < 2) { return; }
        ctx.globalAlpha = a;
        ctx.save(); ctx.translate(sx, p[1]);
        if (side > 0) { ctx.scale(-1, 1); }
        ctx.drawImage(TREES[idx], -w / 2, -h, w, h);
        ctx.restore();
        ctx.globalAlpha = 1;
    }
    function drawWindows(b, xw, dn, d2) {
        // Close to the viewer, every window is a true perspective shape, so edges stay sharp and straight
        var groups = [new Path2D(), new Path2D(), new Path2D(), new Path2D()], colors = ['#141c26', '#e6b673', '#f5dcab', '#c6d7ef'];
        var curtains = new Path2D(), lines = new Path2D(), sills = new Path2D();
        var glass = b.tex === 4, step = b.house ? 4 : (glass ? 1.5 : 3), cols = Math.floor((b.z2 - b.z1) / step);
        var rows = b.house ? b.floors + 1 : b.floors, f, col, base = b.house ? .3 : 4.6;
        for (f = 0; f < rows; f++) {
            var y0 = base + f * 3.2;
            if (y0 >= b.h) { break; }
            var la = px(xw, y0, dn), lb = px(xw, y0, d2);
            lines.moveTo(la[0], la[1]); lines.lineTo(lb[0], lb[1]);
            for (col = 0; col < cols; col++) {
                var zA = b.z1 + col * step + (glass ? .05 : .6), zB = zA + (glass ? 1.4 : 1.8), dB = zB - CAM;
                if (dB < 1.8) { continue; }
                var dA = Math.max(zA - CAM, 1.8), xA = CX + xw * F / dA, xB = CX + xw * F / dB;
                if (Math.min(xA, xB) > W + 20 || Math.max(xA, xB) < -20) { continue; }
                var y1 = y0 + (glass ? .45 : .78), y2 = y0 + (glass ? 2.75 : 2.42);
                var a1 = px(xw, y1, dA), a2 = px(xw, y2, dA), b2 = px(xw, y2, dB), b1 = px(xw, y1, dB);
                if (a1[1] < -40 && b1[1] < -40) { continue; }
                var r = seeded(b.seed + f * 7.3 + col * 13.1), lit = r > (glass ? .55 : .62);
                var which = lit ? (seeded(r * 91) > .24 ? (seeded(r * 37) > .5 ? 1 : 2) : 3) : 0, g = groups[which];
                g.moveTo(a1[0], a1[1]); g.lineTo(a2[0], a2[1]); g.lineTo(b2[0], b2[1]); g.lineTo(b1[0], b1[1]); g.closePath();
                if (lit && !glass && !MOVING) {
                    // A curtain drawn part way, and the frame down the middle
                    var cut = zA + 1.8 * (.15 + seeded(r * 53) * .35), dC = cut - CAM;
                    if (dC > 1.8) {
                        var c1 = px(xw, y1, dC), c2 = px(xw, y2, dC);
                        curtains.moveTo(a1[0], a1[1]); curtains.lineTo(a2[0], a2[1]); curtains.lineTo(c2[0], c2[1]); curtains.lineTo(c1[0], c1[1]); curtains.closePath();
                    }
                }
                if (!glass && !MOVING) {
                    var mz = (zA + zB) / 2 - CAM;
                    if (mz > 1.8) { var m1 = px(xw, y1, mz), m2 = px(xw, y2, mz); sills.moveTo(m1[0], m1[1]); sills.lineTo(m2[0], m2[1]); }
                    var s1 = px(xw, y0 + .66, dA), s2 = px(xw, y0 + .66, dB);
                    sills.moveTo(s1[0], s1[1]); sills.lineTo(s2[0], s2[1]);
                }
            }
        }
        var s = px(xw, 0, Math.max(dn, 8))[2];
        groups.forEach(function (g, i) { ctx.fillStyle = colors[i]; ctx.fill(g); });
        ctx.fillStyle = 'rgba(52,30,16,.55)'; ctx.fill(curtains);
        ctx.strokeStyle = BASES[b.tex][1]; ctx.lineWidth = Math.max(1, .1 * s); ctx.stroke(lines);
        ctx.strokeStyle = 'rgba(8,11,15,.75)'; ctx.lineWidth = Math.max(.7, .035 * s); ctx.stroke(sills);
    }
    function drawShopStrip(b, xw, dn, d2, tex) {
        // The shop fronts: thin vertical slices sheared to follow the line of the footpath
        var a = CX + xw * F / dn, c = CX + xw * F / d2, n = Math.max(2, Math.min(72, Math.ceil(Math.abs(a - c) / (MOVING ? 16 : 8)))), i, TW = TEXW, sh = 4.6, srcH = sh * TEX, srcY = (TEXH - sh) * TEX;
        // Clip to the true outline of the shop fronts, so their top edge is one straight line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(a, HY + CAM_H * F / dn); ctx.lineTo(a, HY + (CAM_H - sh) * F / dn); ctx.lineTo(c, HY + (CAM_H - sh) * F / d2); ctx.lineTo(c, HY + CAM_H * F / d2);
        ctx.closePath(); ctx.clip();
        for (i = 0; i < n; i++) {
            var ia = 1 / dn + (1 / d2 - 1 / dn) * i / n, ib = 1 / dn + (1 / d2 - 1 / dn) * (i + 1) / n;
            var da = 1 / ia, db = 1 / ib, xa = CX + xw * F * ia, xb = CX + xw * F * ib;
            if (Math.max(xa, xb) < -8 || Math.min(xa, xb) > W + 8) { continue; }
            var ya = HY + CAM_H * F * ia, yb = HY + CAM_H * F * ib, hm = sh * F * (ia + ib) / 2;
            var za = da + CAM - b.z1 + b.u0, span = db - da, sx, sw, u;
            if (b.side < 0) { u = za % TW; sw = Math.min(span, TW - u); sx = u; } else { u = TW - (za % TW); sw = Math.min(span, u); sx = u - sw; }
            var srcW = Math.max(1, sw * TEX), x0, y0, x1, y1;
            if (xa < xb) { x0 = xa; y0 = ya; x1 = xb; y1 = yb; } else { x0 = xb; y0 = yb; x1 = xa; y1 = ya; }
            var grow = (x1 - x0 + .7) / srcW;
            ctx.setTransform(DPR * grow, DPR * (y1 - y0) / srcW, 0, DPR * hm / srcH, DPR * x0, DPR * (y0 - hm));
            ctx.drawImage(tex, sx * TEX, srcY, srcW, srcH, 0, 0, srcW, srcH);
        }
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        ctx.restore();
    }
    function drawBlock(b) {
        var d1 = b.z1 - CAM, d2 = b.z2 - CAM;
        if (d2 < 1.8 || d1 > RANGE) { return; }
        var fog = Math.min(1, (RANGE - d1) / 110), tex = FACADES[b.tex], xw = b.side * b.x0, dn = Math.max(d1, 1.8), TW = TEXW;
        var a0 = px(xw, 0, dn), a1 = px(xw, b.h, dn), b0 = px(xw, 0, d2), b1 = px(xw, b.h, d2);
        ctx.globalAlpha = fog;
        var shade = Math.min(.62, .04 + d2 / 620), wide = Math.abs(a0[0] - b0[0]);
        if (!(Math.max(a0[0], b0[0]) < 0 || Math.min(a0[0], b0[0]) > W)) {
            function outline() { ctx.beginPath(); ctx.moveTo(a0[0], a0[1]); ctx.lineTo(a1[0], a1[1]); ctx.lineTo(b1[0], b1[1]); ctx.lineTo(b0[0], b0[1]); ctx.closePath(); }
            outline(); ctx.fillStyle = BASES[b.tex][0]; ctx.fill();
            if (wide > 130) {
                drawWindows(b, xw, dn, d2);
                if (!b.house) { drawShopStrip(b, xw, dn, d2, tex); }
            } else if (wide < 14) {
                // So far away that a plain tinted wall is enough
                outline(); ctx.fillStyle = BASES[b.tex][1]; ctx.fill();
            } else {
                ctx.save(); outline(); ctx.clip();
                var n = Math.max(1, Math.min(MOVING ? 5 : 10, Math.ceil(wide / (MOVING ? 24 : 14)))), i;
                for (i = 0; i < n; i++) {
                    var ia = 1 / dn + (1 / d2 - 1 / dn) * i / n, ib = 1 / dn + (1 / d2 - 1 / dn) * (i + 1) / n;
                    var da = 1 / ia, db = 1 / ib, sm = F * (ia + ib) / 2;
                    var xa = CX + xw * F * ia, xb = CX + xw * F * ib;
                    var top = HY + (CAM_H - b.h) * sm, hh = b.h * sm, za = da + CAM - b.z1 + b.u0, span = db - da, sx, sw, u;
                    if (b.side < 0) { u = za % TW; sw = Math.min(span, TW - u); sx = u; } else { u = TW - (za % TW); sw = Math.min(span, u); sx = u - sw; }
                    ctx.drawImage(tex, sx * TEX, (TEXH - b.h) * TEX, Math.max(1, sw * TEX), b.h * TEX, Math.min(xa, xb), top, Math.abs(xb - xa) + .8, hh);
                }
                ctx.restore();
            }
            // The wall facing the road is turned away from the light, and distance softens it
            ctx.globalAlpha = fog;
            outline(); ctx.fillStyle = 'rgba(4,8,14,' + (shade + .06) + ')'; ctx.fill();
            // Roof edge
            ctx.strokeStyle = '#0a0d11'; ctx.lineWidth = Math.max(1, .28 * F / Math.max(dn, 8));
            ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(b1[0], b1[1]); ctx.stroke();
        }
        if (d1 > 1.8 && !b.hiddenFront) {
            var xo = b.side * (b.x0 + b.depth), p0 = px(xw, 0, d1), p1 = px(xo, 0, d1), pt = px(xw, b.h, d1);
            var left = Math.min(p0[0], p1[0]), wideF = Math.abs(p1[0] - p0[0]);
            if (!(left > W || left + wideF < 0)) {
                var srcW = Math.min(b.depth, TW);
                ctx.globalAlpha = fog;
                ctx.drawImage(tex, 0, (TEXH - b.h) * TEX, srcW * TEX, b.h * TEX, left, pt[1], wideF, p0[1] - pt[1]);
                ctx.fillStyle = 'rgba(4,8,14,' + shade + ')';
                ctx.fillRect(left, pt[1], wideF, p0[1] - pt[1]);
                var s = pt[2];
                ctx.fillStyle = '#0a0d11'; ctx.fillRect(left, pt[1] - .45 * s, wideF, .55 * s);
                if (b.tank && s > 3) {
                    // Black water tanks on the roof, as on most Indian buildings
                    var tx = left + wideF * (.2 + .5 * seeded(b.z1)), r = .75 * s;
                    ctx.fillStyle = '#060809'; ctx.fillRect(tx - r, pt[1] - 2.2 * s, r * 2, 1.8 * s);
                    ctx.beginPath(); ctx.ellipse(tx, pt[1] - 2.2 * s, r, r * .32, 0, 0, 6.3); ctx.fill();
                    ctx.fillRect(tx + r * 2, pt[1] - 1.2 * s, r * 1.5, .9 * s);
                }
            }
        }
        ctx.globalAlpha = 1;
    }
    function drawPoleLine(c) {
        // Electricity poles and wires along the rural road
        var n = Math.floor(c / 42), i;
        for (i = n + 7; i >= n; i--) {
            var z = i * 42 + 12, d = z - c;
            if (d < 3 || z > U1 - 24) { continue; }
            var a = Math.min(1, fade(d, 320) * 1.6);
            if (a <= 0) { continue; }
            var x = -16, b = px(x, 0, d), t = px(x, 9, d), s = t[2], w = Math.max(1, .17 * s);
            ctx.globalAlpha = a;
            ctx.fillStyle = '#1b1f20'; ctx.fillRect(b[0] - w / 2, t[1], w, b[1] - t[1]);
            ctx.fillRect(t[0] - 1.1 * s, t[1] + .35 * s, 2.2 * s, Math.max(1, .12 * s));
            var nextZ = z + 42, nd = nextZ - c;
            if (nextZ <= U1 - 24) {
                ctx.strokeStyle = '#252a2c'; ctx.lineWidth = Math.max(.6, .035 * s);
                [-1, 0, 1].forEach(function (off) {
                    var p1 = px(x + off, 8.7, d), p2 = px(x + off, 8.7, nd), m = px(x + off, 7.5, (d + nd) / 2);
                    ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.quadraticCurveTo(m[0], m[1], p2[0], p2[1]); ctx.stroke();
                });
            }
        }
        ctx.globalAlpha = 1;
    }
    function crossLamp(x, d) {
        var a = fade(d, 460);
        if (a <= 0) { return; }
        var b = px(x, 0, d), t = px(x, 9.5, d), s = t[2];
        ctx.globalAlpha = Math.min(1, a * 1.8);
        ctx.fillStyle = '#39434b'; ctx.fillRect(b[0] - Math.max(.8, .08 * s), t[1], Math.max(1.4, .16 * s), b[1] - t[1]);
        ctx.globalAlpha = 1;
        bloom('#e6eeff', t[0], t[1], Math.max(4, 2.3 * s), Math.min(1, a * 1.4));
    }

    /* ---------- Things standing beside or over the road ---------- */
    function drawBarriers(c) {
        var seg = 170, n = Math.floor(c / seg) - 1;
        for (var i = n + 3; i >= n; i--) {
            var from = i * seg + 36, to = Math.min(from + 88, K0 - 26);
            if (from >= K0 - 30) { continue; }
            var d1 = Math.max(NEAR, from - c), d2 = to - c;
            if (d2 <= NEAR || d1 > 260) { continue; }
            [-1, 1].forEach(function (side) {
                var x = side * 6.05, step, k = Math.floor(from / 3.2);
                for (step = Math.floor(to / 3.2); step >= k; step--) {
                    var dz = step * 3.2 - c;
                    if (dz < NEAR || dz > 170) { continue; }
                    ctx.globalAlpha = Math.min(1, fade(dz, 240) * 1.7);
                    var b = px(x + side * .08, 0, dz), t = px(x + side * .08, .78, dz), pw = Math.max(1, .1 * t[2]);
                    ctx.fillStyle = '#596269'; ctx.fillRect(b[0] - pw / 2, t[1], pw, b[1] - t[1]);
                }
                ctx.globalAlpha = 1;
                var z = d2, len = 8;
                while (z > d1) {
                    var z0 = Math.max(d1, z - len);
                    ctx.globalAlpha = Math.min(1, fade(z, 300) * 1.7);
                    wall(x, .48, .8, z0, z, '#8f9aa1');
                    wall(x, .6, .68, z0, z, '#5f6a71');
                    z = z0;
                }
                ctx.globalAlpha = 1;
                for (var q = Math.floor(to / 16); q * 16 >= from; q--) {
                    var rd = q * 16 - c;
                    if (rd < NEAR + .5 || rd > 240) { continue; }
                    var rp = px(x, .7, rd);
                    bloom(side < 0 ? '#ffb21f' : '#dfeaff', rp[0], rp[1], Math.max(2, .32 * rp[2]), fade(rd, 260));
                }
            });
        }
    }
    function drawGuardRails(c) {
        // Pedestrian guard rail along the kerb: it keeps walkers on the footpath, away from traffic
        var a = Math.max(K0 + 26, c + NEAR), b = c + 230;
        if (b <= a) { return; }
        var parts = spans(a, b, CW + RAD + 3, CW + RAD + 3);
        [-1, 1].forEach(function (side) {
            parts.forEach(function (s) {
                var list = side < 0 ? (function () {
                    // an opening at the bus stop
                    var out = [];
                    if (BUS - 1.5 > s[0] && BUS + 10 < s[1]) { out.push([s[0], BUS - 1.5]); out.push([BUS + 10, s[1]]); } else { out.push(s); }
                    return out;
                })() : [s];
                list.forEach(function (part) {
                    var z = part[1], lenA = 7;
                    while (z > part[0]) {
                        var z0 = Math.max(part[0], z - lenA), da = Math.max(z0 - c, NEAR), db = z - c, alpha = Math.min(1, fade(db, 300) * 1.7);
                        if (db > NEAR) {
                            var xa = side * (road(z0) + .36), xb = side * (road(z) + .36);
                            ctx.globalAlpha = alpha;
                            [[1.02, 1.1, '#b2bbc0'], [.52, .57, '#7f898f']].forEach(function (r) {
                                var p1 = px(xa, r[0], da), p2 = px(xa, r[1], da), p3 = px(xb, r[1], db), p4 = px(xb, r[0], db);
                                ctx.fillStyle = r[2]; ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.lineTo(p3[0], p3[1]); ctx.lineTo(p4[0], p4[1]); ctx.closePath(); ctx.fill();
                            });
                        }
                        z = z0;
                    }
                    ctx.globalAlpha = 1;
                    var j, posts = new Path2D(), bars = new Path2D();
                    var p0 = Math.floor(part[0] / 2), p1 = Math.floor(Math.min(part[1], c + 90) / 2);
                    for (j = p1; j >= p0; j--) {
                        var zp = j * 2, dp = zp - c;
                        if (dp < NEAR || zp < part[0]) { continue; }
                        var xp = side * (road(zp) + .36), pb = px(xp, .16, dp), pt = px(xp, 1.1, dp);
                        posts.moveTo(pb[0], pb[1]); posts.lineTo(pt[0], pt[1]);
                    }
                    var k0 = Math.floor(part[0] / .5), k1 = Math.floor(Math.min(part[1], c + (MOVING ? 0 : 26)) / .5);
                    for (j = k1; j >= k0; j--) {
                        var zb2 = j * .5, db2 = zb2 - c;
                        if (db2 < NEAR || zb2 < part[0]) { continue; }
                        var xb2 = side * (road(zb2) + .36), q0 = px(xb2, .2, db2), q1 = px(xb2, 1.03, db2);
                        bars.moveTo(q0[0], q0[1]); bars.lineTo(q1[0], q1[1]);
                    }
                    var s0 = px(side * (road(c + 12) + .36), 0, 12)[2];
                    ctx.strokeStyle = '#8f999f'; ctx.lineWidth = Math.max(1, .05 * s0); ctx.stroke(posts);
                    ctx.strokeStyle = 'rgba(128,138,144,.7)'; ctx.lineWidth = Math.max(.7, .02 * s0); ctx.stroke(bars);
                });
            });
        });
    }
    function delineator(x, d, side) {
        var a = fade(d, 300);
        if (a <= 0) { return; }
        var b = px(x, 0, d), t = px(x, 1, d), s = t[2], pw = Math.max(1, .13 * s), h = b[1] - t[1];
        ctx.globalAlpha = Math.min(1, a * 1.6);
        ctx.fillStyle = '#d8dcdc'; ctx.fillRect(b[0] - pw / 2, t[1], pw, h);
        if (h > 8) {
            ctx.fillStyle = '#14171a'; ctx.fillRect(b[0] - pw / 2, t[1], pw, h * .3);
            ctx.fillStyle = side < 0 ? '#ffb21f' : '#f1f6ff'; ctx.fillRect(b[0] - pw * .34, t[1] + h * .06, pw * .68, h * .17);
        }
        ctx.globalAlpha = 1;
        var r = px(x, .86, d);
        bloom(side < 0 ? '#ffb21f' : '#dfeaff', r[0], r[1], Math.min(Math.max(2.4, .5 * r[2]), 70), Math.min(.95, a * 1.1));
    }
    function streetLight(side, d, L) {
        var a = fade(d, 460);
        if (a <= 0) { return; }
        var x = side * (L.city ? 7.75 : 7.5), armX = side * (L.city ? 4.4 : 5.2);
        var b = px(x, 0, d), t = px(x, 9.5, d), s = t[2], pw = Math.max(1, .16 * s);
        ctx.globalAlpha = Math.min(1, a * 1.8);
        ctx.fillStyle = '#39434b'; ctx.fillRect(b[0] - pw / 2, t[1], pw, b[1] - t[1]);
        var arm = px(armX, 9.75, d);
        ctx.strokeStyle = '#39434b'; ctx.lineWidth = Math.max(1, .1 * s); ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(t[0], t[1]); ctx.quadraticCurveTo(t[0], arm[1], arm[0], arm[1]); ctx.stroke();
        ctx.fillStyle = '#20262b'; ctx.fillRect(arm[0] - .42 * s, arm[1] - .04 * s, .84 * s, .14 * s);
        ctx.globalAlpha = 1;
        bloom(L.col, arm[0], arm[1] + .12 * s, Math.max(4, (L.city ? 2.1 : 2.5) * s), Math.min(1, a * 1.4));
    }
    function kmStone(d, n) {
        var a = fade(d, 170);
        if (a <= 0) { return; }
        var x = -6.7, l = px(x - .3, 0, d), s = l[2], w = .6 * s, h = .95 * s, y = l[1] - h;
        ctx.globalAlpha = Math.min(1, a * 1.8);
        ctx.fillStyle = '#e7e7df'; ctx.fillRect(l[0], y + h * .34, w, h * .66);
        ctx.fillStyle = '#f2be1a'; rounded(l[0], y, w, h * .38, [w / 2, w / 2, 0, 0]); ctx.fill();
        if (w > 18) {
            ctx.fillStyle = '#14171a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = '800 ' + (.17 * s) + 'px Overpass, Arial, sans-serif'; ctx.fillText('TRC', l[0] + w / 2, y + h * .24);
            ctx.font = '800 ' + (.26 * s) + 'px Overpass, Arial, sans-serif'; ctx.fillText(n, l[0] + w / 2, y + h * .6);
            ctx.font = '600 ' + (.12 * s) + 'px Overpass, Arial, sans-serif'; ctx.fillText('km', l[0] + w / 2, y + h * .84);
        }
        ctx.globalAlpha = 1;
    }
    function polePlate(x, d, poleH) {
        var a = fade(d, 230);
        if (a <= 0) { return null; }
        var b = px(x, 0, d), t = px(x, poleH, d), s = t[2], pw = Math.max(1, .08 * s);
        ctx.globalAlpha = Math.min(1, a * 1.8);
        ctx.fillStyle = '#7c868c'; ctx.fillRect(b[0] - pw / 2, t[1], pw, b[1] - t[1]);
        return { x: t[0], y: t[1], s: s };
    }
    function signX(z) { return -Math.max(road(z) + 1.5, 5.8); }
    function speedSign(z, d, text) {
        var q = polePlate(signX(z), d, 3.1);
        if (!q) { return; }
        var r = .62 * q.s;
        ctx.fillStyle = '#f6f6f2'; ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, 6.3); ctx.fill();
        ctx.strokeStyle = '#d0202c'; ctx.lineWidth = .15 * q.s; ctx.beginPath(); ctx.arc(q.x, q.y, r - .075 * q.s, 0, 6.3); ctx.stroke();
        if (r > 6) {
            ctx.fillStyle = '#111417'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = '800 ' + (.58 * q.s) + 'px Overpass, Arial, sans-serif'; ctx.fillText(text, q.x, q.y + .04 * q.s);
        }
        ctx.globalAlpha = 1;
    }
    function warnSign(z, d, kind) {
        var q = polePlate(signX(z), d, 3.1);
        if (!q) { return; }
        var r = .78 * q.s;
        ctx.fillStyle = '#f6f6f2'; ctx.strokeStyle = '#d0202c'; ctx.lineWidth = .15 * q.s; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(q.x, q.y - r); ctx.lineTo(q.x + r * .95, q.y + r * .72); ctx.lineTo(q.x - r * .95, q.y + r * .72); ctx.closePath(); ctx.fill(); ctx.stroke();
        if (r > 6) {
            var u = r / 10;
            ctx.fillStyle = '#111417'; ctx.strokeStyle = '#111417'; ctx.lineCap = 'round';
            if (kind === 'cross') {
                ctx.fillRect(q.x - .9 * u, q.y - 4.6 * u, 1.8 * u, 9.4 * u);
                ctx.fillRect(q.x - 3.9 * u, q.y - .9 * u, 7.8 * u, 1.8 * u);
            } else if (kind === 'bend') {
                ctx.lineWidth = 1.6 * u;
                ctx.beginPath(); ctx.moveTo(q.x - 2 * u, q.y + 4.6 * u); ctx.lineTo(q.x - 2 * u, q.y + .6 * u); ctx.quadraticCurveTo(q.x - 2 * u, q.y - 3 * u, q.x + 2.1 * u, q.y - 3 * u); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(q.x + 2.1 * u, q.y - 5 * u); ctx.lineTo(q.x + 4.1 * u, q.y - 3 * u); ctx.lineTo(q.x + 2.1 * u, q.y - 1 * u); ctx.closePath(); ctx.fill();
            } else {
                ctx.lineWidth = 1.35 * u;
                ctx.beginPath(); ctx.arc(q.x + .4 * u, q.y - 3.6 * u, 1.05 * u, 0, 6.3); ctx.fill();
                ctx.beginPath(); ctx.moveTo(q.x + .2 * u, q.y - 2 * u); ctx.lineTo(q.x - .2 * u, q.y + 1.8 * u);
                ctx.moveTo(q.x - .2 * u, q.y + 1.8 * u); ctx.lineTo(q.x - 1.9 * u, q.y + 5 * u);
                ctx.moveTo(q.x - .2 * u, q.y + 1.8 * u); ctx.lineTo(q.x + 1.7 * u, q.y + 5 * u);
                ctx.moveTo(q.x - 1.9 * u, q.y + .2 * u); ctx.lineTo(q.x + .1 * u, q.y - 1.2 * u); ctx.lineTo(q.x + 2 * u, q.y + .3 * u);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1;
    }
    function citySign(z, d) {
        // A place sign on two posts, where the city begins
        var a = fade(d, 200);
        if (a <= 0) { return; }
        ctx.globalAlpha = Math.min(1, a * 1.9);
        var x = signX(z) - 1.2, w = 4, h = 1.7, y = 1.9;
        [x - w * .3, x + w * .3].forEach(function (px0) {
            var b = px(px0, 0, d), t = px(px0, y + h, d), pw = Math.max(1, .1 * t[2]);
            ctx.fillStyle = '#7c868c'; ctx.fillRect(b[0] - pw / 2, t[1], pw, b[1] - t[1]);
        });
        var tl = px(x - w / 2, y + h, d), br = px(x + w / 2, y, d), s = tl[2];
        ctx.fillStyle = '#0b5d45'; rounded(tl[0], tl[1], br[0] - tl[0], br[1] - tl[1], .1 * s); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = Math.max(.6, .05 * s); rounded(tl[0] + .07 * s, tl[1] + .07 * s, br[0] - tl[0] - .14 * s, br[1] - tl[1] - .14 * s, .06 * s); ctx.stroke();
        if (s > 5) {
            ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = '800 ' + (.82 * s) + 'px Overpass, Arial, sans-serif'; ctx.fillText('SURAT', (tl[0] + br[0]) / 2, (tl[1] + br[1]) / 2 + .04 * s);
        }
        ctx.globalAlpha = 1;
    }
    function bollard(x, d) {
        var a = fade(d, 220);
        if (a <= 0) { return; }
        var b = px(x, .16, d), t = px(x, 1.05, d), s = t[2], w = Math.max(1, .15 * s), h = b[1] - t[1];
        ctx.globalAlpha = Math.min(1, a * 1.7);
        ctx.fillStyle = '#20252a'; ctx.fillRect(b[0] - w / 2, t[1], w, h);
        ctx.fillStyle = '#e5c21c'; ctx.fillRect(b[0] - w / 2, t[1] + h * .12, w, h * .15);
        ctx.fillStyle = '#e6e8e6'; ctx.fillRect(b[0] - w / 2, t[1] + h * .3, w, h * .12);
        ctx.globalAlpha = 1;
    }
    function signalState(J) {
        if (CAM < J.hold + .6 || J.last) { return 'red'; }
        return CAM < J.hold + 4 ? 'amber' : 'green';
    }
    function signalHead(cx, topY, s, state, alpha, withCount, J) {
        var hw = .44 * s, hh = 1.2 * s, hx = cx - hw / 2;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#0c0f11'; rounded(hx, topY, hw, hh, .06 * s); ctx.fill();
        var slots = [[.2, 'red', '#ff4438', '#2d1513'], [.5, 'amber', '#ffb300', '#2c2410'], [.8, 'green', '#3effa4', '#0f2a1d']], litY = 0, litC = '#fff';
        slots.forEach(function (l) {
            var on = l[1] === state;
            ctx.fillStyle = on ? l[2] : l[3];
            ctx.beginPath(); ctx.arc(cx, topY + hh * l[0], .14 * s, 0, 6.3); ctx.fill();
            if (on) { litY = topY + hh * l[0]; litC = l[2]; }
        });
        if (withCount && s > 7) {
            // Countdown timer beside the lamps, as on many Indian signals
            var cw2 = .78 * s, chh = .52 * s, cxx = cx + hw / 2 + .05 * s;
            ctx.fillStyle = '#07090b'; rounded(cxx, topY, cw2, chh, .05 * s); ctx.fill();
            ctx.fillStyle = litC; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = '700 ' + (.42 * s) + 'px "Overpass Mono", Consolas, monospace';
            var left = state === 'red' ? Math.max(1, Math.ceil(2 + Math.max(0, J.hold - CAM) / 5)) : (state === 'amber' ? 3 : 30);
            ctx.fillText(String(Math.min(99, left)).padStart(2, '0'), cxx + cw2 / 2, topY + chh / 2 + .03 * s);
        }
        ctx.globalAlpha = 1;
        bloom(litC === '#3effa4' ? '#30f095' : litC, cx, litY, Math.max(5, 1.9 * s), Math.min(1, alpha));
        return { x: cx, c: litC === '#3effa4' ? '#30f095' : litC };
    }
    function drawSignals(J) {
        var state = signalState(J), nearZ = J.z - CW - 5.6 - CAM, farZ = J.z + CW + 2 - CAM;
        function post(x, d, h) {
            if (d < 1.6) { return; }
            var a = fade(d, 320);
            if (a <= 0) { return; }
            var al = Math.min(1, a * 1.8), b = px(x, .16, d), t = px(x, h, d), s = t[2], pw = Math.max(1, .14 * s);
            ctx.globalAlpha = al; ctx.fillStyle = '#46515a'; ctx.fillRect(b[0] - pw / 2, t[1], pw, b[1] - t[1]);
            signalHead(t[0], t[1] - 1.2 * s, s, state, al, true, J);
            ctx.globalAlpha = al;
            // Pedestrian signal lower on the same post
            if (s > 8) {
                var bw = .4 * s, by = t[1] + .7 * s, man = state === 'red' ? '#3effa4' : '#ff4438';
                ctx.fillStyle = '#0c0f11'; rounded(t[0] - bw / 2, by, bw, .55 * s, .04 * s); ctx.fill();
                ctx.fillStyle = man; ctx.beginPath(); ctx.arc(t[0], by + .13 * s, .05 * s, 0, 6.3); ctx.fill();
                ctx.fillRect(t[0] - .035 * s, by + .19 * s, .07 * s, .26 * s);
            }
            ctx.globalAlpha = 1;
        }
        post(-(URB + .9), nearZ, 3.9);
        post(URB + .9, farZ, 3.9);
        if (farZ > 1.6) {
            // Mast arm over the far side of the junction, with a lamp for each of our lanes
            var a = fade(farZ, 340);
            if (a > 0) {
                var al = Math.min(1, a * 1.8), x0 = -(URB + .9), b = px(x0, .16, farZ), t = px(x0, 7, farZ), s = t[2], pw = Math.max(1, .2 * s);
                ctx.globalAlpha = al; ctx.fillStyle = '#46515a'; ctx.fillRect(b[0] - pw / 2, t[1], pw, b[1] - t[1]);
                var tip = px(-.9, 7.1, farZ);
                ctx.strokeStyle = '#46515a'; ctx.lineWidth = Math.max(1, .13 * s); ctx.beginPath(); ctx.moveTo(t[0], t[1]); ctx.lineTo(tip[0], tip[1]); ctx.stroke();
                ctx.globalAlpha = 1;
                [-5.25, -1.75].forEach(function (lane, i) {
                    var at = px(lane, 7, farZ);
                    var head = signalHead(at[0], at[1], s, state, al, i === 1, J);
                    // The lamp's reflection on the road surface
                    var g = px(lane, 0, farZ - 4), rw = 1.1 * s, rl = 5.2 * s;
                    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .34 * al;
                    ctx.drawImage(glowSprite(head.c), g[0] - rw / 2, g[1] - rl * .12, rw, rl);
                    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
                });
            }
        }
    }
    function gantry(d, topY, boardBottom, boardTop, alpha) {
        var c = COLUMN, low = boardBottom + .35, high = Math.min(topY - .1, boardTop + .15);
        ctx.globalAlpha = alpha;
        [-c, c].forEach(function (x) {
            var bb = px(x, 0, d), t = px(x, topY, d), s = t[2], pw = Math.max(1, .42 * s);
            var lg = ctx.createLinearGradient(t[0] - pw / 2, 0, t[0] + pw / 2, 0);
            lg.addColorStop(0, '#59646c'); lg.addColorStop(.5, '#39444c'); lg.addColorStop(1, '#232b31');
            ctx.fillStyle = lg; ctx.fillRect(t[0] - pw / 2, t[1], pw, bb[1] - t[1]);
            var fw = .95 * s, fh = .8 * s;
            ctx.fillStyle = '#6b6f6c'; ctx.fillRect(bb[0] - fw / 2, bb[1] - fh, fw, fh);
            if (fw > 8) {
                ctx.fillStyle = '#e5c21c'; ctx.fillRect(bb[0] - fw / 2, bb[1] - fh * .72, fw, fh * .16);
                ctx.fillStyle = '#17191b'; ctx.fillRect(bb[0] - fw / 2, bb[1] - fh * .46, fw, fh * .16);
            }
        });
        var aL = px(-c, high, d), aR = px(c, high, d), bL = px(-c, low, d), bR = px(c, low, d), S = aL[2];
        ctx.strokeStyle = '#4a555d'; ctx.lineWidth = Math.max(.8, .14 * S);
        ctx.beginPath(); ctx.moveTo(aL[0], aL[1]); ctx.lineTo(aR[0], aR[1]); ctx.moveTo(bL[0], bL[1]); ctx.lineTo(bR[0], bR[1]); ctx.stroke();
        if (S > 5) {
            ctx.lineWidth = Math.max(.6, .07 * S); ctx.beginPath();
            var n = 18, up = false;
            for (var i = 0; i <= n; i++) {
                var xx = aL[0] + (aR[0] - aL[0]) * i / n;
                if (i === 0) { ctx.moveTo(xx, bL[1]); } else { ctx.lineTo(xx, up ? bL[1] : aL[1]); up = !up; }
            }
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
    function person(x, y, d, idx, walking, flip) {
        if (d < 1.8 || d > 170) { return; }
        var p = px(x, y, d), h = 1.7 * p[2], w = h * .4;
        if (p[0] + w < 0 || p[0] - w > W) { return; }
        ctx.globalAlpha = Math.min(1, fade(d, 220) * 1.9);
        ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(p[0], p[1], w * .62, w * .12, 0, 0, 6.3); ctx.fill();
        ctx.save(); ctx.translate(p[0], p[1]);
        if (flip) { ctx.scale(-1, 1); }
        ctx.drawImage(PEOPLE[(idx * 2 + (walking ? 1 : 0)) % PEOPLE.length], -w / 2, -h, w, h);
        ctx.restore();
        ctx.globalAlpha = 1;
    }
    function drawBusStop(d) {
        // A bus shelter on the left footpath, with a lit advertising panel at its near end
        if (d < 1.6 || d > 170) { return; }
        var a = Math.min(1, fade(d, 200) * 1.9), d2 = d + 8, x = -(URB + 2.65), back = x - .4;
        ctx.globalAlpha = a;
        wall(back, .16, 2.55, d, d2, '#20303d');
        wall(back, .7, 2.2, Math.max(d, 1.7), d2, 'rgba(150,190,220,.32)');
        wall(x + .55, 2.55, 2.75, d, d2, '#0b0f13');
        var rl = px(back, 2.75, d), rr = px(x + .55, 2.75, d), rf = px(x + .55, 2.75, d2), rb = px(back, 2.75, d2);
        ctx.fillStyle = '#1b2228'; ctx.beginPath(); ctx.moveTo(rl[0], rl[1]); ctx.lineTo(rr[0], rr[1]); ctx.lineTo(rf[0], rf[1]); ctx.lineTo(rb[0], rb[1]); ctx.closePath(); ctx.fill();
        [d, d + 4, d2].forEach(function (pd) {
            var b = px(x + .5, .16, pd), t = px(x + .5, 2.55, pd);
            ctx.fillStyle = '#0d1115'; ctx.fillRect(b[0] - Math.max(.7, .05 * t[2]), t[1], Math.max(1.4, .1 * t[2]), b[1] - t[1]);
        });
        wall(back + .2, .55, .65, d + .8, d2 - .8, '#58646d');
        // The lit panel
        var tl = px(back, 2.3, d), br = px(x + .4, .3, d), s = tl[2];
        ctx.fillStyle = '#0a0d11'; ctx.fillRect(tl[0] - .08 * s, tl[1] - .08 * s, br[0] - tl[0] + .16 * s, br[1] - tl[1] + .16 * s);
        var g = ctx.createLinearGradient(0, tl[1], 0, br[1]);
        g.addColorStop(0, '#e9f2ff'); g.addColorStop(1, '#9fc0e6');
        ctx.fillStyle = g; ctx.fillRect(tl[0], tl[1], br[0] - tl[0], br[1] - tl[1]);
        if (s > 12) {
            ctx.fillStyle = '#0b4280'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = '800 ' + (.27 * s) + 'px Overpass, Arial, sans-serif'; ctx.fillText('BUS', (tl[0] + br[0]) / 2, tl[1] + .5 * s); ctx.fillText('STOP', (tl[0] + br[0]) / 2, tl[1] + .82 * s);
        }
        ctx.globalAlpha = 1;
    }
    function drawCrossTraffic(J) {
        var d = J.z - CAM;
        if (d < 8 || d > 190) { return; }
        var t = Math.max(0, (CAM - (J.hold - 70)) / 70), after = Math.max(0, CAM - J.hold) * 10;
        // Vehicles only show in the gap between the near corner buildings
        var corner = J.z - CW - FOOT - 1.5 - CAM;
        ctx.save();
        if (corner > 1.5) {
            var limit = (URB + FOOT + .4) * F / corner;
            ctx.beginPath(); ctx.rect(CX - limit, 0, limit * 2, H); ctx.clip();
        }
        // Traffic keeps left: heading right on screen uses the far side, heading left uses the near side
        var list = [
            { kind: 0, x: -64 + 60 * Math.min(t, 1) + after - 6, z: J.z + 3.5, dir: 1 },
            { kind: 1, x: -86 + 60 * Math.min(t, 1) + after - 12, z: J.z + 5.6, dir: 1 },
            { kind: 2, x: 62 - 60 * Math.min(t, 1) - after + 15, z: J.z - 3.5, dir: -1 },
            { kind: 0, x: 96 - 60 * Math.min(t, 1) - after - 24, z: J.z - 5.6, dir: -1 }
        ];
        list.sort(function (a, b) { return b.z - a.z; });
        list.forEach(function (v) {
            var dz = v.z - CAM;
            if (dz < 3) { return; }
            var V = VEHICLES[v.kind], p = px(v.x, 0, dz), s = p[2], w = V.len * s, h = V.h * s;
            if (p[0] + w < 0 || p[0] - w > W) { return; }
            var al = Math.min(1, fade(dz, 240) * 1.9);
            ctx.globalAlpha = al;
            ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(p[0], p[1], w * .52, w * .06, 0, 0, 6.3); ctx.fill();
            ctx.save(); ctx.translate(p[0], p[1]);
            if (v.dir < 0) { ctx.scale(-1, 1); }
            ctx.drawImage(V.img, -w / 2, -h, w, h);
            ctx.fillStyle = 'rgba(4,8,14,.3)'; ctx.fillRect(-w / 2, -h, w, h);
            ctx.restore();
            ctx.globalAlpha = 1;
            var fx = p[0] + v.dir * w * (V.front - .5), tx = p[0] + v.dir * w * (V.tail - .5), ly = p[1] - h * V.y;
            bloom('#fff4d6', fx, ly, Math.max(5, 1.5 * s), al);
            bloom('#ff3a2e', tx, ly, Math.max(4, .85 * s), al);
            // headlight on the road ahead
            ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .2 * al;
            var bw = 4 * s;
            ctx.drawImage(glowSprite('#fff4d6'), v.dir > 0 ? fx : fx - bw, p[1] - .22 * s, bw, .55 * s);
            ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
        });
        ctx.restore();
    }

    function drawClosure(d) {
        // The road is closed ahead: red and white barricades with amber lamps, and cones leading to them
        if (d < 2) { return; }
        var a = Math.min(1, fade(d, 240) * 1.9);
        [-2.45, 0, 2.45].forEach(function (x) {
            var w = 2.2, leftX = x - w / 2, i;
            ctx.globalAlpha = a; ctx.fillStyle = '#23282c';
            [leftX + .2, leftX + w - .2].forEach(function (lx) {
                var b = px(lx, 0, d), t = px(lx, 1.32, d), pw = Math.max(1, .08 * t[2]);
                ctx.fillRect(b[0] - pw / 2, t[1], pw, b[1] - t[1]);
            });
            [[.62, .9], [1.02, 1.3]].forEach(function (band) {
                for (i = 0; i < 8; i++) {
                    var x1 = px(leftX + w * i / 8, band[1], d), x2 = px(leftX + w * (i + 1) / 8, band[0], d);
                    ctx.fillStyle = i % 2 ? '#f2f2ee' : '#d0202c';
                    ctx.fillRect(x1[0], x1[1], x2[0] - x1[0] + .5, x2[1] - x1[1]);
                }
            });
            ctx.globalAlpha = 1;
            var lamp = px(x, 1.5, d);
            bloom('#ffb21f', lamp[0], lamp[1], Math.max(5, 1.1 * lamp[2]), Math.min(1, a * 1.2));
        });
        [-3.1, 3.1].forEach(function (x) {
            [6, 11, 16].forEach(function (back) {
                var cd = d - back;
                if (cd < 2) { return; }
                var b = px(x, 0, cd), s = b[2], h = .75 * s, w = .34 * s;
                ctx.globalAlpha = Math.min(1, fade(cd, 200) * 1.9);
                ctx.fillStyle = '#e8611c';
                ctx.beginPath(); ctx.moveTo(b[0], b[1] - h); ctx.lineTo(b[0] + w / 2, b[1]); ctx.lineTo(b[0] - w / 2, b[1]); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#f2f2ee'; ctx.fillRect(b[0] - w * .24, b[1] - h * .58, w * .48, h * .16);
                ctx.globalAlpha = 1;
            });
        });
    }

    /* ---------- The scene ---------- */
    function draw(c) {
        CAM = c;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(SKY, 0, 0, W, H);
        var dawn = smooth(U1 - 60, BOARDS[BOARDS.length - 1].z, c);
        if (dawn > 0) {
            ctx.globalAlpha = dawn * .8;
            ctx.drawImage(DAWN, 0, 0, W, H);
            ctx.globalAlpha = 1;
        }
        var grow = smooth(0, U1, c), scale = 1 + grow * 1.7, sw = W * scale, sh = cityH * scale;
        ctx.drawImage(CITY, CX - sw / 2, HY - sh + 1, sw, sh);
        if (grow > 0) {
            var cg = glowSprite('#ffb06a'), gw = W * (1 + grow), gh = H * .5 * (.6 + grow * .6);
            ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .28 * grow;
            ctx.drawImage(cg, CX - gw / 2, HY - gh * .75, gw, gh);
            ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
        }
        ctx.drawImage(LAND, 0, 0, W, H);

        var tar = vGrad([[0, '#111a23'], [.14, '#14171a'], [.5, '#22262a'], [1, '#2e3236']]);
        var pave = vGrad([[0, '#1a2026'], [.18, '#262a2d'], [1, '#515352']]);
        drawPlots(c);
        JUNCTIONS.forEach(function (J) { drawCrossGround(J, tar, pave); });

        // Behind the road: trees, poles and buildings, furthest first
        var back = [], i, d, z;
        function behind(dz, fn) { back.push({ d: dz, fn: fn }); }
        [{ step: 21, x: 13, spread: 8, base: 8, grow: 7, k: 1 }, { step: 34, x: 27, spread: 14, base: 10, grow: 7, k: .72 }].forEach(function (row, ri) {
            var n = Math.floor(c / row.step);
            for (var t = n + 15; t >= n; t--) {
                [-1, 1].forEach(function (side) {
                    var key = t * 3 + side * 7 + ri * 97, dz = t * row.step + seeded(key) * row.step * .6 - c, zz = dz + c;
                    if (dz < 2.5 || zz > U1 - 6) { return; }
                    if (zz > U0 && seeded(key * 9) < (zz - U0) / (U1 - U0)) { return; }
                    var a = fade(dz, 420);
                    if (a <= 0) { return; }
                    behind(dz, function () {
                        drawTree(side, side * (row.x + seeded(key * 2) * row.spread), dz, row.base + seeded(key * 3) * row.grow, Math.min(1, a * 1.8) * row.k, Math.floor(seeded(key * 5) * 4) % 4);
                    });
                });
            }
        });
        BLOCKS.forEach(function (b) { if (b.z2 - c > 1.8 && b.z1 - c < (MOVING ? RANGE * .72 : RANGE)) { behind(b.z1 - c, function () { drawBlock(b); }); } });
        JUNCTIONS.forEach(function (J) {
            var dz = J.z + CW + 1.2 - c;
            if (dz < 4 || dz > RANGE) { return; }
            [-1, 1].forEach(function (side) { [16, 46, 76, 106].forEach(function (off) { behind(dz, function () { crossLamp(side * (URB + off), dz); }); }); });
        });
        drawPoleLine(c);
        back.sort(function (a, b) { return b.d - a.d; });
        back.forEach(function (it) { it.fn(); });
        // Grass along the verge of the highway
        var tuft = Math.floor(c / 5.5);
        for (var j = tuft + 28; j >= tuft; j--) {
            [-1, 1].forEach(function (side) {
                var key = j * 11 + side * 3, dz = j * 5.5 + seeded(key) * 3.5 - c;
                if (dz < 1.4 || dz + c > K0 - 8) { return; }
                var a = fade(dz, 170);
                if (a <= 0) { return; }
                var x = side * (7.5 + seeded(key * 2) * 4.2), p = px(x, 0, dz), w = (1.5 + seeded(key * 3) * 2) * p[2], h = w * .3;
                if (p[0] + w < 0 || p[0] - w > W) { return; }
                ctx.globalAlpha = Math.min(1, a * 1.7);
                ctx.drawImage(TUFT, p[0] - w / 2, p[1] - h, w, h);
            });
        }
        ctx.globalAlpha = 1;

        drawPavement(c, tar);
        drawFootpaths(c, tar, pave);
        drawMarkings(c);
        drawLightPools(c);
        drawCatsEyes(c);
        drawBarriers(c);
        drawGuardRails(c);

        // Everything standing beside or over the road, furthest first
        var items = [];
        function add(dz, fn) { if (dz > 1.2 && dz < 470) { items.push({ d: dz, fn: fn }); } }
        var n20 = Math.floor(c / 20);
        for (i = n20 + 16; i >= n20; i--) {
            z = i * 20 + 10;
            if (z > K0 - 8) { continue; }
            (function (dz, clearOfStone) { add(dz, function () { if (clearOfStone) { delineator(-5.25, dz, -1); } delineator(5.25, dz, 1); }); })(z - c, Math.abs(z - BOARDS[0].z) > 12);
        }
        LAMPS.forEach(function (L) {
            var dz = L.z - c;
            if (dz > 1.2 && dz < 470) { add(dz, function () { streetLight(-1, dz, L); streetLight(1, dz, L); }); }
        });
        var n100 = Math.floor(c / 100);
        for (i = n100 + 2; i >= n100; i--) {
            z = i === 0 ? BOARDS[0].z - 2.5 : i * 100 + 6;
            if (z > K0 - 14) { continue; }
            (function (k, dz) { add(dz, function () { kmStone(dz, (k / 10).toFixed(1)); }); })(i, z - c);
        }
        ROADSIGNS.forEach(function (S) {
            var dz = S.z - c;
            if (dz < 1.6 || dz > 240) { return; }
            add(dz, function () {
                if (S.type === 'speed') { speedSign(S.z, dz, S.text); } else if (S.type === 'city') { citySign(S.z, dz); } else { warnSign(S.z, dz, S.type); }
            });
        });
        BOARDS.forEach(function (b, n) {
            var dz = b.z - c, seen = revealed(n, c);
            if (!b.el || options.still || dz < 1.7 || dz > 300 || seen <= .01) { return; }
            add(dz, function () { gantry(dz, CLEARANCE + b.boardH + .4, CLEARANCE, CLEARANCE + b.boardH, Math.min(1, (dz - 1.7) / 3) * Math.min(1, (300 - dz) / 110) * seen); });
        });
        // City trees in guards on the footpath, and people walking
        var nt = Math.floor((c - U1) / 30);
        for (i = Math.max(0, nt) + 11; i >= Math.max(0, nt); i--) {
            z = U1 + i * 30 + 15;
            if (inJunction(z, CW + RAD + 3) || Math.abs(z - BUS - 4) < 9) { continue; }
            (function (zz, ii) {
                var dz = zz - c;
                if (dz < 2.2) { return; }
                [-1, 1].forEach(function (side) {
                    add(dz, function () {
                        var a = Math.min(1, fade(dz, 360) * 1.8), x = side * (URB + 2.15), key = ii * 5 + side;
                        drawTree(side, x, dz, 6.6 + seeded(key) * 2.6, a, Math.floor(seeded(key * 3) * 4) % 4);
                        var p = px(x, .16, dz), r = .55 * p[2];
                        ctx.globalAlpha = a; ctx.strokeStyle = '#59626a'; ctx.lineWidth = Math.max(.8, .07 * p[2]);
                        ctx.beginPath(); ctx.ellipse(p[0], p[1], r, r * .24, 0, 0, 6.3); ctx.stroke();
                        ctx.globalAlpha = 1;
                    });
                });
            })(z, i);
        }
        var np = Math.floor(c / 13);
        for (i = np + 14; i >= np; i--) {
            z = i * 13 + 4;
            if (z < K0 + 30 || inJunction(z, CW + RAD + 2) || seeded(i * 3) < .48) { continue; }
            (function (zz, ii) {
                var side = seeded(ii * 7) > .5 ? 1 : -1, x = side * (URB + 1.05 + seeded(ii * 9) * .9), dz = zz - c, w = seeded(ii * 11) > .4;
                add(dz, function () { person(x, .16, dz, ii % 6, w, seeded(ii * 13) > .5); });
            })(z, i);
        }
        add(BUS - c, function () {
            drawBusStop(BUS - c);
            person(-(URB + 1.5), .16, BUS + 2 - c, 1, false, false);
            person(-(URB + 1.7), .16, BUS + 3 - c, 4, false, true);
        });
        if (options.closure) {
            add(CLOSURE - c, function () { drawClosure(CLOSURE - c); });
        }
        JUNCTIONS.forEach(function (J, ji) {
            var dj = J.z - c;
            if (dj > 320 || dj < -CW - 12) { return; }
            add(dj, function () { drawSignals(J); });
            add(dj - 1, function () { drawCrossTraffic(J); });
            // Bollards protect each corner of the footpath
            [-1, 1].forEach(function (side) {
                [-1, 1].forEach(function (end) {
                    var cx = side * (URB + RAD), cz = end < 0 ? J.z - CW - RAD : J.z + CW + RAD;
                    [.12, .32, .5, .68, .88].forEach(function (t) {
                        var ang = t * Math.PI / 2, x = cx - side * (RAD - .4) * Math.cos(ang), zb = cz - end * (RAD - .4) * Math.sin(ang);
                        add(zb - c, function () { bollard(x, zb - c); });
                    });
                });
            });
            // People wait at the corners, and cross when our signal is red
            var waiters = [[-(URB + 1.3), J.z - CW - 2.4, 0], [-(URB + 2), J.z - CW - 3, 3], [URB + 1.4, J.z + CW + 2.1, 2], [URB + 2.1, J.z + CW + 2.7, 5], [-(URB + 1.6), J.z + CW + 2.4, 4]];
            waiters.forEach(function (w) { add(w[1] - c, function () { person(w[0], .16, w[1] - c, w[2] + ji, false, w[0] > 0); }); });
            var walk = Math.min(1, Math.max(0, (c - (J.hold - 40)) / 40)), gone = Math.max(0, c - J.hold) * 2.6;
            var crossZ = J.z - CW - 3.4;
            if (crossZ - c > 2) {
                var w1 = -9 + 11 * walk + gone, w2 = 8 - 11 * walk - gone;
                if (Math.abs(w1) < URB + 1) { add(crossZ - c, function () { person(w1, 0, crossZ - c, 3 + ji, true, false); }); }
                if (Math.abs(w2) < URB + 1) { add(crossZ + .7 - c, function () { person(w2, 0, crossZ + .7 - c, 1 + ji, true, true); }); }
            }
        });
        items.sort(function (a, b) { return b.d - a.d; });
        items.forEach(function (it) { it.fn(); });

        // Low mist on the horizon
        var mist = ctx.createLinearGradient(0, HY - H * .05, 0, HY + H * .05);
        mist.addColorStop(0, 'rgba(160,172,190,0)'); mist.addColorStop(.5, 'rgba(160,172,190,.09)'); mist.addColorStop(1, 'rgba(160,172,190,0)');
        ctx.fillStyle = mist; ctx.fillRect(0, HY - H * .05, W, H * .1);
    }
    // One board at a time: the next board stays hidden until the visitor has driven on from the one before it
    function revealed(i, c) {
        if (i === 0) { return 1; }
        var stop = BOARDS[i - 1].z - BOARDS[i - 1].rest;
        return smooth(stop + .4, stop + 9, c);
    }
    function placeBoards(c) {
        BOARDS.forEach(function (b, i) {
            if (!b.el) { return; }
            var d = b.z - c, el = b.el, seen = revealed(i, c);
            if (d < 2.6 || d > 280 || seen <= .01) {
                if (el.style.visibility !== 'hidden') { el.style.visibility = 'hidden'; }
                return;
            }
            var tl = px(-BOARD_W / 2, CLEARANCE + b.boardH, d), br = px(BOARD_W / 2, CLEARANCE, d);
            var k = (br[0] - tl[0]) / b.domW, near = Math.min(1, (d - 2.6) / 7), o = near * near * (3 - 2 * near) * Math.min(1, (280 - d) / 120) * seen;
            el.style.visibility = 'visible';
            el.style.opacity = o.toFixed(3);
            var active = o >= .6 && k >= .4;
            el.style.pointerEvents = active ? 'auto' : 'none';
            if (el.inert === active) { el.inert = !active; }
            el.style.zIndex = String(1000 - Math.round(d));
            el.style.transform = 'translate(' + tl[0].toFixed(2) + 'px,' + tl[1].toFixed(2) + 'px) scale(' + k.toFixed(4) + ')';
        });
    }

    function lowerQuality() {
        if (QUALITY <= .6) { return false; }
        QUALITY = Math.max(.6, QUALITY - .2);
        applyResolution();
        return true;
    }
    function setMotion(moving) {
        MOVING = moving;
        MOTION = moving ? .72 : 1;
        applyResolution();
    }

    return {
        boards: BOARDS,
        layout: layout,
        draw: draw,
        placeBoards: placeBoards,
        makeFacades: makeFacades,
        lowerQuality: lowerQuality,
        setMotion: setMotion,
        stopOf: function (i) { return BOARDS[i].z - BOARDS[i].rest; }
    };
};
