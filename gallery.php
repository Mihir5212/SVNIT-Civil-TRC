<?php
$activePage = 'gallery';
$pageTitle = 'Photo Gallery | TRC SVNIT Surat';
$pageDesc = 'View photographs of field surveys, road safety audit site visits, traffic laboratory testing, and academic conferences by TRC SVNIT.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Photo Gallery</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; Gallery</p>
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      <div class="chips-row" id="gallery-chips" style="margin-bottom:2rem;"></div>
      <p class="gallery-count" id="gallery-count" style="color:var(--muted);font-size:0.9rem;font-weight:600;margin-bottom:1.5rem;"></p>
      <ul class="gallery-grid" id="gallery-grid" style="list-style:none;padding:0;">
        <!-- Rendered dynamically by main.js pages.gallery() -->
      </ul>
      <div id="gallery-empty" style="text-align:center;padding:3rem 0;"></div>
    </div>
  </section>

  <!-- Photo Viewer Modal Dialog -->
  <dialog id="photo-viewer" class="photo-viewer">
    <div class="viewer-stage" id="viewer-stage">
      <img id="viewer-image" src="" alt="" class="viewer-img">
    </div>
    <div class="viewer-controls">
      <button type="button" id="viewer-prev" class="viewer-btn viewer-prev" aria-label="Previous photo"></button>
      <div class="viewer-meta">
        <figcaption id="viewer-caption" class="viewer-caption"></figcaption>
        <span id="viewer-count" class="viewer-count"></span>
      </div>
      <button type="button" id="viewer-next" class="viewer-btn viewer-next" aria-label="Next photo"></button>
    </div>
    <button type="button" id="viewer-close" class="viewer-close" aria-label="Close photo viewer">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
  </dialog>

</main>
<?php include 'includes/footer.php'; ?>
