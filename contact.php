<?php
$activePage = 'contact';
$pageTitle = 'Contact Us | TRC SVNIT Surat';
$pageDesc = 'Get in touch with the TEP Research & Consultancy Cell at SVNIT Surat for road safety audits, traffic engineering inquiries, and research collaborations.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Contact Us</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; Contact</p>
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      
      <!-- Interactive Google Map -->
      <div class="contact-map-wrap" data-reveal="fade-in-up">
        <div id="contact-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.196901844297!2d72.78441117596827!3d21.16484398311545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423b99f85d267087!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology%2C%20Surat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            title="Map showing SVNIT Surat" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade" 
            style="width:100%;height:420px;border:0;display:block;">
          </iframe>
        </div>
      </div>

      <!-- Split Contact Cards Row -->
      <div class="contact-cards-row">
        
        <!-- Left: Direct Meet Us -->
        <div class="contact-info-card" data-reveal="fade-in-left">
          <h2>Direct Meet Us</h2>
          
          <div class="contact-info-item">
            <svg class="contact-info-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
            <div>
              <strong style="display:block;margin-bottom:0.25rem;">Address</strong>
              <div id="contact-address">
                Department of Civil Engineering,<br>
                Sardar Vallabhbhai National Institute of Technology (SVNIT),<br>
                Ichchhanath, Surat &ndash; 395007, Gujarat, India
              </div>
            </div>
          </div>

          <div class="contact-info-item">
            <svg class="contact-info-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <div>
              <strong style="display:block;margin-bottom:0.25rem;">Email</strong>
              <a href="mailto:trc@svnit.ac.in" data-email class="contact-link">trc@svnit.ac.in</a>
            </div>
          </div>

          <div class="contact-info-item">
            <svg class="contact-info-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <div>
              <strong style="display:block;margin-bottom:0.25rem;">Phone / Extension</strong>
              <a href="tel:+912612259571" data-phone class="contact-link">+91 261 2259571 &bull; Ext: 1500</a>
            </div>
          </div>

          <div class="contact-info-item">
            <svg class="contact-info-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <div>
              <strong style="display:block;margin-bottom:0.25rem;">Consultation Hours</strong>
              <span id="contact-hours">Monday &ndash; Friday: 9:30 AM &ndash; 5:30 PM</span>
            </div>
          </div>

        </div>

        <!-- Right: Quick Query Form -->
        <div class="contact-query-card" data-reveal="fade-in-right">
          <h2>Send an Enquiry</h2>
          <div id="form-status" hidden tabindex="-1"></div>
          <div id="query-feedback" class="query-feedback" style="display:none;margin-bottom:1.5rem;padding:1rem;border-radius:8px;"></div>
          
          <form id="enquiry-form" class="contact-form" action="contact-handler.php" method="POST" novalidate>
            <!-- Honeypot anti-spam field -->
            <input type="text" name="_gotcha" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">

            <div class="field">
              <label for="cf-name">Your Full Name <span style="color:var(--red);">*</span></label>
              <input type="text" id="cf-name" name="name" placeholder="Dr. / Er. / Mr. / Ms. Your Name" required autocomplete="name">
            </div>

            <div class="field">
              <label for="cf-org">Agency / Organisation</label>
              <input type="text" id="cf-org" name="organisation" placeholder="e.g. NHAI / GSRDC / Municipal Corporation / Consultancy" autocomplete="organization">
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
              <div class="field">
                <label for="cf-email">Email Address <span style="color:var(--red);">*</span></label>
                <input type="email" id="cf-email" name="email" placeholder="you@domain.com" required autocomplete="email">
              </div>
              <div class="field">
                <label for="cf-phone">Mobile / Phone</label>
                <input type="tel" id="cf-phone" name="phone" placeholder="+91 98765 43210" autocomplete="tel">
              </div>
            </div>

            <div class="field">
              <label for="cf-work">Area of Technical Work <span style="color:var(--red);">*</span></label>
              <select id="cf-work" name="work" required>
                <option value="">Choose the area of study&hellip;</option>
              </select>
            </div>

            <div class="field">
              <label for="cf-message">Project Description &amp; Requirements <span style="color:var(--red);">*</span></label>
              <textarea id="cf-message" name="message" placeholder="Describe the corridor location, engineering scope, and requested deliverables (at least 20 characters)." rows="4" required></textarea>
            </div>

            <p class="form-note" id="form-note" style="color:var(--muted);font-size:0.85rem;margin-bottom:1.25rem;"></p>
            <button type="submit" class="btn btn-primary btn-block btn-lg">Submit Enquiry &rarr;</button>
          </form>
        </div>

      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
