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
          <div class="hero-slide is-active"><img class="hero-slide-img" src="images/Hero_1.jpg" alt="TEP Research Lab" /></div>
          <div class="hero-slide"><img class="hero-slide-img" src="images/Hero_2.jpg" alt="Road Safety Audit" /></div>
          <div class="hero-slide"><img class="hero-slide-img" src="images/Hero_3.jpg" alt="Traffic Engineering" /></div>
          <div class="hero-slide"><img class="hero-slide-img" src="images/Hero_4.jpg" alt="Highway Research" /></div>
          <div class="hero-slide"><img class="hero-slide-img" src="images/Hero_5.jpg" alt="Data Analytics" /></div>
        </div>

        <!-- Dark overlay -->
        <div class="hero-overlay" aria-hidden="true"></div>

        <!-- Main hero content -->
        <div class="hero-content">
          <h2 class="hero-welcome">Welcome To</h2>
          <h1 class="hero-title">TEP Research &amp; Consultancy Cell.</h1>
          <h2 class="hero-tagline">Department Of Civil Engineering &bull; SVNIT Surat.</h2>
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
                <span class="vela-pillar-desc">IRC:SP:88 certified road safety reviews for state &amp; national corridors.</span>
              </div>
              <div class="vela-pillar-item">
                <span class="vela-pillar-badge">Smart Mobility</span>
                <span class="vela-pillar-desc">AI traffic surveillance, speed radar studies &amp; Indo-HCM capacity models.</span>
              </div>
              <div class="vela-pillar-item">
                <span class="vela-pillar-badge">National Advisory</span>
                <span class="vela-pillar-desc">Trusted partner to MoRTH, NHAI, GSRDC, and state municipal corporations.</span>
              </div>
            </div>

            <!-- Originkit Circular Text Ring replacing sprout tree -->
            <div class="text-ring-wrap" title="TEP Research &amp; Consultancy Cell • SVNIT Surat" aria-label="TEP Research Cell Rotating Ring">
              <svg class="text-ring-svg" viewBox="0 0 140 140" aria-hidden="true">
                <defs>
                  <path id="textRingCircle" d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
                </defs>
                <text class="text-ring-content">
                  <textPath href="#textRingCircle" startOffset="0%">
                    TEP RESEARCH ✦ SVNIT SURAT ✦ ROAD SAFETY ✦
                  </textPath>
                </text>
                <!-- Center Star Emblem -->
                <circle cx="70" cy="70" r="18" fill="rgba(8, 69, 52, 0.08)" stroke="#084534" stroke-width="1.2" />
                <path d="M 70, 62 L 72, 68 L 78, 70 L 72, 72 L 70, 78 L 68, 72 L 62, 70 L 68, 68 Z" fill="#084534" />
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
            <video class="about-intro-video" controls playsinline preload="metadata" poster="images/Hero_1.jpg">
              <source src="images/SVNIT%20Intro.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div class="about-video-overlay-badge">
              <span class="video-badge-pulse"></span>
              <span>SVNIT Campus &bull; TEP Cell Overview</span>
            </div>
          </div>
        </div>

        <!-- Right: Cell Headings & Department Title -->
        <div class="about-headings-col" data-reveal="fade-in-up">
          <div class="about-brand-tag">
            <span class="about-tep-monogram">TEP</span>
            <span class="about-brand-label">TEP RESEARCH &amp; CONSULTANCY CELL</span>
          </div>
          <h2 class="about-mattest-title">
            15+ YEARS OF EXCELLENCE IN ROAD SAFETY, TRAFFIC ENGINEERING &amp; INFRASTRUCTURE CONSULTANCY
          </h2>
          <p class="about-intro-lead">
            Established within the premier Department of Civil Engineering at Sardar Vallabhbhai National Institute of Technology, TRC is an apex academic and technical advisory body delivering evidence-based research, corridor audits, and smart transportation planning across western India and beyond.
          </p>
        </div>
      </div>

      <!-- Bottom Area: Detailed Bullet Points Spanning Full Width & Concluding Tagline -->
      <div class="about-bottom-block" data-reveal="fade-in-up">
        <ul class="about-feature-list">
          <li><strong>Established at SVNIT Surat:</strong> Founded within the premier Department of Civil Engineering at Sardar Vallabhbhai National Institute of Technology, TRC is an apex academic and consultancy body in western India.</li>
          <li><strong>Full-Lifecycle Highway Engineering:</strong> Delivering comprehensive transportation engineering services from pre-feasibility, corridor planning, and DPR reviews, to construction-stage road safety audits and post-construction operational assessments.</li>
          <li><strong>Trusted by Key Public Authorities:</strong> Proven advisory track record with central, state, and municipal agencies including NHAI, MoRTH, GSRDC, Surat Municipal Corporation, GIDC, and leading infrastructure concessionaires.</li>
          <li><strong>Advanced Sensor &amp; AI Technology:</strong> Pioneering data-driven field methodologies integrating UAV drone videography, AI-based traffic counting, speed radar enforcement, and blackspot collision diagnostic models.</li>
          <li><strong>National Guidelines &amp; Policy Leadership:</strong> Active contributions to Indian Roads Congress (IRC) committee standards, IRC:SP:88 road safety audit revisions, state blackspot remediation guidelines, and capacity-building workshops.</li>
          <li><strong>Renowned Faculty &amp; Technical Experts:</strong> Supported by distinguished civil engineering faculty, doctorate research scholars, and experienced highway professionals across all transport domains.</li>
        </ul>
        <p class="about-tagline">
          <strong>AT TRC SVNIT, WE BLEND ACADEMIC RIGOR, ADVANCED SENSING TECHNOLOGY, AND PRACTICAL ENGINEERING TO DELIVER ROBUST SOLUTIONS THAT SAFEGUARD LIVES AND ACCELERATE DURABLE INFRASTRUCTURE.</strong>
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
            <div class="stats-banner-number">15+</div>
            <div class="stats-banner-label">Years Of Experience</div>
          </div>

          <div class="stats-banner-divider" aria-hidden="true"></div>

          <div class="stats-banner-item">
            <div class="stats-banner-number">40+</div>
            <div class="stats-banner-label">Projects Completed</div>
          </div>

          <div class="stats-banner-divider" aria-hidden="true"></div>

          <div class="stats-banner-item">
            <div class="stats-banner-number">120+</div>
            <div class="stats-banner-label">Publications &amp; Reports</div>
          </div>

          <div class="stats-banner-divider" aria-hidden="true"></div>

          <div class="stats-banner-item">
            <div class="stats-banner-number">100+</div>
            <div class="stats-banner-label">Road Safety Audits</div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- ===== 3. OUR SERVICES (MattestLab-Style Sticky Header & Scroll-Stacking Cards) ===== -->
  <section class="services-section" id="capabilities-section">
    <div class="services-sticky-container">
      <!-- Sticky Section Header with Gradient Underline -->
      <div class="services-section-header">
        <h1 class="services-title">OUR SERVICES</h1>
        <div class="services-title-underline"></div>
        <p class="services-lead">Our services encompass a comprehensive range of academic research and specialized engineering consultancy aimed at providing tailored, evidence-based solutions for highway and urban mobility challenges. From baseline surveys and safety audits to smart sensing and detailed engineering reviews, our core services include:</p>
      </div>

      <!-- 6 Service Cards with Stacking Scroll Effect -->
      <div class="services-card-stack">
        <!-- 1. Road Safety Audit -->
        <div class="service-card" data-service="rsa">
          <div class="service-card-icon">
            <svg viewBox="0 0 64 64" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4L10 14V28C10 44 19.5 54.5 32 60C44.5 54.5 54 44 54 28V14L32 4Z" fill="#084534" fill-opacity="0.1" stroke="#084534" stroke-width="3" stroke-linejoin="round"/>
              <path d="M26 31L30 35L38 25" stroke="#f2be1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 44H44" stroke="#084534" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M32 38V44" stroke="#084534" stroke-width="2" stroke-linecap="round"/>
              <circle cx="32" cy="18" r="3" fill="#f2be1a"/>
            </svg>
          </div>
          <h3 class="service-card-title">Road Safety Audit (RSA)</h3>
          <p class="service-card-body">Independent and systematic safety evaluations conducted at feasibility, preliminary design, construction zones, and operational stages for national expressways and state highways per IRC:SP:88 standards to prevent severe crashes.</p>
          <a href="about.php#road-safety" class="service-read-more">Read More &rarr;</a>
        </div>

        <!-- 2. Traffic Engineering & Impact Studies -->
        <div class="service-card" data-service="traffic">
          <div class="service-card-icon">
            <svg viewBox="0 0 64 64" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="22" y="8" width="20" height="48" rx="8" fill="#084534" fill-opacity="0.1" stroke="#084534" stroke-width="3"/>
              <circle cx="32" cy="18" r="5" fill="#e53e3e"/>
              <circle cx="32" cy="32" r="5" fill="#f2be1a"/>
              <circle cx="32" cy="46" r="5" fill="#38a169"/>
              <path d="M12 28L6 32L12 36" stroke="#084534" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M52 28L58 32L52 36" stroke="#084534" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="service-card-title">Traffic Engineering &amp; Studies</h3>
          <p class="service-card-body">High-precision classified vehicular volume counts, turning movement surveys, intersection signal design, travel time-delay analysis, and Traffic Impact Assessments (TIA) for mega urban developments and corridors.</p>
          <a href="about.php#traffic-studies" class="service-read-more">Read More &rarr;</a>
        </div>

        <!-- 3. Highway Geometric & Pavement Design -->
        <div class="service-card" data-service="geometric">
          <div class="service-card-icon">
            <svg viewBox="0 0 64 64" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 52L24 12H40L54 52H10Z" fill="#084534" fill-opacity="0.1" stroke="#084534" stroke-width="3" stroke-linejoin="round"/>
              <path d="M32 18V24M32 30V36M32 42V48" stroke="#f2be1a" stroke-width="3" stroke-linecap="round"/>
              <path d="M6 56H58" stroke="#084534" stroke-width="3" stroke-linecap="round"/>
              <circle cx="48" cy="20" r="8" stroke="#f2be1a" stroke-width="2.5" stroke-dasharray="2 3"/>
            </svg>
          </div>
          <h3 class="service-card-title">Highway Geometric &amp; Pavement Design</h3>
          <p class="service-card-body">Horizontal and vertical alignment planning, superelevation, sight distance verification, cross-sectional design, and non-destructive structural pavement evaluation (IRC:37 &amp; IRC:58) for durable flexible and rigid pavements.</p>
          <a href="about.php#highway-design" class="service-read-more">Read More &rarr;</a>
        </div>

        <!-- 4. Intelligent Transportation Systems & AI -->
        <div class="service-card" data-service="its">
          <div class="service-card-icon">
            <svg viewBox="0 0 64 64" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="12" y="14" width="40" height="28" rx="6" fill="#084534" fill-opacity="0.1" stroke="#084534" stroke-width="3"/>
              <circle cx="32" cy="28" r="7" stroke="#f2be1a" stroke-width="3"/>
              <circle cx="32" cy="28" r="2.5" fill="#f2be1a"/>
              <path d="M22 42L14 54H50L42 42" stroke="#084534" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M6 18C4 22 4 28 6 32" stroke="#f2be1a" stroke-width="2" stroke-linecap="round"/>
              <path d="M58 18C60 22 60 28 58 32" stroke="#f2be1a" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="service-card-title">Intelligent Transportation Systems (ITS)</h3>
          <p class="service-card-body">Cutting-edge AI-based video analytics, automatic vehicle detection &amp; classification (AVDC), ANPR cameras, speed radar sensors, and digital traffic monitoring algorithms for modern smart cities and expressway management.</p>
          <a href="about.php#its-analytics" class="service-read-more">Read More &rarr;</a>
        </div>

        <!-- 5. Topographic Surveying & Drone Traffic Counting -->
        <div class="service-card" data-service="survey">
          <div class="service-card-icon">
            <svg viewBox="0 0 64 64" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 26H40V38H24V26Z" fill="#084534" fill-opacity="0.1" stroke="#084534" stroke-width="3"/>
              <line x1="24" y1="26" x2="12" y2="16" stroke="#084534" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="40" y1="26" x2="52" y2="16" stroke="#084534" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="24" y1="38" x2="12" y2="48" stroke="#084534" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="40" y1="38" x2="52" y2="48" stroke="#084534" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="12" cy="16" r="5" stroke="#f2be1a" stroke-width="2.5"/>
              <circle cx="52" cy="16" r="5" stroke="#f2be1a" stroke-width="2.5"/>
              <circle cx="12" cy="48" r="5" stroke="#f2be1a" stroke-width="2.5"/>
              <circle cx="52" cy="48" r="5" stroke="#f2be1a" stroke-width="2.5"/>
              <circle cx="32" cy="32" r="3" fill="#f2be1a"/>
            </svg>
          </div>
          <h3 class="service-card-title">Surveying &amp; Drone Traffic Counting</h3>
          <p class="service-card-body">UAV aerial videography and photogrammetry, digital terrain elevation modeling (DTM), LiDAR surveys, and drone-based multi-directional intersection traffic flow tracking in dense urban and rural environments.</p>
          <a href="about.php#survey-drones" class="service-read-more">Read More &rarr;</a>
        </div>

        <!-- 6. DPR Review & Technical Feasibility -->
        <div class="service-card" data-service="dpr">
          <div class="service-card-icon">
            <svg viewBox="0 0 64 64" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="8" width="36" height="48" rx="4" fill="#084534" fill-opacity="0.1" stroke="#084534" stroke-width="3"/>
              <line x1="22" y1="18" x2="42" y2="18" stroke="#084534" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="22" y1="26" x2="42" y2="26" stroke="#084534" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="22" y1="34" x2="34" y2="34" stroke="#084534" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="40" cy="44" r="8" fill="#f2be1a" stroke="#084534" stroke-width="2"/>
              <path d="M37 44L39 46L44 41" stroke="#084534" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="service-card-title">DPR Review &amp; Technical Feasibility</h3>
          <p class="service-card-body">Comprehensive third-party appraisal of Detailed Project Reports (DPRs), cost-benefit analyses, highway capacity compliance, alignment validation, and engineering audits prior to government fund sanctions.</p>
          <a href="about.php#dpr-review" class="service-read-more">Read More &rarr;</a>
        </div>
      </div>
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
