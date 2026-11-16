<?php
$activePage = 'about';
$pageTitle = 'About TRC | TEP Research & Consultancy Cell | SVNIT Surat';
$pageDesc = 'Learn about TRC — SVNIT Surat\'s Transportation Engineering & Planning Research & Consultancy Cell. Discover our vision, mission, capabilities, and IRC-compliant research methodology.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">About TRC</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; About TRC</p>
    </div>
  </div>

  <!-- Intro & Key Numbers -->
  <section class="section">
    <div class="wrap">
      <div class="about-strip" data-reveal="fade-in-up">
        <div class="about-image-wrap">
          <img src="images/team/shriniwas-arkatkar.jpg" alt="TRC Laboratory &amp; Field Studies" class="about-img" onerror="this.src='assets/img/logo-mark.svg';this.style.padding='3rem';this.style.background='var(--concrete)'">
          <span class="about-caption">Civil Engineering Dept &bull; SVNIT Surat</span>
        </div>
        <div class="about-text">
          <p class="about-heading-label">Who We Are</p>
          <h2 class="about-heading">An Independent Research &amp; Consultancy Unit in Transportation Engineering</h2>
          <p class="lead-text">TRC (Transportation Engineering &amp; Planning Cell) is a specialized research and consultancy division within the Department of Civil Engineering at Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat.</p>
          <p>Established to bridge academic research and real-world civil engineering infrastructure, TRC provides independent evaluations, safety audits, and intelligent transport planning to municipal corporations, state highway development corporations, and national infrastructure agencies.</p>
          <div style="display:flex;gap:2.5rem;margin-top:2rem;flex-wrap:wrap;">
            <div>
              <span id="count-projects" class="stat-number" style="color:var(--green);font-size:2.4rem;font-weight:800;line-height:1;">40+</span>
              <span style="color:var(--muted);font-size:0.9rem;font-weight:600;">Projects Delivered</span>
            </div>
            <div>
              <span id="count-pubs" class="stat-number" style="color:var(--green);font-size:2.4rem;font-weight:800;line-height:1;">120+</span>
              <span style="color:var(--muted);font-size:0.9rem;font-weight:600;">Research Papers</span>
            </div>
            <div>
              <span id="count-professors" class="stat-number" style="color:var(--green);font-size:2.4rem;font-weight:800;line-height:1;">5+</span>
              <span style="color:var(--muted);font-size:0.9rem;font-weight:600;">Senior Faculty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Vision & Mission Panels -->
  <section class="section vm-section section-concrete">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">Our Philosophy</span>
        <h2>Vision &amp; Mission</h2>
        <div class="section-accent-line"></div>
      </div>
      <div class="vm-panels">
        <div class="vm-card" data-vm="vision">
          <div class="vm-card-overlay vm-overlay-blue"></div>
          <div class="vm-card-content">
            <div class="vm-card-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </div>
            <h3 class="vm-card-title">Our Vision</h3>
            <p class="vm-card-body">To emerge as India's leading academic centre of excellence in transportation engineering and road safety, empowering public authorities with unbiased, data-driven engineering insights for safe, resilient and sustainable transport corridors.</p>
          </div>
        </div>
        <div class="vm-card" data-vm="mission">
          <div class="vm-card-overlay vm-overlay-green"></div>
          <div class="vm-card-content">
            <div class="vm-card-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
            </div>
            <h3 class="vm-card-title">Our Mission</h3>
            <p class="vm-card-body">To conduct rigorous field audits, high-impact research, and advanced computer modeling that eliminate hazardous road blackspots, modernize traffic flow management, and guide national roadway policy standards.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Detailed Capabilities List -->
  <section class="section" id="capabilities">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">Core Specializations</span>
        <h2>Our Capabilities &amp; Engineering Scope</h2>
        <div class="section-accent-line"></div>
        <p class="section-subtext">Click on any capability to view detailed methodology, expected outputs, and consultation options.</p>
      </div>
      <div id="capability-list" class="capability-list">
        <!-- Rendered dynamically by main.js pages.about() -->
      </div>
    </div>
  </section>

  <!-- Accreditation & Standards Recognition -->
  <section class="section section-concrete">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">Accreditations &amp; Standards</span>
        <h2>Engineered to National Standards</h2>
        <div class="section-accent-line"></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:2rem;margin-top:2.5rem;">
        <div style="background:var(--green);color:white;border-radius:18px;padding:2.5rem;box-shadow:var(--shadow-md);">
          <div style="color:var(--yellow);margin-bottom:1rem;">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
          </div>
          <h3 style="color:white;font-size:1.35rem;font-weight:800;margin-bottom:0.75rem;">IRC Accreditations &amp; Codes</h3>
          <p style="color:rgba(255,255,255,0.88);font-size:0.95rem;line-height:1.65;">Our Road Safety Audits and Highway capacity studies strictly adhere to IRC:SP:88 (Road Safety Audit Manual), IRC:106, and relevant IRC special publications, ensuring statutory compliance for government submissions.</p>
        </div>
        <div style="background:var(--yellow);color:var(--asphalt);border-radius:18px;padding:2.5rem;box-shadow:var(--shadow-md);">
          <div style="color:var(--asphalt);margin-bottom:1rem;">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </div>
          <h3 style="color:var(--asphalt);font-size:1.35rem;font-weight:800;margin-bottom:0.75rem;">MoRTH &amp; Institute Standing</h3>
          <p style="color:rgba(42,47,51,0.85);font-size:0.95rem;line-height:1.65;">As part of SVNIT, an Institute of National Importance under the Ministry of Education, TRC is empowered to issue vetted engineering opinions and DPR third-party validation reports accepted by MoRTH and NHAI.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Band -->
  <section class="cta-band">
    <div class="wrap">
      <div class="cta-band-inner" data-reveal="fade-in-up">
        <div class="cta-band-text">
          <h2 class="cta-band-title">Consult with TRC Faculty on Your Upcoming Project</h2>
          <p class="cta-band-desc">Discuss terms of reference, project scope, or request an initial assessment for roadway and traffic planning.</p>
        </div>
        <div class="cta-band-actions">
          <a href="contact.php" class="btn btn-yellow btn-lg">Contact TRC Cell &rarr;</a>
        </div>
      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
