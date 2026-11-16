<?php
$activePage = 'home';
$pageTitle = 'TRC | TEP Research & Consultancy Cell | SVNIT Surat';
$pageDesc = 'TRC is the Transportation Engineering & Planning Research & Consultancy Cell at SVNIT Surat. Providing Road Safety Audits, Traffic Engineering, and Transportation Research since 2010.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- ===== 1. HERO SECTION ===== -->
  <section class="hero" id="hero">
    <div class="hero-tabs-row">
      <button class="hero-tab-btn" data-target="#capabilities-section">Road Safety Audit</button>
      <button class="hero-tab-btn" data-target="#capabilities-section">Traffic Engineering</button>
      <button class="hero-tab-btn" data-target="#capabilities-section">Highway Research</button>
      <button class="hero-tab-btn" data-target="#capabilities-section">Data Analytics &amp; ITS</button>
    </div>
    <div class="hero-content">
      <img class="hero-badge-logo" src="assets/img/logo-mark.svg" alt="TRC Logo" width="170" height="170">
      <p class="hero-welcome">Welcome To</p>
      <h1 class="hero-title">TEP Research &amp; Consultancy Cell</h1>
      <p class="hero-tagline">SVNIT, Surat &bull; Advancing Road Safety &amp; Transport Research Since 2010</p>
      <div class="hero-actions">
        <a class="btn btn-yellow btn-lg" href="contact.php">Discuss a Project &rarr;</a>
        <a class="btn btn-secondary btn-lg" href="projects.php">See Our Research</a>
      </div>
    </div>
  </section>

  <!-- ===== 2. STATS STRIP ===== -->
  <section class="section-stats">
    <div class="wrap">
      <div class="stats-card" data-reveal="scale-in">
        <div class="stat-item">
          <span class="stat-number" data-count-target="40" data-count-suffix="+">40+</span>
          <span class="stat-label">Projects Completed</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-count-target="120" data-count-suffix="+">120+</span>
          <span class="stat-label">Publications</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-count-target="15" data-count-suffix="+">15+</span>
          <span class="stat-label">Years Active</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-count-target="8" data-count-suffix="+">8+</span>
          <span class="stat-label">Govt. Agencies</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== 3. ABOUT STRIP ===== -->
  <section class="section about-strip-section">
    <div class="wrap">
      <div class="about-strip" data-reveal="fade-in-up">
        <div class="about-image-wrap">
          <img src="images/team/shriniwas-arkatkar.jpg" alt="TRC Research Team" class="about-img" onerror="this.src='assets/img/logo-mark.svg';this.style.padding='3rem';this.style.background='var(--concrete)'">
          <span class="about-caption">Independent Civil Engineering Research &bull; SVNIT Surat</span>
        </div>
        <div class="about-text">
          <p class="about-heading-label">TRC &mdash; TEP Research &amp; Consultancy Cell</p>
          <h2 class="about-heading">15+ Years of Excellence in Road Safety &amp; Transportation Research</h2>
          <ul class="about-bullets" id="about-bullets-home">
            <li>Independent, data-driven road safety audits (RSA) across national &amp; state highways</li>
            <li>Comprehensive traffic surveys, capacity analyses, and junction design</li>
            <li>Highway DPR technical reviews and geometric safety evaluations</li>
            <li>AI-based video traffic counting and intelligent transportation systems</li>
            <li>Regular contributions to IRC guidelines and MoRTH recommendations</li>
          </ul>
          <blockquote class="about-quote">&ldquo;At TRC, we blend research rigor with practical engineering to advance safer roads and smarter transport across India.&rdquo;</blockquote>
          <div class="about-actions">
            <a href="about.php" class="btn btn-primary">Know More About Us &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== 4. CAPABILITIES (SERVICES) ===== -->
  <section class="section section-concrete" id="capabilities-section">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">What We Do</span>
        <h2>Our Core Capabilities</h2>
        <div class="section-accent-line"></div>
        <p class="section-subtext">Comprehensive research and consultancy spanning road safety, traffic engineering, and transportation planning.</p>
      </div>
      <ul class="services-grid" id="home-capabilities">
        <!-- Rendered dynamically by main.js pages.home() -->
      </ul>
    </div>
  </section>

  <!-- ===== 5. FEATURED PROJECTS ===== -->
  <section class="section" id="featured-section">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">Our Work</span>
        <h2>Selected Research &amp; Consultancy Projects</h2>
        <div class="section-accent-line"></div>
        <p class="section-subtext">Evidence-based highway and urban transportation studies delivered for government agencies and infrastructure authorities.</p>
      </div>
      <div class="projects-editorial" id="home-featured">
        <!-- Rendered dynamically by main.js pages.home() -->
      </div>
      <div class="section-cta-row">
        <a href="projects.php" class="btn btn-primary btn-lg">View All Projects &rarr;</a>
      </div>
    </div>
  </section>

  <!-- ===== 6. VISION & MISSION ===== -->
  <section class="section vm-section section-concrete">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">Why Choose TRC</span>
        <h2>Trusted by Agencies Across India</h2>
        <div class="section-accent-line"></div>
      </div>
      <div class="vm-panels">
        <div class="vm-card" data-vm="vision">
          <div class="vm-card-overlay vm-overlay-blue"></div>
          <div class="vm-card-content">
            <div class="vm-card-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            </div>
            <h3 class="vm-card-title">Impartial by Design</h3>
            <p class="vm-card-body">As part of a premier national institute of technology, TRC maintains complete independence from construction contractors. Our safety reviews and DPR assessments rest purely on scientific data and IRC guidelines.</p>
          </div>
        </div>
        <div class="vm-card" data-vm="mission">
          <div class="vm-card-overlay vm-overlay-green"></div>
          <div class="vm-card-content">
            <div class="vm-card-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>
            </div>
            <h3 class="vm-card-title">Measured, Not Assumed</h3>
            <p class="vm-card-body">Every study begins in the field &mdash; with high-precision radar counters, drone video surveys, and rigorous crash analysis. Recommendations reflect actual driver behavior on Indian highways rather than textbook approximations.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== 7. ASSOCIATIONS MARQUEE ===== -->
  <section class="section associations-strip" id="associations-section">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">Collaboration</span>
        <h2>Our Associations &amp; Clients</h2>
        <div class="section-accent-line"></div>
      </div>
    </div>
    <div class="association-marquee" id="home-associations">
      <ul class="association-track">
        <li class="association-tile"><span>NHAI</span></li>
        <li class="association-tile"><span>MoRTH</span></li>
        <li class="association-tile"><span>GSRDC</span></li>
        <li class="association-tile"><span>Surat Municipal Corp</span></li>
        <li class="association-tile"><span>GIDC</span></li>
        <li class="association-tile"><span>Indian Roads Congress</span></li>
        <li class="association-tile"><span>L&amp;T Infrastructure</span></li>
        <li class="association-tile"><span>Gujarat Police</span></li>
        <li class="association-tile" aria-hidden="true"><span>NHAI</span></li>
        <li class="association-tile" aria-hidden="true"><span>MoRTH</span></li>
        <li class="association-tile" aria-hidden="true"><span>GSRDC</span></li>
        <li class="association-tile" aria-hidden="true"><span>Surat Municipal Corp</span></li>
      </ul>
    </div>
  </section>

  <!-- ===== 8. NEWS & RECENT PUBLICATIONS ===== -->
  <section class="section" id="updates-section">
    <div class="wrap">
      <div class="section-heading" data-reveal="fade-in-up">
        <span class="section-label">Latest Updates</span>
        <h2>News &amp; Research</h2>
        <div class="section-accent-line"></div>
      </div>

      <div id="home-news-col">
        <div class="subsection-head">
          <h3>Latest News</h3>
          <a href="news.php" class="text-link-sm">All News &rarr;</a>
        </div>
        <ul class="news-grid" id="home-news">
          <!-- Rendered dynamically by main.js -->
        </ul>
      </div>

      <div id="home-pubs-col" style="margin-top:3.5rem">
        <div class="subsection-head">
          <h3>Recent Publications</h3>
          <a href="publications.php" class="text-link-sm">All Publications &rarr;</a>
        </div>
        <ul class="pub-list pub-list-compact" id="home-pubs">
          <!-- Rendered dynamically by main.js -->
        </ul>
      </div>
    </div>
  </section>

  <!-- ===== 9. CTA BAND ===== -->
  <section class="cta-band">
    <div class="wrap">
      <div class="cta-band-inner" data-reveal="fade-in-up">
        <div class="cta-band-text">
          <h2 class="cta-band-title">Planning a Highway Study or Need an Independent Review?</h2>
          <p class="cta-band-desc">Tell us about the corridor location, engineering challenge, and timeline. Our faculty and research engineers will reach out directly.</p>
        </div>
        <div class="cta-band-actions">
          <a href="contact.php" class="btn btn-yellow btn-lg">Send an Enquiry &rarr;</a>
        </div>
      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
