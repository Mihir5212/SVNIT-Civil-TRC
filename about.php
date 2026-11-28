<?php
$activePage = 'about';
$pageTitle = 'About TRC | TEP Research & Consultancy Cell | SVNIT Surat';
$pageDesc = 'Learn about TRC — SVNIT Surat\'s Transportation Engineering & Planning Research & Consultancy Cell. Discover our vision, mission, capabilities, and IRC-compliant accreditations.';
require_once 'includes/site-data.php';
$capabilities = getTRCCapabilities();
$certificates = getTRCCertificates();
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-rx-subpage">

  <!-- Centered Editorial Hero (Matching News & Updates Theme) -->
  <section class="trc-ed-hero trc-ed-hero--band">
    <div class="trc-shell trc-ed-hero-wrap">
      <span class="trc-ed-hero-pill">
        <span class="trc-ed-hero-dot" aria-hidden="true"></span>
        <span>About TRC SVNIT</span>
      </span>

      <h1 class="trc-ed-hero-h1">
        Transportation research &amp; road <span class="trc-ed-serif">safety.</span>
      </h1>

      <p class="trc-ed-hero-sub">
        Independent road safety audits, traffic engineering evaluations, and empirical highway research within the Department of Civil Engineering at SVNIT Surat.
      </p>
    </div>
  </section>

  <!-- Intro & Key Numbers -->
  <section class="section">
    <div class="wrap">
      <div class="about-strip" data-reveal="fade-in-up">
        <div class="about-image-wrap">
          <img src="images/SVNIT%20Building.jpg" alt="Civil Engineering Department, SVNIT Surat" class="about-img" onerror="this.src='images/Hero_1.jpg'" loading="lazy">
          <span class="about-caption">Civil Engineering Dept &bull; SVNIT Surat</span>
        </div>
        <div class="about-text">
          <p class="about-heading-label">WHO WE ARE</p>
          <h2 class="about-heading">An Independent Research &amp; Consultancy Unit in Transportation Engineering</h2>
          <p class="lead-text">TRC (Transportation Engineering &amp; Planning Cell) is a specialized research and consultancy division within the Department of Civil Engineering at Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat.</p>
          <p>Established to bridge academic research and real-world civil engineering infrastructure, TRC provides independent evaluations, safety audits, and intelligent transport planning to municipal corporations, state highway development corporations, and national infrastructure agencies.</p>
          <div style="display:flex;gap:2.25rem;margin-top:2rem;flex-wrap:wrap;">
            <div>
              <span id="count-projects" class="stat-number" style="color:var(--green);font-size:2.3rem;font-weight:800;line-height:1;">40+</span>
              <span style="display:block;color:var(--muted);font-size:0.9rem;font-weight:600;">Projects Delivered</span>
            </div>
            <div>
              <span id="count-pubs" class="stat-number" style="color:var(--green);font-size:2.3rem;font-weight:800;line-height:1;">120+</span>
              <span style="display:block;color:var(--muted);font-size:0.9rem;font-weight:600;">Research Papers</span>
            </div>
            <div>
              <span id="count-professors" class="stat-number" style="color:var(--green);font-size:2.3rem;font-weight:800;line-height:1;">100+</span>
              <span style="display:block;color:var(--muted);font-size:0.9rem;font-weight:600;">Road Safety Audits</span>
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

  <!-- Interactive 8-Capability Engineering Scope Selector -->
  <section class="section trc-capabilities-section" id="capabilities">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">CORE SPECIALIZATIONS</span>
          <h2 class="trc-h2">Our Capabilities &amp; Engineering Scope</h2>
        </div>
        <p class="trc-head-sub">Select any engineering capability below to inspect field methodology, key deliverables, and consultation pathways.</p>
      </div>

      <!-- Active Capability Showcase Card -->
      <div class="trc-cap-stage" id="trcCapStage" data-reveal="fade-in-up">
        <div class="trc-cap-media">
          <img id="trcCapImg" src="<?php echo htmlspecialchars($capabilities[0]['image']); ?>" alt="<?php echo htmlspecialchars($capabilities[0]['title']); ?>" />
          <span class="trc-num-pill trc-num-pill--green" id="trcCapIndex"><?php echo htmlspecialchars($capabilities[0]['num']); ?> / 08</span>
        </div>
        <div class="trc-cap-details">
          <h3 id="trcCapTitle"><?php echo htmlspecialchars($capabilities[0]['title']); ?></h3>
          <p id="trcCapDesc"><?php echo htmlspecialchars($capabilities[0]['summary']); ?></p>
          <div class="trc-cap-outputs-wrap">
            <span class="trc-cap-outputs-label">KEY DELIVERABLES &amp; OUTPUTS</span>
            <ul class="trc-check-list" id="trcCapOutputs">
              <?php foreach ($capabilities[0]['outputs'] as $out): ?>
              <li><?php echo htmlspecialchars($out); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;">
            <a id="trcCapContactLink" href="contact.php?work=<?php echo urlencode($capabilities[0]['id']); ?>#enquiry-form" class="trc-pill-green-btn">
              <span>DISCUSS THIS CAPABILITY</span>
              <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
            </a>
            <a id="trcCapServiceLink" href="<?php echo htmlspecialchars($capabilities[0]['service_url']); ?>" class="trc-pill-outline-btn">
              <span>SERVICE OVERVIEW</span>
            </a>
          </div>
        </div>
      </div>

      <!-- 4x2 Capability Selector Grid -->
      <div class="trc-cap-grid" id="trcCapSelectorGrid" data-reveal="fade-in-up">
        <?php foreach ($capabilities as $idx => $cap): ?>
        <button type="button"
                id="<?php echo htmlspecialchars($cap['id']); ?>"
                class="trc-cap-tile<?php echo $idx === 0 ? ' is-active' : ''; ?>"
                data-cap-idx="<?php echo $idx; ?>"
                data-cap-id="<?php echo htmlspecialchars($cap['id']); ?>"
                data-cap-num="<?php echo htmlspecialchars($cap['num']); ?> / 08"
                data-cap-title="<?php echo htmlspecialchars($cap['title']); ?>"
                data-cap-summary="<?php echo htmlspecialchars($cap['summary']); ?>"
                data-cap-image="<?php echo htmlspecialchars($cap['image']); ?>"
                data-cap-service="<?php echo htmlspecialchars($cap['service_url']); ?>"
                data-cap-outputs="<?php echo htmlspecialchars(json_encode($cap['outputs'])); ?>"
                aria-pressed="<?php echo $idx === 0 ? 'true' : 'false'; ?>">
          <span class="trc-cap-tile-num"><?php echo htmlspecialchars($cap['num']); ?></span>
          <strong><?php echo htmlspecialchars($cap['title']); ?></strong>
          <span class="material-symbols-outlined trc-arrow-icon trc-cap-tile-arrow" aria-hidden="true">arrow_forward</span>
        </button>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Accreditations & Standards Recognition -->
  <section class="section section-concrete">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">Accreditations &amp; Standards</span>
        <h2>Engineered to National Standards</h2>
        <div class="section-accent-line"></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:2.5rem;">
        <div style="background:var(--green);color:white;border-radius:18px;padding:2.25rem;box-shadow:var(--shadow-md);">
          <div style="color:var(--yellow);margin-bottom:1rem;">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
          </div>
          <h3 style="color:white;font-size:1.35rem;font-weight:800;margin-bottom:0.75rem;">IRC Accreditations &amp; Codes</h3>
          <p style="color:rgba(255,255,255,0.88);font-size:0.95rem;line-height:1.65;">Our Road Safety Audits and Highway capacity studies strictly adhere to IRC:SP:88 (Road Safety Audit Manual), IRC:106, and relevant IRC special publications, ensuring statutory compliance for government submissions.</p>
        </div>
        <div style="background:var(--yellow);color:var(--asphalt);border-radius:18px;padding:2.25rem;box-shadow:var(--shadow-md);">
          <div style="color:var(--asphalt);margin-bottom:1rem;">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </div>
          <h3 style="color:var(--asphalt);font-size:1.35rem;font-weight:800;margin-bottom:0.75rem;">MoRTH &amp; Institute Standing</h3>
          <p style="color:rgba(42,47,51,0.85);font-size:0.95rem;line-height:1.65;">As part of SVNIT, an Institute of National Importance under the Ministry of Education, TRC is empowered to issue vetted engineering opinions and DPR third-party validation reports accepted by MoRTH and NHAI.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Official Empanelment & Certificates Lightbox Gallery -->
  <section class="section trc-certs-section" id="certificates">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">VERIFIED CREDENTIALS</span>
          <h2 class="trc-h2">Official Empanelment &amp; Certificates</h2>
        </div>
        <p class="trc-head-sub">Click any document plate below to inspect the institutional empanelment certificate.</p>
      </div>

      <div class="trc-certs-grid" id="trcCertsGrid" data-reveal="fade-in-up">
        <?php foreach ($certificates as $idx => $cert): ?>
        <button type="button"
                class="trc-cert-card"
                data-cert-open="<?php echo $idx; ?>"
                data-src="<?php echo htmlspecialchars($cert['image']); ?>"
                data-title="<?php echo htmlspecialchars($cert['title']); ?>"
                data-cat="<?php echo htmlspecialchars($cert['issuer']); ?>"
                data-meta="CERTIFICATE <?php echo htmlspecialchars($cert['id']); ?> / 03"
                data-desc="Issued to Transportation Engineering & Planning (TEP) Research & Consultancy Cell, Department of Civil Engineering, SVNIT Surat."
                aria-label="Preview <?php echo htmlspecialchars($cert['title']); ?>">
          <div class="trc-cert-thumb">
            <img src="<?php echo htmlspecialchars($cert['image']); ?>" alt="<?php echo htmlspecialchars($cert['title']); ?>" loading="lazy" />
            <span class="trc-num-pill trc-num-pill--green"><?php echo htmlspecialchars($cert['id']); ?></span>
          </div>
          <div class="trc-cert-info">
            <h3><?php echo htmlspecialchars($cert['title']); ?></h3>
            <span><?php echo htmlspecialchars($cert['issuer']); ?></span>
          </div>
        </button>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Certificate Lightbox Dialog -->
  <dialog id="trcCertLightbox" class="trc-lightbox-dialog" data-lenis-prevent aria-label="Certificate document viewer">
    <div class="trc-lightbox-box">
      <div class="trc-lightbox-bar">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span class="trc-news-card-pill trc-news-card-pill--inline" id="trcCertIssuer">ISSUER</span>
          <span class="trc-lb-counter" id="trcCertCount">1 / 3</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="trc-lb-btn" id="trcCertPrev"><span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_back</span> Prev</button>
          <button type="button" class="trc-lb-btn" id="trcCertNext">Next <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span></button>
          <button type="button" class="trc-lb-btn trc-lb-btn--close" id="trcCertClose">Close &times;</button>
        </div>
      </div>
      <div class="trc-lightbox-content">
        <div class="trc-lightbox-stage">
          <img id="trcCertImg" src="" alt="" />
        </div>
        <div class="trc-lightbox-info">
          <span class="trc-eyebrow" id="trcCertMeta">CREDENTIAL</span>
          <h3 id="trcCertTitle">Certificate Title</h3>
          <p id="trcCertDesc"></p>
          <div class="trc-lb-foot">DEPARTMENT OF CIVIL ENGINEERING &bull; SVNIT SURAT</div>
        </div>
      </div>
    </div>
  </dialog>

</main>
<?php include 'includes/footer.php'; ?>
