<?php
$activePage = 'gallery';
$pageTitle = 'Photo Gallery | TRC SVNIT Surat';
$pageDesc = 'View photographs of field surveys, road safety audit site visits, traffic laboratory instrumentation, and highway corridors by TRC SVNIT.';
require_once 'includes/site-data.php';
$plates = getTRCGalleryPlates();
$galleryFilters = [
    'all' => 'ALL PLATES',
    'corridors' => 'HIGHWAY CORRIDORS',
    'surveys' => 'FIELD SURVEYS',
    'safety' => 'SAFETY AUDITS',
    'structures' => 'STRUCTURES & LAB',
];
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-gallery-rx-page">

  <!-- ========================================================= -->
  <!-- PAGE HERO HEADER (Mirrored from React Gallery.jsx)        -->
  <!-- ========================================================= -->
  <section class="trc-rx-hero">
    <div class="trc-shell trc-rx-hero-inner">
      <div class="trc-rx-eyebrow-row">
        <span class="trc-rx-diamond" aria-hidden="true"></span>
        <span class="trc-rx-label">GALLERY &mdash; TEP &bull; SVNIT, SURAT</span>
      </div>

      <h1 class="trc-rx-hero-title">
        FIELD SURVEYS, LAB TESTING &amp; INFRASTRUCTURE ARCHIVE.
      </h1>

      <p class="trc-rx-hero-lead">
        Visual documentation from highway safety audits, UAV traffic trajectory studies, structural concrete inspections, and laboratory testing across Gujarat. Click any frame to inspect in full view.
      </p>
    </div>
  </section>

  <!-- ========================================================= -->
  <!-- PINTEREST-STYLE MASONRY GALLERY (Rounded, SVNIT Green)    -->
  <!-- ========================================================= -->
  <section id="trc-gallery-section" class="trc-rx-section trc-rx-section--gallery">
    <div class="trc-shell">
      <div class="trc-rx-sec-head trc-rx-sec-head--gallery">
        <div class="trc-rx-sec-title-wrap">
          <div class="trc-rx-eyebrow-row">
            <span class="trc-rx-diamond" aria-hidden="true"></span>
            <span class="trc-rx-label">MASONRY PLATE ARCHIVE</span>
          </div>
          <h2 class="trc-rx-sec-title">PROJECT &amp; FIELD PHOTOGRAPHY</h2>
        </div>

        <div class="trc-rx-filter-bar" role="group" aria-label="Filter gallery by discipline" data-filter-group="gallery">
          <?php foreach ($galleryFilters as $key => $label): ?>
          <button
            type="button"
            class="trc-filter-tab trc-rx-filter-btn<?php echo $key === 'all' ? ' is-active' : ''; ?>"
            data-filter="<?php echo htmlspecialchars($key); ?>"
            aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>"
          >
            <?php echo htmlspecialchars($label); ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

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
