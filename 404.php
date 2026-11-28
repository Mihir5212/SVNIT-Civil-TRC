<?php
$activePage = '';
$pageTitle = '404 - Page Not Found | TRC SVNIT Surat';
$pageDesc = 'The page you requested could not be found.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">
  <section class="section" style="text-align:center;min-height:65vh;display:flex;align-items:center;justify-content:center;">
    <div class="wrap narrow">
      <div style="font-size:clamp(5rem, 10vw, 8rem);font-weight:900;color:var(--concrete);line-height:1;margin-bottom:1rem;user-select:none;">404</div>
      <h1 style="color:var(--green);font-size:clamp(1.8rem, 3.5vw, 2.5rem);font-weight:800;margin-bottom:1rem;">Page Not Found</h1>
      <p style="color:var(--muted);font-size:1.1rem;max-width:540px;margin:0 auto 2.5rem;line-height:1.6;">
        The engineering resource or page you are looking for may have been updated, relocated, or temporarily unavailable.
      </p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="index.php" class="btn btn-primary btn-lg" style="display:inline-flex;align-items:center;gap:8px;">
          <span>Back to Home</span>
          <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
        </a>
        <a href="projects.php" class="btn btn-secondary btn-lg">Explore Projects</a>
        <a href="contact.php" class="btn btn-secondary btn-lg">Contact Us</a>
      </div>
    </div>
  </section>
</main>
<?php include 'includes/footer.php'; ?>
