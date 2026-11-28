<?php
$activePage = 'news';
$pageTitle = 'News & Updates | TRC SVNIT Surat';
$pageDesc = 'Field updates, research grants, Stage-III road safety audits, IRC standards, and traffic studies by TRC SVNIT Surat.';
require_once 'includes/site-data.php';
$lead = getTRCNewsLead();
$items = getTRCNewsItems();

// Map PHP news items cleanly to the editorial filter categories
$dispatchCats = [
  'safety-audit-320' => ['key' => 'safety', 'label' => 'Safety Audits'],
  'irc-pcu-adoption' => ['key' => 'irc', 'label' => 'IRC Standards'],
  'brts-pedestrian' => ['key' => 'research', 'label' => 'Research'],
  'hazira-axle-load' => ['key' => 'field', 'label' => 'Field Work'],
  'rsa-certification' => ['key' => 'safety', 'label' => 'Safety Audits'],
  'vissim-benchmark' => ['key' => 'research', 'label' => 'Research'],
];

$newsFilters = [
    'all' => 'All News',
    'research' => 'Research',
    'safety' => 'Safety Audits',
    'irc' => 'IRC Standards',
    'field' => 'Field Work',
];

// Build story lookup map for interactive editorial modal reader
$allStoriesPayload = [];
$allStoriesPayload[$lead['id']] = [
  'id' => $lead['id'],
  'cat' => 'Research',
  'date' => $lead['date'],
  'read_time' => $lead['read_time'],
  'title' => $lead['title'],
  'body' => $lead['body'],
  'bullets' => $lead['bullets'],
];
foreach ($items as $it) {
  $mapped = $dispatchCats[$it['id']] ?? ['key' => $it['category'], 'label' => $it['cat_label']];
  $allStoriesPayload[$it['id']] = [
    'id' => $it['id'],
    'cat' => $mapped['label'],
    'date' => $it['date'],
    'read_time' => $it['read_time'],
    'title' => $it['title'],
    'body' => $it['body'],
    'bullets' => $it['bullets'],
  ];
}

