<?php
/**
 * TRC SVNIT - Footer Include
 * Custom TEP Research & Consultancy Cell Footer with images/footer image.jpg & Frosted Glass Wordmark
 */
?>
<footer class="footer" id="site-footer">
  <!-- Section 1: Background Image Stage -->
  <div class="footer__stage" aria-hidden="true">
    <img class="footer__video"
      src="images/footer%20image.jpg"
      alt="TEP SVNIT Civil Engineering Infrastructure" />
  </div>

  <!-- Giant Bottom Wordmark: Frosted Glass (Fit in One Line) -->
  <p class="footer__wordmark" aria-hidden="true">TEP Research &amp; Consultancy Cell</p>

  <!-- Mist / Fog Layer at Bottom -->
  <div class="footer__fog" aria-hidden="true"></div>

  <!-- Content Grid -->
  <div class="footer__content">
    <!-- Brand Block -->
    <div class="footer-brand">
      <a class="footer-brand__logo" href="index.php" aria-label="TEP Research &amp; Consultancy Cell home">
        <span class="footer-brand__mark-wrap">
          <img src="assets/img/svnit-logo.png" alt="SVNIT Surat" width="34" height="34" class="footer-brand__svnit-img">
          <img src="assets/img/logo-mark.svg" alt="TRC" width="30" height="30" class="footer-brand__mark-img">
        </span>
        <span class="footer-brand__name">TEP CELL &bull; SVNIT</span>
      </a>
      <h2 class="footer-brand__title">TEP Research &amp; Consultancy Cell</h2>
      <p class="footer-brand__subtitle">Department of Civil Engineering &bull; SVNIT Surat</p>
      <p class="footer-brand__text">Apex transportation engineering &amp; planning cell delivering evidence-based road safety audits, advanced traffic studies, and highway infrastructure consultancy since 2010.</p>
      
      <a class="footer-brand__cta" href="contact.php">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Discuss a Project
      </a>
      
      <p class="footer-brand__copy">&copy; <?php echo date('Y'); ?> TEP Research &amp; Consultancy Cell &bull; SVNIT Surat.</p>
    </div>

    <!-- Nav Col 1: Services -->
    <nav class="col col--menu" aria-label="Services">
      <h3 class="col__title">SERVICES</h3>
      <ul class="col__list">
        <li><a href="about.php#road-safety">Road Safety Audit</a></li>
        <li><a href="about.php#traffic-studies">Traffic Impact Studies</a></li>
        <li><a href="about.php#highway-design">Highway &amp; Pavement</a></li>
        <li><a href="about.php#its-analytics">AI &amp; ITS Analytics</a></li>
        <li><a href="about.php#traffic-studies">Speed &amp; Delay Analysis</a></li>
        <li><a href="about.php#road-safety">Blackspot Remediation</a></li>
      </ul>
    </nav>

    <!-- Nav Col 2: Research & Codes -->
    <nav class="col" aria-label="Research and Codes">
      <h3 class="col__title">RESEARCH &amp; CODES</h3>
      <ul class="col__list">
        <li><a href="publications.php">IRC:SP:88 Audit Manual</a></li>
        <li><a href="publications.php">Indo-HCM Guidelines</a></li>
        <li><a href="projects.php">Highway Safety Studies</a></li>
        <li><a href="publications.php">Research Papers</a></li>
        <li><a href="publications.php">Technical Reports</a></li>
        <li><a href="projects.php">Consultancy Projects</a></li>
      </ul>
    </nav>

    <!-- Nav Col 3: Cell Navigation -->
    <nav class="col" aria-label="Cell Navigation">
      <h3 class="col__title">QUICK LINKS</h3>
      <ul class="col__list">
        <li><a href="about.php">About TRC Cell</a></li>
        <li><a href="about.php#svnit">SVNIT Civil Dept</a></li>
        <li><a href="team.php">Faculty Advisors</a></li>
        <li><a href="projects.php">Selected Projects</a></li>
        <li><a href="gallery.php">Photo Gallery</a></li>
        <li><a href="contact.php">Contact &amp; Enquiry</a></li>
        <li><a href="privacy.php">Privacy Policy</a></li>
        <li><a href="terms.php">Terms of Condition</a></li>
      </ul>
    </nav>
  </div>
</footer>

<!-- GSAP, ScrollTrigger & Lenis Smooth Scroll -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.3.29/dist/lenis.min.js"></script>
<script src="assets/js/data.js"></script>
<script src="assets/js/main.js"></script>
<script src="assets/js/page-flip.browser.js"></script>
<script src="assets/js/animations.js"></script>
</body>
</html>