<?php
$activePage = 'about';
$pageTitle = 'About TRC | TEP Research & Consultancy Cell | SVNIT Surat';
$pageDesc = 'Learn about TRC — SVNIT Surat\'s Transportation Engineering & Planning Research & Consultancy Cell. Discover our vision, mission, capabilities, and IRC-compliant accreditations.';
require_once 'includes/site-data.php';
$certificates = getTRCCertificates();

$aboutCaps = [
    [
        'id' => 'safety',
        'icon' => 'health_and_safety',
        'title' => 'Safety First',
        'desc' => 'Unwavering commitment to workplace safety, vulnerable road-user protection, and IRC:SP:88 regulatory compliance on every corridor and site, every day.',
        'bg' => 'images/SAFETY FIRST.jpg',
        'alt' => 'Safety engineers conducting site audit review',
    ],
    [
        'id' => 'quality',
        'icon' => 'verified',
        'title' => 'Quality Execution',
        'desc' => 'Rigorous empirical field verification, material traceability, calibrated traffic instrumentation, and independent peer-reviewed audits at every milestone.',
        'bg' => 'images/QUALITY EXECUTION.jpg',
        'alt' => 'Organized civil engineering corridor and site infrastructure',
    ],
    [
        'id' => 'delivery',
        'icon' => 'fact_check',
        'title' => 'Reliable Delivery',
        'desc' => 'Integrated survey scheduling, rapid data-to-insight modeling, and transparent milestone reporting ensure statutory approvals and DPR deliveries stay on time.',
        'bg' => 'images/RELIABLE DELIVERY.jpg',
        'alt' => 'Reliable project delivery and engineering coordination',
    ],
    [
        'id' => 'partnerships',
        'icon' => 'handshake',
        'title' => 'Long-Term Partnerships',
        'desc' => 'Dedicated full-lifecycle advisory, capacity-building workshops, and multi-phase technical collaboration with national highways and urban infrastructure bodies.',
        'bg' => 'images/LONG-TERM PARTNERSHIPS.jpg',
        'alt' => 'Collaborative engineering stakeholders partnership',
    ],
];