include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-news-stitch-page">
  <div class="trc-shell trc-news-stitch-stack">

    <!-- ========================================================= -->
    <!-- CENTERED EDITORIAL HERO                                   -->
    <!-- ========================================================= -->
    <section class="trc-ed-hero">
      <span class="trc-ed-hero-pill">
        <span class="trc-ed-hero-dot" aria-hidden="true"></span>
        <span>News &amp; Updates</span>
      </span>

      <h1 class="trc-ed-hero-h1">
        Field updates to keep highways <span class="trc-ed-serif">safer.</span>
      </h1>

      <!-- Category Filter Pills -->
      <div class="trc-ed-filters" role="group" aria-label="Filter news updates">
        <?php foreach ($newsFilters as $key => $label): ?>
        <button
          type="button"
          data-news-filter="<?php echo htmlspecialchars($key); ?>"
          class="tep-news-filter trc-ed-pill-btn<?php echo $key === 'all' ? ' is-active' : ''; ?>"
          aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>"
        >
          <?php echo htmlspecialchars($label); ?>
        </button>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- ========================================================= -->
    <!-- FEATURED EDITORIAL LEAD CARD                              -->
    <!-- ========================================================= -->
    <article class="trc-stitch-lead-card">
      <div class="trc-stitch-lead-media">
        <img src="<?php echo htmlspecialchars($lead['image']); ?>" alt="<?php echo htmlspecialchars($lead['alt']); ?>" loading="lazy" />
        <div class="trc-stitch-lead-fade" aria-hidden="true"></div>
      </div>

      <div class="trc-stitch-lead-body">
        <div class="trc-stitch-lead-copy">
          <span class="trc-stitch-cat-chip">Research</span>
          <h2><?php echo htmlspecialchars($lead['title']); ?></h2>
          <p><?php echo htmlspecialchars($lead['summary']); ?></p>
        </div>

        <div class="trc-stitch-lead-foot">
          <div class="trc-stitch-read-meta">
            <span class="trc-stitch-meta-item">
              <span class="trc-stitch-meta-dot" aria-hidden="true"></span>
              <span><?php echo htmlspecialchars(strtolower($lead['read_time'])); ?></span>
            </span>
            <span>&middot;</span>
            <span><?php echo htmlspecialchars(ucwords(strtolower($lead['date']))); ?></span>
          </div>
          <button
            type="button"
            data-story-id="<?php echo htmlspecialchars($lead['id']); ?>"
            class="tep-read-btn trc-stitch-read-link"
          >
            <span>Read Story</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </article>

    <!-- ========================================================= -->
    <!-- 3-COLUMN EDITORIAL ARTICLE GRID                           -->
    <!-- ========================================================= -->
    <section class="trc-stitch-news-grid" id="trcNewsGrid">
      <?php foreach ($items as $n): ?>
      <?php $catInfo = $dispatchCats[$n['id']] ?? ['key' => 'research', 'label' => $n['cat_label']]; ?>
      <article data-news-cat="<?php echo htmlspecialchars($catInfo['key']); ?>" class="tep-news-card trc-stitch-news-card">
        <div class="trc-stitch-news-top">
          <div class="trc-stitch-news-media">
            <img src="<?php echo htmlspecialchars($n['image']); ?>" alt="<?php echo htmlspecialchars($n['alt']); ?>" loading="lazy" />
            <div class="trc-stitch-news-img-fade" aria-hidden="true"></div>
            <span class="trc-stitch-card-badge"><?php echo htmlspecialchars($catInfo['label']); ?></span>
          </div>
          <div class="trc-stitch-news-card-copy">
            <h3><?php echo htmlspecialchars($n['title']); ?></h3>
            <p><?php echo htmlspecialchars($n['summary']); ?></p>
          </div>
        </div>

        <div class="trc-stitch-news-card-foot">
          <span class="trc-stitch-card-readtime">&bull; <?php echo htmlspecialchars(strtolower($n['read_time'])); ?></span>
          <button
            type="button"
            data-story-id="<?php echo htmlspecialchars($n['id']); ?>"
            class="tep-read-btn trc-stitch-card-btn"
          >
            <span>Read more</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </article>
      <?php endforeach; ?>
    </section>

  </div>

  <!-- ========================================================= -->
  <!-- EDITORIAL ARTICLE READER MODAL                            -->
  <!-- ========================================================= -->
  <dialog id="tep-news-modal" class="trc-stitch-modal" data-lenis-prevent aria-labelledby="tep-modal-title">
    <div class="trc-stitch-modal-box">
      <div class="trc-stitch-modal-bar">
        <span id="tep-modal-cat" class="trc-stitch-modal-cat">Research</span>
        <button id="tep-modal-close" type="button" class="trc-stitch-modal-close">
          <span>Close</span>
          <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">close</span>
        </button>
      </div>
      <div class="trc-stitch-modal-body">
        <div class="trc-stitch-modal-meta" id="tep-modal-meta">24 NOV 2026 &bull; 4 MIN READ</div>
        <h3 id="tep-modal-title">Title</h3>
        <p id="tep-modal-body"></p>
        <div class="trc-stitch-modal-takeaways">
          <div class="trc-stitch-modal-takeaways-label">Key Field Takeaways</div>
          <ul id="tep-modal-bullets"></ul>
        </div>
        <div class="trc-stitch-modal-foot">
          <a id="tep-modal-permalink" href="news-item.php" class="trc-stitch-read-link">
            <span>Open Dedicated Page</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  </dialog>

  <script id="trc-news-stories-json"
    type="application/json"><?php echo json_encode($allStoriesPayload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?></script>
</main>
<?php include 'includes/footer.php'; ?>