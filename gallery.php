<?php
$activePage = 'gallery';
$pageTitle = 'Photo Gallery | TRC SVNIT Surat';
$pageDesc = 'View photographs of field surveys, road safety audit site visits, traffic laboratory instrumentation, and highway corridors by TRC SVNIT.';
require_once 'includes/site-data.php';
$plates = getTRCGalleryPlates();
$galleryFilters = [
    'all' => 'ALL PLATES (' . count($plates) . ')',
    'corridors' => 'HIGHWAY CORRIDORS',
    'surveys' => 'FIELD SURVEYS',
    'safety' => 'SAFETY AUDITS',
    'structures' => 'STRUCTURES & LAB',
];
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Field &amp; Lab Photo Archive</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; Gallery</p>
    </div>
  </div>

  <!-- Filterable Photographic Masonry / Grid -->
  <section class="section trc-gallery-section">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">FIELD &amp; INFRASTRUCTURE PLATES</span>
          <h2 class="trc-h2">Project Surveys &amp; Audit Inspections</h2>
        </div>

        <div class="trc-filter-bar" role="group" aria-label="Filter gallery by discipline" data-filter-group="gallery">
          <?php foreach ($galleryFilters as $key => $label): ?>
          <button type="button" class="trc-filter-tab<?php echo $key === 'all' ? ' is-active' : ''; ?>" data-filter="<?php echo htmlspecialchars($key); ?>" aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>">
            <?php echo htmlspecialchars($label); ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

      <p class="trc-gallery-counter" id="trcGalleryCount">Showing <?php echo count($plates); ?> field &amp; infrastructure plates</p>

      <div class="trc-gallery-grid" id="trcGalleryGrid">
        <?php foreach ($plates as $idx => $p): ?>
        <article class="trc-gallery-card" data-category="<?php echo htmlspecialchars($p['category']); ?>" data-reveal="fade-in-up">
          <button type="button"
                  class="trc-gallery-trigger"
                  data-gallery-open="<?php echo $idx; ?>"
                  data-src="<?php echo htmlspecialchars($p['src']); ?>"
                  data-title="<?php echo htmlspecialchars($p['title']); ?>"
                  data-cat="<?php echo htmlspecialchars($p['cat_label']); ?>"
                  data-meta="<?php echo htmlspecialchars($p['meta']); ?>"
                  data-desc="<?php echo htmlspecialchars($p['description']); ?>"
                  aria-label="Inspect <?php echo htmlspecialchars($p['title']); ?>">
            <div class="trc-gallery-thumb">
              <img src="<?php echo htmlspecialchars($p['src']); ?>" alt="<?php echo htmlspecialchars($p['title']); ?>" loading="lazy" />
              <span class="trc-gallery-badge"><?php echo htmlspecialchars($p['badge_label']); ?></span>
              <span class="trc-gallery-expand">EXPAND &nearr;</span>
            </div>
            <div class="trc-gallery-caption">
              <h3><?php echo htmlspecialchars($p['title']); ?></h3>
              <span><?php echo htmlspecialchars($p['meta']); ?></span>
            </div>
          </button>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Photo Viewer Lightbox Dialog -->
  <dialog id="trcPhotoLightbox" class="trc-lightbox-dialog" data-lenis-prevent aria-label="Image lightbox viewer">
    <div class="trc-lightbox-box">
      <div class="trc-lightbox-bar">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span class="trc-news-card-pill trc-news-card-pill--inline" id="trcLbCat">CATEGORY</span>
          <span class="trc-lb-counter" id="trcLbCount">1 / 12</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="trc-lb-btn" id="trcLbPrev" aria-label="Previous photo"><span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_back</span> Prev</button>
          <button type="button" class="trc-lb-btn" id="trcLbNext" aria-label="Next photo">Next <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span></button>
          <button type="button" class="trc-lb-btn trc-lb-btn--close" id="trcLbClose" aria-label="Close lightbox">Close &times;</button>
        </div>
      </div>
      <div class="trc-lightbox-content">
        <div class="trc-lightbox-stage">
          <img id="trcLbImg" src="" alt="" />
        </div>
        <div class="trc-lightbox-info">
          <span class="trc-eyebrow" id="trcLbMeta">LOCATION</span>
          <h3 id="trcLbTitle">Title</h3>
          <p id="trcLbDesc"></p>
          <div class="trc-lb-foot">TEP RESEARCH &amp; CONSULTANCY CELL &bull; SVNIT SURAT</div>
        </div>
      </div>
    </div>
  </dialog>

</main>
<?php include 'includes/footer.php'; ?>