include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-about-stitch-page">
  <div class="trc-shell trc-about-stitch-stack">

    <!-- ======================================================= -->
    <!-- 1. BENTO HERO MOSAIC (3-COLUMN PHOTO + METRIC STACK)    -->
    <!-- ======================================================= -->
    <section aria-label="TEP Overview Mosaic" class="trc-ab-bento-card">
      <div class="trc-ab-bento-grid">

        <!-- Left Photo Card: SVNIT Building -->
        <div class="trc-ab-bento-photo">
          <img src="images/SVNIT Building.jpg" alt="Civil Engineering Department Block, SVNIT Surat" loading="eager" />
          <div class="trc-ab-bento-scrim" aria-hidden="true"></div>
          <div class="trc-ab-bento-photo-inner">
            <span class="trc-ab-tag-white">
              <span class="trc-ed-hero-dot" aria-hidden="true"></span>
              <span>SVNIT &bull; SURAT</span>
            </span>
            <div class="trc-ab-bento-photo-copy">
              <p class="trc-ab-bento-photo-title">Civil Engineering &amp; Research Block</p>
              <p class="trc-ab-bento-photo-sub">Institute of National Importance &bull; Ministry of Education</p>
            </div>
          </div>
        </div>

        <!-- Center Stacked Metric Cards -->
        <div class="trc-ab-metric-stack">
          <!-- Top Vibrant Emerald Card -->
          <div class="trc-ab-metric-emerald">
            <p>
              IRC-compliant safety audits and independent DPR validation trusted by state &amp; national highway agencies.
            </p>
            <div class="trc-ab-metric-row">
              <span class="trc-ab-metric-big">98%</span>
              <span class="trc-ab-metric-cap">IRC &amp; MoRTH Compliance</span>
            </div>
          </div>

          <!-- Bottom Dark Emerald Card -->
          <div class="trc-ab-metric-dark">
            <div class="trc-ab-metric-dark-top">
              <span class="trc-ab-verified-icon">
                <span class="material-symbols-outlined" aria-hidden="true">verified</span>
              </span>
              <span class="trc-ab-est-tag">Established Cell</span>
            </div>
            <div>
              <div class="trc-ab-metric-mid">18+</div>
              <p>
                Years of transportation engineering research, field surveys, and laboratory material diagnostics.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Photo Card: Traffic Field & Lab -->
        <div class="trc-ab-bento-photo">
          <img src="images/Traffic Engineering.jpg" alt="Transportation engineering field traffic survey and corridor monitoring" loading="eager" />
          <div class="trc-ab-bento-scrim" aria-hidden="true"></div>
          <div class="trc-ab-bento-photo-inner trc-ab-bento-photo-inner--bottom">
            <span class="trc-ab-tag-emerald">Field &amp; Lab Cell</span>
            <p class="trc-ab-bento-photo-title">Traffic Simulation &amp; Road Safety</p>
            <p class="trc-ab-bento-photo-sub">Evidence-based mobility engineering for Gujarat &amp; India</p>
          </div>
        </div>

      </div>
    </section>

    <!-- ======================================================= -->
    <!-- 2. CENTERED EXPERTISE STATEMENT + 4-COLUMN METRIC STRIP -->
    <!-- ======================================================= -->
    <section class="trc-ab-mandate">
      <div class="trc-ab-mandate-head">
        <span class="trc-ed-hero-pill">
          <span class="trc-ed-hero-dot" aria-hidden="true"></span>
          <span>Expertise &amp; Mandate</span>
        </span>
        <h1>
          Discover our commitment to safer <span class="trc-ed-serif">corridors.</span>
          <span class="trc-ab-mandate-muted">
            With over 18 years of academic and field experience at SVNIT Surat, we deliver IRC-compliant traffic studies, road safety audits, and independent DPR validation to help agencies build resilient mobility networks.
          </span>
        </h1>
      </div>

      <!-- 4-Column Metric Strip -->
      <div class="trc-ab-stats-row">
        <div class="trc-ab-stat-cell">
          <strong>98%</strong>
          <span>IRC &amp; MoRTH compliance across audited corridors</span>
        </div>
        <div class="trc-ab-stat-cell">
          <strong>18+</strong>
          <span>Years of research &amp; field consultancy</span>
        </div>
        <div class="trc-ab-stat-cell">
          <strong>1,200 km</strong>
          <span>Highways &amp; expressways audited under IRC:SP:88</span>
        </div>
        <div class="trc-ab-stat-cell">
          <strong>45+</strong>
          <span>Public agencies, NHAI &amp; municipal partners</span>
        </div>
      </div>
    </section>

    <!-- ======================================================= -->
    <!-- 3. PRINCIPLES SPLIT + 2x2 BG-IMAGE INTERACTIVE GRID     -->
    <!-- ======================================================= -->
    <section class="trc-ab-cap-panel" id="capabilities">
      <div class="trc-ab-cap-split">

        <!-- Left Intro Column -->
        <div class="trc-ab-cap-intro">
          <span class="trc-ed-hero-pill">
            <span class="trc-ed-hero-dot" aria-hidden="true"></span>
            <span>Core Methodology</span>
          </span>
          <h2>Guided by Engineering Principles</h2>
          <p>
            Every consultancy audit, traffic simulation, and highway safety intervention rests on empirical field data, unbiased academic scrutiny, and timely institutional delivery.
          </p>
          <a href="contact.php" class="trc-ab-cta-pill">
            <span>Book Consultation</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </a>
        </div>

        <!-- Right 2x2 Interactive Square Background-Photo Cards -->
        <div id="capability-grid" class="trc-ab-cap-grid">
          <?php foreach ($aboutCaps as $idx => $cap): ?>
          <button
            type="button"
            data-cap-card
            aria-pressed="<?php echo $idx === 0 ? 'true' : 'false'; ?>"
            class="trc-ab-cap-card<?php echo $idx === 0 ? ' is-active' : ''; ?>"
          >
            <img
              src="<?php echo htmlspecialchars($cap['bg']); ?>"
              alt="<?php echo htmlspecialchars($cap['alt']); ?>"
              class="trc-ab-cap-bg"
              loading="lazy"
            />
            <div class="trc-ab-cap-scrim" aria-hidden="true"></div>
            <div class="trc-ab-cap-inner">
              <span class="trc-ab-cap-icon">
                <span class="material-symbols-outlined" aria-hidden="true"><?php echo htmlspecialchars($cap['icon']); ?></span>
              </span>
              <div class="trc-ab-cap-copy">
                <h3><?php echo htmlspecialchars($cap['title']); ?></h3>
                <p><?php echo htmlspecialchars($cap['desc']); ?></p>
              </div>
            </div>
          </button>
          <?php endforeach; ?>
        </div>

      </div>
    </section>

    <!-- ======================================================= -->
    <!-- 4. OFFICIAL EMPANELMENT & CERTIFICATES LIGHTBOX         -->
    <!-- ======================================================= -->
    <section class="trc-ab-certs" id="certificates">
      <div class="trc-ab-stories-head">
        <div class="trc-ab-stories-title-wrap">
          <span class="trc-ed-hero-pill">
            <span class="trc-ed-hero-dot" aria-hidden="true"></span>
            <span>Verified Credentials</span>
          </span>
          <h2>Official Empanelment &amp; Certificates</h2>
        </div>
        <p class="trc-ab-certs-note">Click any plate to inspect the institutional empanelment certificate.</p>
      </div>

      <div class="trc-certs-grid" id="trcCertsGrid">
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
    </section>

  </div>

  <!-- Certificate Lightbox Dialog -->
  <dialog id="trcCertLightbox" class="trc-lightbox-dialog" data-lenis-prevent aria-label="Certificate document viewer">
    <div class="trc-lightbox-box">
      <div class="trc-lightbox-bar">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span class="trc-news-card-pill trc-news-card-pill--inline" id="trcCertIssuer">ISSUER</span>
          <span class="trc-lb-counter" id="trcCertCount">1 / 3</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="trc-lb-btn" id="trcCertPrev">
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_back</span>
            <span>Prev</span>
          </button>
          <button type="button" class="trc-lb-btn" id="trcCertNext">
            <span>Next</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </button>
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