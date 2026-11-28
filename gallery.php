<?php
$activePage = 'gallery';
$pageTitle = 'Photo Gallery | TRC SVNIT Surat';
$pageDesc = 'View photographs of field surveys, road safety audit site visits, traffic laboratory instrumentation, and highway corridors by TRC SVNIT.';
require_once 'includes/site-data.php';
$plates = getTRCGalleryPlates();
$galleryFilters = [
    'all' => 'All Plates',
    'corridors' => 'Highway Corridors',
    'surveys' => 'Field Surveys',
    'safety' => 'Safety Audits',
    'structures' => 'Structures & Lab',
];
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-gallery-rx-page">

  <!-- ========================================================= -->
  <!-- CENTERED EDITORIAL HERO (Matching News & Updates Theme)   -->
  <!-- ========================================================= -->
  <section class="trc-ed-hero trc-ed-hero--band">
    <div class="trc-shell trc-ed-hero-wrap">
      <span class="trc-ed-hero-pill">
        <span class="trc-ed-hero-dot" aria-hidden="true"></span>
        <span>Photo Gallery</span>
      </span>

      <h1 class="trc-ed-hero-h1">
        Field surveys &amp; infrastructure <span class="trc-ed-serif">archive.</span>
      </h1>

      <p class="trc-ed-hero-sub">
        Visual documentation from highway safety audits, UAV traffic trajectory studies, structural inspections, and laboratory testing across Gujarat.
      </p>

      <div class="trc-ed-filters" role="group" aria-label="Filter gallery by discipline" data-filter-group="gallery">
        <?php foreach ($galleryFilters as $key => $label): ?>
        <button
          type="button"
          class="trc-filter-tab trc-ed-pill-btn<?php echo $key === 'all' ? ' is-active' : ''; ?>"
          data-filter="<?php echo htmlspecialchars($key); ?>"
          aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>"
        >
          <?php echo htmlspecialchars($label); ?>
        </button>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ========================================================= -->
  <!-- PINTEREST-STYLE MASONRY GALLERY (Rounded, SVNIT Green)    -->
  <!-- ========================================================= -->
  <section id="trc-gallery-section" class="trc-rx-section trc-rx-section--gallery">
    <div class="trc-shell">
      <p class="trc-gallery-counter" id="trcGalleryCount">Showing <?php echo count($plates); ?> field &amp; infrastructure plates</p>

      <div class="trc-rx-masonry" id="trcGalleryGrid">
        <?php foreach ($plates as $idx => $p): ?>
        <article
          class="trc-gallery-card trc-rx-masonry-card"
          data-category="<?php echo htmlspecialchars($p['category']); ?>"
        >
          <button
            type="button"
            class="trc-rx-masonry-trigger"
            data-gallery-open="<?php echo $idx; ?>"
            data-src="<?php echo htmlspecialchars($p['src']); ?>"
            data-title="<?php echo htmlspecialchars($p['title']); ?>"
            data-cat="<?php echo htmlspecialchars($p['cat_label']); ?>"
            data-meta="<?php echo htmlspecialchars($p['meta']); ?>"
            data-desc="<?php echo htmlspecialchars($p['description']); ?>"
            aria-label="Inspect <?php echo htmlspecialchars($p['title']); ?>"
          >
            <div class="trc-rx-masonry-media <?php echo htmlspecialchars($p['aspect'] ?? 'aspect-4-3'); ?>">
              <img src="<?php echo htmlspecialchars($p['src']); ?>" alt="<?php echo htmlspecialchars($p['title']); ?>" loading="lazy" />
              <span class="trc-rx-plate-badge">
                <?php echo htmlspecialchars($p['badge_label']); ?>
              </span>
            </div>
            <div class="trc-rx-masonry-body">
              <h3><?php echo htmlspecialchars($p['title']); ?></h3>
              <span class="trc-rx-plate-meta"><?php echo htmlspecialchars($p['meta']); ?></span>
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
          <button type="button" class="trc-lb-btn" id="trcLbPrev" aria-label="Previous photo">
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_back</span>
            <span>PREV</span>
          </button>
          <button type="button" class="trc-lb-btn" id="trcLbNext" aria-label="Next photo">
            <span>NEXT</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </button>
          <button type="button" class="trc-lb-btn trc-lb-btn--close" id="trcLbClose" aria-label="Close lightbox">
            <span>CLOSE</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">close</span>
          </button>
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
          <div class="trc-lb-foot">TEP RESEARCH &amp; CONSULTANCY CELL &bull; SVNIT SURAT ARCHIVE</div>
        </div>
      </div>
    </div>
  </dialog>

</main>
<?php include 'includes/footer.php'; ?>
