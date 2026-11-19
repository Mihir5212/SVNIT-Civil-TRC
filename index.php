<?php
$activePage = 'home';
$pageTitle = 'TRC | TEP Research & Consultancy Cell | SVNIT Surat';
$pageDesc = 'TRC is the Transportation Engineering & Planning Research & Consultancy Cell at SVNIT Surat. Providing Road Safety Audits, Traffic Engineering, and Transportation Research since 2010.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- ===== 1. HERO SECTION (Image Slider with TRC Content) ===== -->
  <section class="hero-vela-section" id="hero">
    <div class="hero-vela-container">
      <div class="hero-vela-card hero-card">

        <!-- Image Slides -->
        <div class="hero-slides" aria-hidden="true">
          <div class="hero-slide is-active"><img class="hero-slide-img" src="images/Hero_1.jpg"
              alt="TEP Research Lab" /></div>
          <div class="hero-slide"><img class="hero-slide-img" src="images/Hero_2.jpg" alt="Road Safety Audit" /></div>
          <div class="hero-slide"><img class="hero-slide-img" src="images/Hero_3.jpg" alt="Traffic Engineering" /></div>
          <div class="hero-slide"><img class="hero-slide-img" src="images/Hero_4.jpg" alt="Highway Research" /></div>
          <div class="hero-slide"><img class="hero-slide-img" src="images/Hero_5.jpg" alt="Data Analytics" /></div>
        </div>

        <!-- Dark overlay -->
        <div class="hero-overlay" aria-hidden="true"></div>

        <!-- Main hero content -->
        <div class="hero-content">
          <div class="hero-welcome">Welcome To</div>
          <h1 class="hero-title">TEP Research &amp; Consultancy Cell.</h1>
          <div class="hero-tagline">Department Of Civil Engineering &bull; SVNIT Surat.</div>
        </div>

        <!-- Bottom Stats Strip with S-Curve Notch -->
        <div class="vela-stats-strip" aria-label="Key Cell Metrics">
          <svg class="vela-strip-notch-svg" viewBox="0 0 1440 62" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 62 H1062 C1092 62 1098 54 1116 34 C1138 9 1146 1 1178 1 H1440 V62 Z" fill="#FBF6EF" />
          </svg>
          <a href="#about-section" class="vela-scroll-hint" aria-label="Scroll to learn more about the cell">
            <span>&darr;</span> Scroll to explore
          </a>
          <div class="vela-stats-content">
            <div class="vela-stats-lead">
              Evidence-based<br>infrastructure
            </div>

            <!-- Descriptive Text Pillars instead of numbers -->
            <div class="vela-stats-pillars">
              <div class="vela-pillar-item">
                <span class="vela-pillar-badge">Safety Audits</span>
                <span class="vela-pillar-desc">IRC:SP:88 certified road safety reviews for state &amp; national
                  corridors.</span>
              </div>
              <div class="vela-pillar-item">
                <span class="vela-pillar-badge">Smart Mobility</span>
                <span class="vela-pillar-desc">AI traffic surveillance, speed radar studies &amp; Indo-HCM capacity
                  models.</span>
              </div>
              <div class="vela-pillar-item">
                <span class="vela-pillar-badge">National Advisory</span>
                <span class="vela-pillar-desc">Trusted partner to MoRTH, NHAI, GSRDC, and state municipal
                  corporations.</span>
              </div>
            </div>

            <!-- Originkit Circular Text Ring replacing sprout tree -->
            <div class="text-ring-wrap" title="TEP Research &amp; Consultancy Cell • SVNIT Surat"
              aria-label="TEP Research Cell Rotating Ring">
              <svg class="text-ring-svg" viewBox="0 0 140 140" aria-hidden="true">
                <defs>
                  <path id="textRingCircle" d="M 70, 70 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
                </defs>
                <text class="text-ring-content">
                  <textPath href="#textRingCircle" startOffset="0%">
                    TEP CONSULTANCY ✦ SVNIT SURAT ✦ RESEARCH ✦
                  </textPath>
                </text>
                <!-- Center Star Emblem -->
                <circle cx="70" cy="70" r="15" fill="rgba(8, 69, 52, 0.08)" stroke="#084534" stroke-width="1.2" />
                <path d="M 70, 63 L 71.8, 68.2 L 77, 70 L 71.8, 71.8 L 70, 77 L 68.2, 71.8 L 63, 70 L 68.2, 68.2 Z"
                  fill="#084534" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ===== 2. ABOUT SECTION (MattestLab-Style Experience Showcase with SVNIT Video) ===== -->
  <section class="section about-section-mattest" id="about-section">
    <div class="about-container">

      <!-- Top Row: Video Player (Left) + Headings & Intro (Right) -->
      <div class="about-top-row">
        <!-- Left: Rounded Rectangle Media Player embedding images/SVNIT Intro.mp4 -->
        <div class="about-video-col" data-reveal="fade-in-up">
          <div class="about-video-card">
            <video class="about-intro-video" muted controls playsinline preload="metadata" poster="images/Hero_1.jpg">
              <source src="images/SVNIT%20Intro.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <!-- Right: Cell Headings & Department Title -->
        <div class="about-headings-col" data-reveal="fade-in-up">
          <span class="about-brand-label">TEP RESEARCH &amp; CONSULTANCY CELL</span>
          <h2 class="about-mattest-title">
            15+ YEARS OF EXCELLENCE IN ROAD SAFETY, TRAFFIC ENGINEERING &amp; INFRASTRUCTURE CONSULTANCY
          </h2>
          <p class="about-intro-lead">
            Established within the premier Department of Civil Engineering at Sardar Vallabhbhai National Institute of
            Technology, TRC is an apex academic and technical advisory body delivering evidence-based research, corridor
            audits, and smart transportation planning across western India and beyond.
          </p>
        </div>
      </div>

      <!-- Bottom Area: Detailed Bullet Points Spanning Full Width & Concluding Tagline -->
      <div class="about-bottom-block" data-reveal="fade-in-up">
        <ul class="about-feature-list">
          <li><strong>Established at SVNIT Surat:</strong> Founded within the premier Department of Civil Engineering at
            Sardar Vallabhbhai National Institute of Technology, TRC is an apex academic and consultancy body in western
            India.</li>
          <li><strong>Full-Lifecycle Highway Engineering:</strong> Delivering comprehensive transportation engineering
            services from pre-feasibility, corridor planning, and DPR reviews, to construction-stage road safety audits
            and post-construction operational assessments.</li>
          <li><strong>Trusted by Key Public Authorities:</strong> Proven advisory track record with central, state, and
            municipal agencies including NHAI, MoRTH, GSRDC, Surat Municipal Corporation, GIDC, and leading
            infrastructure concessionaires.</li>
          <li><strong>Advanced Sensor &amp; AI Technology:</strong> Pioneering data-driven field methodologies
            integrating UAV drone videography, AI-based traffic counting, speed radar enforcement, and blackspot
            collision diagnostic models.</li>
          <li><strong>National Guidelines &amp; Policy Leadership:</strong> Active contributions to Indian Roads
            Congress (IRC) committee standards, IRC:SP:88 road safety audit revisions, state blackspot remediation
            guidelines, and capacity-building workshops.</li>
          <li><strong>Renowned Faculty &amp; Technical Experts:</strong> Supported by distinguished civil engineering
            faculty, doctorate research scholars, and experienced highway professionals across all transport domains.
          </li>
        </ul>
        <p class="about-tagline">
          <strong>AT TRC SVNIT, WE BLEND ACADEMIC RIGOR, ADVANCED SENSING TECHNOLOGY, AND PRACTICAL ENGINEERING TO
            DELIVER ROBUST SOLUTIONS THAT SAFEGUARD LIVES AND ACCELERATE DURABLE INFRASTRUCTURE.</strong>
        </p>
      </div>

    </div>
  </section>

  <!-- ===== 2B. EXPERIENCE METRICS BANNER (MattestLab-Style 4-Item Rounded Orange Card) ===== -->
  <section class="section stats-banner-section" id="stats-banner" aria-label="Key Cell Metrics">
    <div class="stats-banner-container">
      <div class="stats-banner-card" data-reveal="fade-in-up">
        <div class="stats-banner-grid">

          <div class="stats-banner-item">
            <div class="stats-banner-number" data-target="15" data-suffix="+">15+</div>
            <div class="stats-banner-label">Years Of Experience</div>
          </div>

          <div class="stats-banner-divider" aria-hidden="true"></div>

          <div class="stats-banner-item">
            <div class="stats-banner-number" data-target="40" data-suffix="+">40+</div>
            <div class="stats-banner-label">Projects Completed</div>
          </div>

          <div class="stats-banner-divider" aria-hidden="true"></div>

          <div class="stats-banner-item">
            <div class="stats-banner-number" data-target="120" data-suffix="+">120+</div>
            <div class="stats-banner-label">Publications &amp; Reports</div>
          </div>

          <div class="stats-banner-divider" aria-hidden="true"></div>

          <div class="stats-banner-item">
            <div class="stats-banner-number" data-target="100" data-suffix="+">100+</div>
            <div class="stats-banner-label">Road Safety Audits</div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- ===== 3. OUR SERVICES (Interactive Photo-Grid Cards with Bottom-Sliding Button & Arrow Glide) ===== -->
  <section class="section services-grid-section" id="capabilities-section">
    <div class="services-grid-container">

      <!-- Section Heading -->
      <div class="services-heading-wrap" data-reveal="fade-in-up">
        <span class="services-badge">OUR SERVICES</span>
        <h2 class="services-main-title">Transportation Research &amp; Engineering Consultancy</h2>
        <div class="services-title-accent"></div>
        <p class="services-lead-text">
          Delivering field-measured safety audits, advanced sensor traffic studies, and comprehensive highway planning
          for state agencies, infrastructure authorities, and municipal corporations across India.
        </p>
      </div>

      <!-- 8-Card Photo Grid (Matching Reference Layout) -->
      <div class="services-photo-grid">

        <!-- Card 1: Road Safety Audit -->
        <div class="srv-photo-card" data-reveal="fade-in-up">
          <img class="srv-photo-img" src="images/Road Safety Audit.jpg" alt="Road Safety Audit" loading="lazy" />
          <div class="srv-photo-overlay" aria-hidden="true"></div>
          <div class="srv-photo-info">
            <div class="srv-photo-icon">
              <!-- Certified Road Safety Shield with Traffic Cone & Radar -->
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#6ee7b7" stroke-width="2.4"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M24 4L7 11V22C7 33.8 14.3 40.8 24 44C33.7 40.8 41 33.8 41 22V11L24 4Z" />
                <path d="M17 24L22 29L32 18" stroke-width="2.8" />
                <path d="M18 36H30" stroke-width="2" stroke-dasharray="2 3" />
              </svg>
            </div>
            <h3 class="srv-photo-title">Road Safety Audit</h3>
          </div>
          <a href="about.php#road-safety" class="srv-photo-btn" aria-label="See our Road Safety Audit service">
            <span class="srv-btn-text">SEE OUR SERVICE</span>
            <span class="srv-btn-arrow-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <!-- Card 2: Traffic Engineering & Studies -->
        <div class="srv-photo-card" data-reveal="fade-in-up">
          <img class="srv-photo-img" src="images/Traffic Engineering.jpg" alt="Traffic Engineering &amp; Studies"
            loading="lazy" />
          <div class="srv-photo-overlay" aria-hidden="true"></div>
          <div class="srv-photo-info">
            <div class="srv-photo-icon">
              <!-- 3-Lens Traffic Signal with Visors & Telemetry Directionals -->
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#6ee7b7" stroke-width="2.4"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="15" y="5" width="18" height="38" rx="4" />
                <path d="M15 12C12 12 12 16 15 16M33 12C36 12 36 16 33 16" />
                <circle cx="24" cy="14" r="3" fill="#6ee7b7" />
                <circle cx="24" cy="24" r="3" fill="#6ee7b7" />
                <circle cx="24" cy="34" r="3" fill="#6ee7b7" />
                <path d="M7 24H11M37 24H41" />
                <path d="M9 20L5 24L9 28M39 20L43 24L39 28" />
              </svg>
            </div>
            <h3 class="srv-photo-title">Traffic Engineering</h3>
          </div>
          <a href="about.php#traffic-studies" class="srv-photo-btn" aria-label="See our Traffic Engineering service">
            <span class="srv-btn-text">SEE OUR SERVICE</span>
            <span class="srv-btn-arrow-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <!-- Card 3: Transportation & Highway Design -->
        <div class="srv-photo-card" data-reveal="fade-in-up">
          <img class="srv-photo-img" src="images/Transportation.jpg" alt="Transportation &amp; Highway Design"
            loading="lazy" />
          <div class="srv-photo-overlay" aria-hidden="true"></div>
          <div class="srv-photo-info">
            <div class="srv-photo-icon">
              <!-- Multi-Lane Highway Expressway with Dash Dividers & Flyover Piers -->
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#6ee7b7" stroke-width="2.4"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 39L17 9H31L42 39H6Z" />
                <path d="M24 15V20M24 25V30M24 35V39" stroke-dasharray="2 2" stroke-width="2.6" />
                <path d="M14 39V44M34 39V44" stroke-width="2.2" />
                <path d="M4 42H44" stroke-width="2" />
              </svg>
            </div>
            <h3 class="srv-photo-title">Transportation</h3>
          </div>
          <a href="about.php#highway-design" class="srv-photo-btn" aria-label="See our Transportation service">
            <span class="srv-btn-text">SEE OUR SERVICE</span>
            <span class="srv-btn-arrow-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <!-- Card 4: Rail & Transit Services -->
        <div class="srv-photo-card" data-reveal="fade-in-up">
          <img class="srv-photo-img" src="images/Rail Services.jpg" alt="Rail Services &amp; Transit" loading="lazy" />
          <div class="srv-photo-overlay" aria-hidden="true"></div>
          <div class="srv-photo-info">
            <div class="srv-photo-icon">
              <!-- High-Speed Metro Locomotive on Dual Track Cross-Ties -->
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#6ee7b7" stroke-width="2.4"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 7H37V31C37 36 32 39 24 39C16 39 11 36 11 31V7Z" />
                <rect x="15" y="11" width="18" height="11" rx="2" />
                <circle cx="18" cy="29" r="2.5" fill="#6ee7b7" />
                <circle cx="30" cy="29" r="2.5" fill="#6ee7b7" />
                <path d="M15 39L9 45M33 39L39 45" stroke-width="2.2" />
                <path d="M6 43H42" stroke-width="2" />
              </svg>
            </div>
            <h3 class="srv-photo-title">Rail Services</h3>
          </div>
          <a href="about.php#highway-design" class="srv-photo-btn" aria-label="See our Rail Services">
            <span class="srv-btn-text">SEE OUR SERVICE</span>
            <span class="srv-btn-arrow-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <!-- Card 5: AI & Smart Mobility (ITS) -->
        <div class="srv-photo-card" data-reveal="fade-in-up">
          <img class="srv-photo-img" src="images/Smart Mobility.jpg" alt="Smart Mobility &amp; ITS" loading="lazy" />
          <div class="srv-photo-overlay" aria-hidden="true"></div>
          <div class="srv-photo-info">
            <div class="srv-photo-icon">
              <!-- AI Radar Optical Sensor with Connected Network Waves -->
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#6ee7b7" stroke-width="2.4"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="10" y="12" width="28" height="20" rx="3" />
                <circle cx="24" cy="22" r="5" stroke-width="2" />
                <circle cx="24" cy="22" r="2" fill="#6ee7b7" />
                <path d="M17 32L12 40H36L31 32" stroke-width="2.2" />
                <path d="M4 17C2 20 2 24 4 27M44 17C46 20 46 24 44 27" stroke-width="2" />
                <path d="M8 8L12 12M40 8L36 12" stroke-width="2" />
              </svg>
            </div>
            <h3 class="srv-photo-title">Smart Mobility</h3>
          </div>
          <a href="about.php#its-analytics" class="srv-photo-btn" aria-label="See our Smart Mobility service">
            <span class="srv-btn-text">SEE OUR SERVICE</span>
            <span class="srv-btn-arrow-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <!-- Card 6: Land Development & Pavements -->
        <div class="srv-photo-card" data-reveal="fade-in-up">
          <img class="srv-photo-img" src="images/Land Development.jpg" alt="Land Development &amp; Pavement"
            loading="lazy" />
          <div class="srv-photo-overlay" aria-hidden="true"></div>
          <div class="srv-photo-info">
            <div class="srv-photo-icon">
              <!-- Architectural Infrastructure Building with Interlocking Engineering Gear -->
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#6ee7b7" stroke-width="2.4"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="8" y="10" width="18" height="30" rx="1" />
                <path d="M12 16H16M20 16H22M12 22H16M20 22H22M12 28H16M20 28H22M12 34H16M20 34H22" stroke-width="1.8" />
                <circle cx="33" cy="25" r="7" stroke-width="2.2" />
                <circle cx="33" cy="25" r="2.8" fill="#6ee7b7" />
                <path
                  d="M33 15V17M33 33V35M23 25H25M41 25H43M26 18L27.5 19.5M38.5 30.5L40 32M26 32L27.5 30.5M38.5 19.5L40 18"
                  stroke-width="2" />
              </svg>
            </div>
            <h3 class="srv-photo-title">Land Development</h3>
          </div>
          <a href="about.php#highway-design" class="srv-photo-btn" aria-label="See our Land Development service">
            <span class="srv-btn-text">SEE OUR SERVICE</span>
            <span class="srv-btn-arrow-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <!-- Card 7: Surveying & Drone Analytics -->
        <div class="srv-photo-card" data-reveal="fade-in-up">
          <img class="srv-photo-img" src="images/Surveying.jpg" alt="Surveying &amp; Drone Analytics" loading="lazy" />
          <div class="srv-photo-overlay" aria-hidden="true"></div>
          <div class="srv-photo-info">
            <div class="srv-photo-icon">
              <!-- Digital Total Station Theodolite on Tripod with Laser Crosshairs -->
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#6ee7b7" stroke-width="2.4"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="17" y="8" width="14" height="12" rx="2" />
                <circle cx="24" cy="14" r="3" fill="#6ee7b7" />
                <path d="M24 20V25" stroke-width="2.4" />
                <path d="M14 25H34" stroke-width="2.4" />
                <path d="M18 25L10 43M30 25L38 43M24 25V43" stroke-width="2.4" />
                <circle cx="12" cy="14" r="1.5" fill="#6ee7b7" />
                <path d="M9 14H15" stroke-width="1.8" />
              </svg>
            </div>
            <h3 class="srv-photo-title">Surveying</h3>
          </div>
          <a href="about.php#survey-drones" class="srv-photo-btn" aria-label="See our Surveying service">
            <span class="srv-btn-text">SEE OUR SERVICE</span>
            <span class="srv-btn-arrow-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <!-- Card 8: Featured CTA Card (Matching 4th & 5th Reference Images) -->
        <a href="contact.php" class="srv-photo-card srv-photo-card--cta" data-reveal="fade-in-up"
          aria-label="Let’s Create a Better Tomorrow Together - Contact SVNIT TRC">
          <img class="srv-photo-img" src="images/Book Meeting.jpg" alt="Consult with SVNIT TRC" loading="lazy" />
          <div class="srv-photo-overlay srv-cta-overlay" aria-hidden="true"></div>
          <!-- Inset 1px architectural frame border -->
          <div class="srv-cta-inner-frame" aria-hidden="true"></div>
          <!-- Arrow track at top-right (white arrow slides out, dark arrow slides in from left on hover) -->
          <div class="srv-cta-arrow-track" aria-hidden="true">
            <svg class="srv-cta-arrow srv-cta-arrow--white" viewBox="0 0 36 24" fill="none" stroke="#ffffff"
              stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12h28M21 4l8 8-8 8" />
            </svg>
            <svg class="srv-cta-arrow srv-cta-arrow--dark" viewBox="0 0 36 24" fill="none" stroke="#04261c"
              stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12h28M21 4l8 8-8 8" />
            </svg>
          </div>
          <!-- Title block at bottom-left -->
          <div class="srv-cta-text-wrap">
            <h3 class="srv-cta-title">Let’s Create a<br>Better Tomorrow<br>Together</h3>
          </div>
        </a>

      </div>

    </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>