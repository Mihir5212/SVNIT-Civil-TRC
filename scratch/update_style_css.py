# Update assets/css/style.css with new subpage styling
import os

new_css = r'''
/* ==========================================================================
   12. DEDICATED SERVICE SUBPAGES (Inspired by LJA Engineering Layout & SVNIT Theme)
   ========================================================================== */

.service-subpage {
    --p: #084534;
    --p2: #0d5c46;
    --bg: #eaf4f0;
    --ink: #062b20;
    --acc: #0b6b50;
    --w: #ffffff;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: var(--ink);
    background: var(--bg);
    line-height: 1.7;
    font-size: 17px;
    overflow-x: hidden;
}

.service-subpage .c {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
    width: 100%;
    box-sizing: border-box;
}

.service-subpage a {
    color: inherit;
    text-decoration: none;
}

/* --------------------------------------------------------------------------
   Split Arrow Button (.btn, .btn b, .btn s)
   -------------------------------------------------------------------------- */
.service-subpage .btn {
    display: inline-flex;
    align-items: stretch;
    background: var(--p);
    color: #ffffff;
    border-radius: 10px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 0.03em;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    border: 0;
    cursor: pointer;
    font-family: inherit;
    text-decoration: none;
    box-shadow: 0 6px 18px rgba(8, 69, 52, 0.18);
    line-height: 1.2;
}

.service-subpage .btn b {
    padding: 15px 26px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.service-subpage .btn s {
    width: 48px;
    background: var(--p2);
    display: grid;
    place-items: center;
    text-decoration: none;
    font-size: 20px;
    line-height: 1;
    transition: width 0.25s ease, background-color 0.25s ease;
}

.service-subpage .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(8, 69, 52, 0.3);
    color: #ffffff;
}

.service-subpage .btn:hover s {
    width: 62px;
    background: #11755a;
}

/* --------------------------------------------------------------------------
   1. Hero Section (.hero, .bc, .col)
   -------------------------------------------------------------------------- */
.service-subpage .hero {
    padding: 45px 0 85px;
    position: relative;
}

.service-subpage .hero .c {
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 60px;
    align-items: center;
}

.service-subpage .bc {
    font-size: 14px;
    color: var(--p);
    font-weight: 600;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.02em;
}

.service-subpage .bc a {
    color: var(--p);
    opacity: 0.8;
    text-decoration: none;
    transition: opacity 0.2s;
}

.service-subpage .bc a:hover {
    opacity: 1;
    text-decoration: underline;
}

.service-subpage .bc span {
    color: var(--p2);
}

.service-subpage .hero h1 {
    font-size: clamp(38px, 5.2vw, 72px);
    color: var(--p);
    margin-bottom: 24px;
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.025em;
}

.service-subpage .hero p {
    font-size: clamp(18px, 1.35vw, 21px);
    font-weight: 500;
    color: #17382c;
    line-height: 1.6;
    max-width: 620px;
    margin-bottom: 36px;
}

.service-subpage .col {
    position: relative;
    height: 560px;
}

.service-subpage .col div {
    position: absolute;
    border-radius: 18px;
    overflow: hidden;
    display: grid;
    place-items: end start;
    padding: 22px;
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.02em;
    box-shadow: 0 16px 36px rgba(8, 69, 52, 0.22);
    background-size: cover;
    background-position: center;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.service-subpage .col div:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 45px rgba(8, 69, 52, 0.3);
}

.service-subpage .col div::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(8, 69, 52, 0.15) 0%, rgba(5, 45, 34, 0.85) 100%);
    z-index: 1;
    transition: opacity 0.3s;
}

.service-subpage .col div:hover::before {
    background: linear-gradient(180deg, rgba(8, 69, 52, 0.08) 0%, rgba(5, 45, 34, 0.7) 100%);
}

.service-subpage .col div span {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.service-subpage .col .a {
    left: 0;
    top: 0;
    width: 58%;
    height: 50%;
}

.service-subpage .col .b {
    left: 10%;
    bottom: 0;
    width: 50%;
    height: 38%;
}

.service-subpage .col .d {
    right: 0;
    top: 8%;
    width: 46%;
    height: 84%;
}

.service-subpage .col:after {
    content: "";
    position: absolute;
    right: -24px;
    bottom: -20px;
    width: 55%;
    height: 48%;
    background: var(--p2);
    opacity: 0.25;
    border-radius: 18px;
    z-index: -1;
}

/* --------------------------------------------------------------------------
   2. Solving Challenges Section (.sp, .im, .ck)
   -------------------------------------------------------------------------- */
.service-subpage .sp {
    background: #ffffff;
    padding: 100px 0;
}

.service-subpage .sp .c {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    gap: 70px;
    align-items: center;
}

.service-subpage .im {
    height: 500px;
    border-radius: 0 20px 20px 0;
    position: relative;
    background-size: cover;
    background-position: center;
    box-shadow: 0 18px 40px rgba(8, 69, 52, 0.16);
    margin-left: -32px;
}

.service-subpage .im:after {
    content: "";
    position: absolute;
    right: -24px;
    top: 12%;
    width: 24px;
    height: 70%;
    background: var(--p);
    border-radius: 0 14px 14px 0;
}

.service-subpage .sp h2 {
    font-size: clamp(30px, 3.6vw, 48px);
    color: var(--p);
    margin-bottom: 28px;
    line-height: 1.18;
    font-weight: 700;
}

.service-subpage .ck {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 28px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.service-subpage .ck li {
    position: relative;
    padding-left: 42px;
    font-weight: 600;
    color: var(--p);
    font-size: 15.5px;
    line-height: 1.45;
}

.service-subpage .ck li:before {
    content: "✓";
    position: absolute;
    left: 0;
    top: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--p);
    color: #ffffff;
    font-size: 13px;
    display: grid;
    place-items: center;
    font-weight: 700;
    box-shadow: 0 3px 8px rgba(8, 69, 52, 0.25);
}

/* --------------------------------------------------------------------------
   3. Navigating Challenges / We Work Together (.wt, .ghost, corner image)
   -------------------------------------------------------------------------- */
.service-subpage .wt {
    padding: 100px 0 0;
    position: relative;
    background: var(--bg);
    overflow: hidden;
    min-height: 640px;
}

.service-subpage .wt .c {
    position: relative;
    z-index: 5;
    padding-bottom: 90px;
}

.service-subpage .wt-content {
    max-width: 660px;
    position: relative;
    z-index: 5;
}

.service-subpage .wt .pre {
    color: var(--p);
    letter-spacing: 0.28em;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    display: inline-block;
}

.service-subpage .ghost {
    font-size: clamp(60px, 10vw, 150px);
    font-weight: 800;
    line-height: 0.9;
    color: #c7e0d6;
    text-transform: uppercase;
    margin: 16px 0 -8px;
    letter-spacing: -0.04em;
    user-select: none;
    pointer-events: none;
}

.service-subpage .wt h3 {
    font-size: clamp(22px, 2.5vw, 30px);
    color: var(--p);
    max-width: 640px;
    margin: 28px 0 16px;
    font-weight: 600;
    line-height: 1.3;
}

.service-subpage .wt p {
    max-width: 560px;
    margin-bottom: 34px;
    color: #17382c;
    font-size: 17px;
    line-height: 1.7;
}

/* Cutout Corner Image: We Work Together.png */
.service-subpage .wt-corner-wrap {
    position: absolute;
    right: 0;
    bottom: 0;
    width: clamp(380px, 46vw, 760px);
    z-index: 2;
    pointer-events: none;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}

.service-subpage .wt-corner-img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    object-position: bottom right;
    transform: translateY(6px);
    filter: drop-shadow(-8px -6px 24px rgba(8, 69, 52, 0.1));
}

/* Gradient shadow / fog blend on the bottom part */
.service-subpage .wt-bottom-gradient {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 130px;
    background: linear-gradient(to top, var(--bg) 0%, rgba(234, 244, 240, 0.95) 35%, rgba(234, 244, 240, 0.45) 70%, transparent 100%);
    z-index: 3;
    pointer-events: none;
}

/* Ambient ground contact shadow under the engineers */
.service-subpage .wt-ground-shadow {
    position: absolute;
    right: 30px;
    bottom: 0;
    width: 85%;
    height: 40px;
    background: radial-gradient(ellipse at center, rgba(6, 43, 32, 0.45) 0%, rgba(8, 69, 52, 0.2) 48%, transparent 75%);
    filter: blur(14px);
    z-index: 1;
    pointer-events: none;
}

/* --------------------------------------------------------------------------
   4. Specialized Capability Cards (.cards, .card)
   -------------------------------------------------------------------------- */
.service-subpage .cards {
    padding: 40px 0 100px;
}

.service-subpage .cards .c {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
}

.service-subpage .card {
    background: #ffffff;
    border-radius: 18px;
    padding: 48px;
    margin-bottom: 28px;
    box-shadow: 0 10px 30px rgba(8, 69, 52, 0.06);
    border: 1px solid rgba(8, 69, 52, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-subpage .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(8, 69, 52, 0.12);
}

.service-subpage .card h2 {
    font-size: 32px;
    color: var(--p);
    margin-bottom: 18px;
    font-weight: 700;
}

.service-subpage .card h3 {
    font-size: 19px;
    margin-bottom: 18px;
    color: var(--p2);
    font-weight: 600;
    line-height: 1.4;
}

.service-subpage .card p {
    margin-bottom: 18px;
    color: #243e33;
    font-size: 16.5px;
    line-height: 1.7;
}

.service-subpage .card .ck {
    grid-template-columns: 1fr;
    gap: 14px;
}

/* --------------------------------------------------------------------------
   5. Interactive Tabs Section (.tb, .tn, .tp)
   -------------------------------------------------------------------------- */
.service-subpage .tb {
    background: #ffffff;
    padding: 100px 0;
}

.service-subpage .tb h2 {
    text-align: center;
    font-size: clamp(30px, 4vw, 46px);
    color: var(--p);
    margin-bottom: 40px;
    font-weight: 700;
}

.service-subpage .tn {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
}

.service-subpage .tn button {
    font: 600 15px 'Poppins', sans-serif;
    padding: 14px 24px;
    border-radius: 10px;
    border: 2px solid var(--bg);
    background: var(--bg);
    color: var(--p);
    cursor: pointer;
    transition: all 0.25s ease;
}

.service-subpage .tn button.on,
.service-subpage .tn button:hover {
    background: var(--p);
    color: #ffffff;
    border-color: var(--p);
    box-shadow: 0 6px 18px rgba(8, 69, 52, 0.25);
}

.service-subpage .tp {
    display: none;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.service-subpage .tp.on {
    display: grid;
    animation: srvFadeIn 0.5s ease forwards;
}

@keyframes srvFadeIn {
    from {
        opacity: 0;
        transform: translateY(16px);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

.service-subpage .tp h3 {
    font-size: 30px;
    color: var(--p);
    margin-bottom: 24px;
    font-weight: 700;
}

.service-subpage .tp .ph {
    height: 420px;
    border-radius: 18px;
    background-size: cover;
    background-position: center;
    display: grid;
    place-items: end start;
    padding: 24px;
    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 16px 36px rgba(8, 69, 52, 0.18);
}

.service-subpage .tp .ph::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(8, 69, 52, 0.1) 0%, rgba(5, 45, 34, 0.75) 100%);
    z-index: 1;
}

.service-subpage .tp .ph span {
    position: relative;
    z-index: 2;
    background: rgba(8, 69, 52, 0.8);
    backdrop-filter: blur(6px);
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* --------------------------------------------------------------------------
   6. Resources Section (.res)
   -------------------------------------------------------------------------- */
.service-subpage .res {
    background: var(--p);
    color: #ffffff;
    padding: 100px 0;
}

.service-subpage .res .c {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.service-subpage .res small {
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-size: 13.5px;
    opacity: 0.85;
    font-weight: 600;
    color: #8ce3c5;
    display: block;
}

.service-subpage .res h2 {
    font-size: clamp(32px, 3.8vw, 50px);
    margin: 12px 0 18px;
    font-weight: 700;
    line-height: 1.15;
}

.service-subpage .res p {
    margin-bottom: 28px;
    opacity: 0.92;
    font-size: 18px;
    line-height: 1.65;
    color: #d1eae1;
}

.service-subpage .res .btn {
    background: #ffffff;
    color: var(--p);
}

.service-subpage .res .btn s {
    background: var(--bg);
    color: var(--p);
}

.service-subpage .res .btn:hover s {
    background: #d5ede3;
    color: var(--p);
}

.service-subpage .res .ph {
    height: 380px;
    border-radius: 18px;
    background-size: cover;
    background-position: center;
    display: grid;
    place-items: end start;
    padding: 24px;
    font-weight: 600;
    font-size: 18px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.service-subpage .res .ph::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(5, 45, 34, 0.85) 100%);
    z-index: 1;
}

.service-subpage .res .ph span {
    position: relative;
    z-index: 2;
    background: rgba(8, 69, 52, 0.85);
    backdrop-filter: blur(6px);
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 15px;
}

/* --------------------------------------------------------------------------
   7. Work Slider Section (.sl, .trk, .ar)
   -------------------------------------------------------------------------- */
.service-subpage .sl {
    padding: 100px 0;
    overflow: hidden;
    background: var(--bg);
}

.service-subpage .sl h2 {
    text-align: center;
    font-size: clamp(30px, 4vw, 46px);
    color: var(--p);
    margin-bottom: 40px;
    font-weight: 700;
}

.service-subpage .trk {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding: 10px 32px 30px;
}

.service-subpage .trk::-webkit-scrollbar {
    display: none;
}

.service-subpage .trk .s {
    flex: 0 0 calc((100% - 48px) / 3);
    min-width: 290px;
    height: 300px;
    border-radius: 16px;
    scroll-snap-align: start;
    display: grid;
    place-items: end start;
    padding: 24px;
    color: #ffffff;
    font-weight: 600;
    font-size: 19px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 12px 30px rgba(8, 69, 52, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-subpage .trk .s:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(8, 69, 52, 0.25);
}

.service-subpage .trk .s::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(8, 69, 52, 0.15) 0%, rgba(5, 45, 34, 0.85) 100%);
    z-index: 1;
    transition: opacity 0.3s ease;
}

.service-subpage .trk .s:hover::before {
    background: linear-gradient(180deg, rgba(8, 69, 52, 0.05) 0%, rgba(5, 45, 34, 0.7) 100%);
}

.service-subpage .trk .s span {
    position: relative;
    z-index: 2;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.service-subpage .ar {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 30px;
}

.service-subpage .ar button {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 0;
    background: var(--p);
    color: #ffffff;
    font-size: 22px;
    cursor: pointer;
    transition: transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
    display: grid;
    place-items: center;
    box-shadow: 0 6px 18px rgba(8, 69, 52, 0.2);
}

.service-subpage .ar button:hover {
    background: var(--p2);
    transform: scale(1.08);
    box-shadow: 0 10px 24px rgba(8, 69, 52, 0.3);
}

/* --------------------------------------------------------------------------
   8. Featured Projects Section (.pj, .hd, .g2, .pc)
   -------------------------------------------------------------------------- */
.service-subpage .pj {
    padding: 40px 0 100px;
    background: #ffffff;
}

.service-subpage .pj .hd {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;
}

.service-subpage .pj small {
    color: var(--p);
    letter-spacing: 0.28em;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13.5px;
    display: block;
    margin-bottom: 8px;
}

.service-subpage .pj h2 {
    font-size: clamp(36px, 5.5vw, 72px);
    color: #c7e0d6;
    text-transform: uppercase;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
}

.service-subpage .g2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
}

.service-subpage .pc {
    background: #ffffff;
    border-radius: 18px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 10px 30px rgba(8, 69, 52, 0.08);
    border: 1px solid rgba(8, 69, 52, 0.08);
}

.service-subpage .pc:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 45px rgba(8, 69, 52, 0.18);
}

.service-subpage .pc .ph {
    height: 280px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.service-subpage .pc .bd {
    padding: 32px;
}

.service-subpage .pc h3 {
    font-size: 24px;
    color: var(--p);
    font-weight: 700;
    margin-bottom: 8px;
}

.service-subpage .pc em {
    display: inline-block;
    font: 600 12.5px 'Poppins', sans-serif;
    font-style: normal;
    background: var(--bg);
    color: var(--p);
    padding: 5px 14px;
    border-radius: 20px;
    margin: 6px 0 14px;
}

.service-subpage .pc p {
    color: #243e33;
    font-size: 16px;
    line-height: 1.65;
    margin-bottom: 20px;
}

.service-subpage .pc a.l {
    color: var(--p);
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    transition: color 0.2s ease, gap 0.2s ease;
}

.service-subpage .pc a.l:hover {
    color: #128263;
    gap: 10px;
}

/* --------------------------------------------------------------------------
   9. Call-to-Action Banner (.ban)
   -------------------------------------------------------------------------- */
.service-subpage .ban {
    margin: 0 32px 80px;
    border-radius: 24px;
    background: linear-gradient(120deg, rgba(5, 45, 34, 0.96), rgba(13, 92, 70, 0.88)), #052d22;
    color: #ffffff;
    padding: 100px 8%;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(5, 45, 34, 0.28);
}

.service-subpage .ban::before {
    content: "";
    position: absolute;
    right: -80px;
    top: -80px;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(140, 227, 197, 0.15) 0%, transparent 70%);
    pointer-events: none;
}

.service-subpage .ban h2 {
    font-size: clamp(32px, 4.5vw, 56px);
    max-width: 720px;
    margin-bottom: 18px;
    font-weight: 700;
    line-height: 1.15;
}

.service-subpage .ban p {
    margin-bottom: 34px;
    font-size: 20px;
    color: #d1eae1;
    max-width: 600px;
}

.service-subpage .ban .btn {
    background: #ffffff;
    color: var(--p);
}

.service-subpage .ban .btn s {
    background: var(--bg);
    color: var(--p);
}

.service-subpage .ban .btn:hover s {
    background: #d5ede3;
}

/* --------------------------------------------------------------------------
   10. Other Services Navigator (.srv-nav-pills-section)
   -------------------------------------------------------------------------- */
.service-subpage .srv-nav-pills-section {
    padding: 0 0 90px;
}

.service-subpage .srv-nav-pills-bar {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    box-shadow: 0 10px 30px rgba(8, 69, 52, 0.06);
    border: 1px solid rgba(8, 69, 52, 0.08);
}

.service-subpage .srv-nav-pills-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--p);
    letter-spacing: 0.02em;
}

.service-subpage .srv-nav-pills-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    flex: 1;
}

.service-subpage .srv-nav-chip {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 13.5px;
    font-weight: 600;
    background: var(--bg);
    color: var(--p);
    transition: all 0.2s ease;
    text-decoration: none;
    border: 1px solid transparent;
}

.service-subpage .srv-nav-chip:hover,
.service-subpage .srv-nav-chip.is-active {
    background: var(--p);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(8, 69, 52, 0.2);
}

/* --------------------------------------------------------------------------
   11. Reveal on Scroll Animation (.rv)
   -------------------------------------------------------------------------- */
.service-subpage .rv {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-subpage .rv.in {
    opacity: 1;
    transform: none;
}

/* --------------------------------------------------------------------------
   Responsive Media Queries
   -------------------------------------------------------------------------- */
@media (max-width: 1000px) {
    .service-subpage .hero .c,
    .service-subpage .sp .c,
    .service-subpage .cards .c,
    .service-subpage .tp,
    .service-subpage .res .c,
    .service-subpage .g2 {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .service-subpage .col {
        height: 420px;
    }

    .service-subpage .ck {
        grid-template-columns: 1fr;
    }

    .service-subpage .im {
        margin: 0;
        border-radius: 18px;
        height: 360px;
    }

    .service-subpage .im:after {
        display: none;
    }

    .service-subpage .card {
        padding: 32px;
    }

    .service-subpage .trk .s {
        flex-basis: 80%;
    }

    .service-subpage .ban {
        margin: 0 16px 50px;
        padding: 60px 6%;
    }

    .service-subpage .wt {
        padding-bottom: 0;
    }

    .service-subpage .wt-corner-wrap {
        position: relative;
        width: 100%;
        margin-top: 30px;
        justify-content: center;
    }

    .service-subpage .wt-corner-img {
        max-width: 480px;
        margin: 0 auto;
    }
}

@media (max-width: 640px) {
    .service-subpage .c {
        padding: 0 18px;
    }

    .service-subpage .hero {
        padding: 30px 0 50px;
    }

    .service-subpage .col {
        height: 340px;
    }

    .service-subpage .btn {
        width: 100%;
    }

    .service-subpage .btn b {
        flex: 1;
        padding: 14px 18px;
        font-size: 14px;
    }

    .service-subpage .tp .ph {
        height: 260px;
    }

    .service-subpage .res .ph {
        height: 260px;
    }

    .service-subpage .trk .s {
        height: 240px;
        font-size: 17px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .service-subpage *,
    .service-subpage *::before,
    .service-subpage *::after {
        transition: none !important;
        animation: none !important;
    }

    .service-subpage .rv {
        opacity: 1;
        transform: none;
    }
}
'''

with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    original_css = f.read()

# Find where Section 12 starts
marker = '/* ==========================================================================\n   12. DEDICATED SERVICE SUBPAGES'
idx = original_css.find(marker)
if idx == -1:
    # Try alternative marker
    marker = '/* ==========================================================================\r\n   12. DEDICATED SERVICE SUBPAGES'
    idx = original_css.find(marker)

if idx != -1:
    clean_css = original_css[:idx].rstrip() + '\n\n' + new_css.strip() + '\n'
    with open('assets/css/style.css', 'w', encoding='utf-8') as f:
        f.write(clean_css)
    print('Updated assets/css/style.css successfully!')
else:
    print('Could not find Section 12 marker, checking lines...')
