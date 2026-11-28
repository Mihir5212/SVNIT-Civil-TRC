<?php
$activePage = 'contact';
$pageTitle = 'Contact Us | TRC SVNIT Surat';
$pageDesc = 'Get in touch with the TEP Research & Consultancy Cell at SVNIT Surat for road safety audits, traffic engineering inquiries, and research collaborations.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-contact-stitch-page">
  <section class="trc-stitch-contact-wrap">
    <div class="trc-shell">
      <div class="trc-stitch-contact-card">
        <div class="trc-stitch-contact-grid">

          <!-- ========================================================= -->
          <!-- LEFT COLUMN: DIRECT CHANNELS + LIVE SVNIT LOCATION MAP    -->
          <!-- ========================================================= -->
          <div class="trc-stitch-left">
            <div class="trc-stitch-head">
              <span class="trc-stitch-eyebrow">
                CONTACT US &mdash; TEP &bull; SVNIT, SURAT
              </span>
              <h1>
                Initiate a consultation or laboratory inquiry.
              </h1>
            </div>

            <!-- 3 Direct Channels -->
            <div class="trc-stitch-channels">
              <!-- 01 Laboratory HQ -->
              <div class="trc-stitch-ch-item">
                <div class="trc-stitch-ch-icon">
                  <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
                </div>
                <div class="trc-stitch-ch-copy">
                  <div class="trc-stitch-ch-title">01 &bull; Transportation Engineering Lab (DoCE)</div>
                  <p id="contact-address">
                    Dept. of Civil Engineering, SVNIT Campus, Ichchhanath, Dumas Road, Surat &mdash; 395007, Gujarat.
                  </p>
                </div>
              </div>

              <!-- 02 Consultancy Desk -->
              <div class="trc-stitch-ch-item">
                <div class="trc-stitch-ch-icon">
                  <span class="material-symbols-outlined" aria-hidden="true">mail</span>
                </div>
                <div class="trc-stitch-ch-copy">
                  <div class="trc-stitch-ch-title">02 &bull; Consultancy Desk</div>
                  <p class="trc-stitch-ch-strong">
                    <a href="mailto:trc@svnit.ac.in" data-email>trc@svnit.ac.in</a> &bull;
                    <a href="mailto:tep-consultancy@ced.svnit.ac.in">tep-consultancy@ced.svnit.ac.in</a>
                  </p>
                  <p>Direct Phone: <a href="tel:+912612259571" data-phone>+91 261 225 9571</a> &bull; Ext. 1500</p>
                </div>
              </div>

              <!-- 03 Material QA/QC Lab -->
              <div class="trc-stitch-ch-item">
                <div class="trc-stitch-ch-icon">
                  <span class="material-symbols-outlined" aria-hidden="true">science</span>
                </div>
                <div class="trc-stitch-ch-copy">
                  <div class="trc-stitch-ch-title">03 &bull; Highway Materials &amp; Bitumen Lab</div>
                  <p>
                    Sample drop-off &amp; cube, core &amp; bitumen testing: Mon&ndash;Fri, 10:00&ndash;16:30 IST.
                  </p>
                </div>
              </div>
            </div>

            <!-- Compact Live SVNIT Location Map (Google Map Embed) -->
            <div class="trc-stitch-map-box" id="svnit-map">
              <div class="trc-stitch-map-head">
                <div class="trc-stitch-map-status">
                  <span class="trc-stitch-map-dot" aria-hidden="true"></span>
                  <span>SVNIT SURAT &bull; LIVE LOCATION</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Sardar+Vallabhbhai+National+Institute+of+Technology+Surat"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="trc-stitch-map-link"
                >
                  <span>OPEN IN MAPS</span>
                  <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">open_in_new</span>
                </a>
              </div>

              <div class="trc-stitch-map-stage" id="contact-map">
                <iframe
                  title="Map showing SVNIT Surat"
                  loading="lazy"
                  referrerpolicy="strict-origin-when-cross-origin"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14882.454124282574!2d72.788812!3d21.167773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423b99085d26d1f9!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1795792525775!5m2!1sen!2sin"
                  allowfullscreen
                ></iframe>
                <div class="trc-stitch-map-coords">
                  <span>21.1663&deg; N, 72.7833&deg; E</span>
                  <span>ICHCHHANATH &bull; SURAT 395007</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- RIGHT COLUMN: SVNIT DEEP EMERALD TECHNICAL BRIEFING FORM  -->
          <!-- ========================================================= -->
          <div class="trc-stitch-right" id="enquiry-form-card">
            <div class="trc-stitch-form-head">
              <span class="trc-stitch-form-eyebrow">TECHNICAL BRIEFING</span>
              <h2>Request a Proposal or Lab Test</h2>
              <p>
                Reach our faculty and project engineers for traffic studies, IRC:SP:88 road safety audits, DPR proof checking, and laboratory material testing.
              </p>
            </div>

            <div id="form-status" hidden tabindex="-1"></div>
            <div id="query-feedback" class="query-feedback trc-stitch-feedback" style="display:none;"></div>

            <form id="enquiry-form" class="trc-stitch-form" action="contact-handler.php" method="POST" novalidate>
              <!-- Honeypot anti-spam field -->
              <input type="text" name="_gotcha" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">

              <!-- Scope Selector Dropdown -->
              <div class="trc-stitch-field">
                <label for="cf-work">Select Consultancy Scope *</label>
                <select id="cf-work" name="work" required>
                  <option value="traffic-studies">Traffic Survey &amp; Field Studies</option>
                  <option value="road-safety">Road Safety Audit (IRC:SP:88)</option>
                  <option value="independent-review">DPR Proof Check &amp; Validation</option>
                  <option value="material-testing">Material &amp; Bitumen Lab Testing</option>
                  <option value="traffic-impact">Traffic Impact Assessment (TIA)</option>
                  <option value="junction-design">Junction &amp; Geometric Design</option>
                  <option value="transport-planning">Corridor &amp; Transport Planning</option>
                  <option value="training">Research Collaboration &amp; Training</option>
                </select>
              </div>

              <div class="trc-stitch-row">
                <div class="trc-stitch-field">
                  <label for="cf-name">Full Name *</label>
                  <input id="cf-name" name="name" type="text" required placeholder="Rajesh Patel" autocomplete="name">
                </div>
                <div class="trc-stitch-field">
                  <label for="cf-org">Organization / Agency *</label>
                  <input id="cf-org" name="organisation" type="text" required placeholder="Gujarat R&amp;B / NHAI / EPC" autocomplete="organization">
                </div>
              </div>

              <div class="trc-stitch-row">
                <div class="trc-stitch-field">
                  <label for="cf-email">Official Email *</label>
                  <input id="cf-email" name="email" type="email" required placeholder="engineer@agency.gov.in" autocomplete="email">
                </div>
                <div class="trc-stitch-field">
                  <label for="cf-phone">Phone Number</label>
                  <input id="cf-phone" name="phone" type="tel" placeholder="+91 261 225 9571" autocomplete="tel">
                </div>
              </div>

              <div class="trc-stitch-field">
                <label for="cf-corridor">Corridor / Project Location</label>
                <input id="cf-corridor" name="corridor" type="text" placeholder="e.g., NH-48 Bharuch&ndash;Surat Section (KM 198 to KM 264)">
              </div>

              <div class="trc-stitch-field">
                <label id="trc-scope-label" for="cf-message">
                  Scope &amp; Deliverable Requirements (Traffic Survey &amp; Field Studies) *
                </label>
                <textarea id="cf-message" name="message" rows="3" required placeholder="Describe survey duration, IRC standard (IRC:SP:88 / Indo-HCM), or laboratory testing batch volume..."></textarea>
              </div>

              <p class="form-note" id="form-note" style="color:rgba(209,250,229,0.78);font-size:12px;margin:0;"></p>

              <div class="trc-stitch-actions">
                <button type="submit" class="trc-stitch-submit-btn">
                  <span>Submit Technical Inquiry</span>
                  <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
                </button>
                <span class="trc-stitch-hours-note">
                  Response within 24 business hours
                </span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
</main>
<?php include 'includes/footer.php'; ?>