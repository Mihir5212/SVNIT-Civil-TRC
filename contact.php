<?php
$activePage = 'contact';
$pageTitle = 'Contact Us | TRC SVNIT Surat';
$pageDesc = 'Get in touch with the TEP Research & Consultancy Cell at SVNIT Surat for road safety audits, traffic engineering inquiries, and research collaborations.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-contact-rx-page">

  <!-- ========================================================= -->
  <!-- PAGE HERO WITH LIVE SVNIT MAP IN RIGHT CORNER             -->
  <!-- ========================================================= -->
  <section id="svnit-map" class="trc-rx-contact-hero">
    <div class="trc-shell">
      <div class="trc-rx-contact-hero-grid">
        <!-- Left Hero Header -->
        <div class="trc-rx-contact-hero-left">
          <div class="trc-rx-contact-copy">
            <div class="trc-rx-eyebrow-row">
              <span class="trc-rx-diamond" aria-hidden="true"></span>
              <span class="trc-rx-label">CONTACT US &mdash; TEP &bull; SVNIT, SURAT</span>
            </div>

            <h1 class="trc-rx-contact-title">
              INITIATE A CONSULTATION OR LABORATORY INQUIRY.
            </h1>

            <p class="trc-rx-hero-lead">
              Reach our Transportation Engineering &amp; Planning faculty and project engineers for traffic studies, IRC:SP:88 road safety audits, DPR proof checking, and laboratory material testing at SVNIT Surat.
            </p>
          </div>

          <div class="trc-rx-contact-meta-bar">
            <span class="trc-rx-hours-tag">
              HOURS: MON &ndash; FRI &bull; 09:30 &ndash; 17:30 IST
            </span>
            <a href="#enquiry-section" class="trc-rx-jump-btn">
              <span>INQUIRY FORM</span>
              <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_downward</span>
            </a>
          </div>
        </div>

        <!-- Right Corner: Live SVNIT Surat Google Map -->
        <div class="trc-rx-contact-map-col">
          <div class="trc-rx-map-bar">
            <span class="trc-rx-map-status">
              <span class="trc-rx-map-dot" aria-hidden="true"></span>
              <span>SVNIT SURAT &bull; LIVE LOCATION</span>
            </span>
            <a
              href="https://maps.google.com/?q=Sardar+Vallabhbhai+National+Institute+of+Technology+Surat"
              target="_blank"
              rel="noopener noreferrer"
              class="trc-rx-map-ext"
            >
              <span>OPEN IN MAPS</span>
              <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">open_in_new</span>
            </a>
          </div>

          <div class="trc-rx-map-frame" id="contact-map">
            <iframe
              title="Map showing SVNIT Surat"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14882.454124282574!2d72.788812!3d21.167773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423b99085d26d1f9!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1795792525775!5m2!1sen!2sin"
              allowfullscreen
            ></iframe>
          </div>

          <div class="trc-rx-map-bar">
            <span>21.1663&deg; N, 72.7833&deg; E</span>
            <span>ICHCHHANATH &bull; SURAT 395007</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================= -->
  <!-- SECTION 1: CONSULTATION FORM & LAB DIRECTORY              -->
  <!-- ========================================================= -->
  <section id="enquiry-section" class="trc-rx-contact-body">
    <div class="trc-shell">
      <div class="trc-rx-contact-main-grid">

        <!-- Left: Interactive Inquiry Form -->
        <div class="trc-rx-form-col" id="enquiry-form-card">
          <div class="trc-rx-form-head">
            <div class="trc-rx-eyebrow-row">
              <span class="trc-rx-diamond" aria-hidden="true"></span>
              <span class="trc-rx-label">TECHNICAL BRIEFING</span>
            </div>
            <h2 class="trc-rx-sec-title">REQUEST A PROPOSAL OR LAB TEST</h2>
          </div>

          <!-- Scope Selector Pills -->
          <div class="trc-rx-scope-wrap">
            <span class="trc-rx-label">SELECT CONSULTANCY SCOPE</span>
            <div class="trc-scope-chips trc-rx-scope-chips" id="trcScopeChips" role="group" aria-label="Select consultancy scope">
              <button type="button" class="trc-scope-chip is-active" data-scope-val="traffic-studies" aria-pressed="true">TRAFFIC SURVEY</button>
              <button type="button" class="trc-scope-chip" data-scope-val="road-safety" aria-pressed="false">ROAD SAFETY AUDIT</button>
              <button type="button" class="trc-scope-chip" data-scope-val="independent-review" aria-pressed="false">DPR PROOF CHECK</button>
              <button type="button" class="trc-scope-chip" data-scope-val="traffic-impact" aria-pressed="false">TRAFFIC IMPACT (TIA)</button>
              <button type="button" class="trc-scope-chip" data-scope-val="training" aria-pressed="false">RESEARCH &amp; LABS</button>
            </div>
          </div>

          <div id="form-status" hidden tabindex="-1"></div>
          <div id="query-feedback" class="query-feedback" style="display:none;margin-bottom:0.5rem;padding:1rem;border-radius:12px;"></div>

          <form id="enquiry-form" class="trc-rx-form" action="contact-handler.php" method="POST" novalidate>
            <!-- Honeypot anti-spam field -->
            <input type="text" name="_gotcha" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">

            <div class="trc-rx-form-row">
              <div class="trc-rx-field">
                <label for="cf-name">FULL NAME *</label>
                <input type="text" id="cf-name" name="name" placeholder="Dr. / Er. Rajesh Patel" required autocomplete="name">
              </div>
              <div class="trc-rx-field">
                <label for="cf-org">ORGANIZATION / AGENCY *</label>
                <input type="text" id="cf-org" name="organisation" placeholder="Gujarat R&amp;B / NHAI / EPC" autocomplete="organization">
              </div>
            </div>

            <div class="trc-rx-form-row">
              <div class="trc-rx-field">
                <label for="cf-email">OFFICIAL EMAIL *</label>
                <input type="email" id="cf-email" name="email" placeholder="engineer@agency.gov.in" required autocomplete="email">
              </div>
              <div class="trc-rx-field">
                <label for="cf-phone">PHONE NUMBER</label>
                <input type="tel" id="cf-phone" name="phone" placeholder="+91 98765 43210" autocomplete="tel">
              </div>
            </div>

            <div class="trc-rx-form-row">
              <div class="trc-rx-field">
                <label for="cf-corridor">CORRIDOR / PROJECT LOCATION</label>
                <input type="text" id="cf-corridor" name="corridor" placeholder="e.g., NH-48 Bharuch&ndash;Surat Section (KM 198&ndash;264)">
              </div>
              <div class="trc-rx-field">
                <label for="cf-work">AREA OF TECHNICAL WORK *</label>
                <select id="cf-work" name="work" required>
                  <option value="">Choose area of study&hellip;</option>
                </select>
              </div>
            </div>

            <div class="trc-rx-field">
              <label for="cf-message">SCOPE &amp; DELIVERABLE REQUIREMENTS *</label>
              <textarea id="cf-message" name="message" placeholder="Describe survey duration, IRC standard (IRC:SP:88 / Indo-HCM), or laboratory testing batch volume..." rows="4" required></textarea>
            </div>

            <p class="form-note" id="form-note" style="color:#64748b;font-size:12.5px;margin:0;"></p>

            <div class="trc-rx-form-actions">
              <button type="submit" class="trc-rx-submit-btn">
                <span>SUBMIT TECHNICAL INQUIRY</span>
                <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
              </button>
              <span class="trc-rx-response-note">RESPONSE WITHIN 24 BUSINESS HOURS</span>
            </div>
          </form>
        </div>

        <!-- Right: Direct Contact Channels (3 Rounded Emerald/White Cards) -->
        <div class="trc-rx-channels-col">
          <div class="trc-rx-channels-top">
            <div class="trc-rx-channels-head">
              <span class="trc-rx-label">DIRECT CHANNELS</span>
              <span class="trc-rx-label">SURAT &bull; GUJARAT</span>
            </div>

            <!-- Channel 01 -->
            <div class="trc-rx-channel-card">
              <div class="trc-rx-channel-card-top">
                <span>01 &bull; LABORATORY HQ</span>
                <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
              </div>
              <h3>TRANSPORTATION ENGINEERING LAB (DOCE)</h3>
              <p id="contact-address">
                Department of Civil Engineering, SVNIT Campus, Ichchhanath, Dumas Road, Surat &mdash; 395007, Gujarat, India.
              </p>
            </div>

            <!-- Channel 02 (Dark Deep Emerald Card) -->
            <div class="trc-rx-channel-card is-dark">
              <div class="trc-rx-channel-card-top">
                <span>02 &bull; CONSULTANCY DESK</span>
                <span class="material-symbols-outlined" aria-hidden="true">mail</span>
              </div>
              <div class="trc-rx-channel-links">
                <a href="mailto:trc@svnit.ac.in" data-email class="trc-rx-channel-email-lg">trc@svnit.ac.in</a>
                <a href="mailto:tep-consultancy@ced.svnit.ac.in" class="trc-rx-channel-email-sm">tep-consultancy@ced.svnit.ac.in</a>
              </div>
              <p class="trc-rx-channel-phone">
                Direct Phone: <a href="tel:+912612259571" data-phone>+91 261 225 9571</a> &bull; Ext. 1500
              </p>
            </div>

            <!-- Channel 03 -->
            <div class="trc-rx-channel-card">
              <div class="trc-rx-channel-card-top">
                <span>03 &bull; MATERIAL QA/QC LAB</span>
                <span class="material-symbols-outlined" aria-hidden="true">science</span>
              </div>
              <h3>HIGHWAY MATERIALS &amp; BITUMEN LAB</h3>
              <p>
                Sample drop-off &amp; third-party cube, core &amp; bitumen testing: Mon&ndash;Fri, 10:00&ndash;16:30 IST.
              </p>
            </div>
          </div>

          <div class="trc-rx-channels-foot">
            <span id="contact-hours">MON &ndash; FRI &bull; 09:30 &ndash; 17:30 IST</span>
            <a href="#svnit-map" class="trc-rx-back-map">
              <span>VIEW SVNIT MAP</span>
              <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_upward</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>