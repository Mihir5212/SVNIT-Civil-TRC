<?php
$activePage = 'projects';
$pageTitle = 'Our Projects | TRC SVNIT Surat';
$pageDesc = 'Explore completed highway safety audits, traffic engineering evaluations, DPR reviews, and smart mobility research projects by TRC SVNIT Surat.';
require_once 'includes/projects-data.php';

$allProjects = getTRCProjects();
$flagship = $allProjects[2]; // Project #2: NH-48 Blackspot Rectification & Road Safety Audit

// Remaining 9 projects form a symmetric 3x3 showcase grid
$gridProjects = [];
$categoryMap = [
    1 => 'highways',
    3 => 'traffic',
    4 => 'transit',
    5 => 'transit',
    6 => 'traffic',
    7 => 'surveying',
    8 => 'highways',
    9 => 'highways',
    10 => 'transit',
];
$categoryBadgeMap = [
    'highways' => 'Highways & Safety',
    'traffic' => 'Traffic & Infra',
    'transit' => 'Transit & ITS',
    'surveying' => 'Geodesy & Survey',
];
$filterTabs = [
    'all' => 'All Projects (' . (count($allProjects) - 1) . ')',
    'highways' => 'Highways & Safety',
    'traffic' => 'Traffic & Infra',
    'transit' => 'Transit & ITS',
    'surveying' => 'Geodesy & Survey',
];

$modalPayload = [
    'p' . $flagship['id'] => [
        'id' => $flagship['id'],
        'badge' => 'Flagship Mandate • ' . $flagship['sector_label'],
        'meta' => $flagship['client'] . ' • ' . $flagship['location'] . ' • ' . $flagship['year'],
        'title' => $flagship['title'],
        'img' => $flagship['image'],
        'summary' => $flagship['summary'],
        'outcome' => $flagship['outcomes'],
    ],
];

foreach ($allProjects as $id => $p) {
    if ($id === 2) continue;
    $catKey = $categoryMap[$id] ?? 'highways';
    $p['filter_cat'] = $catKey;
    $p['filter_badge'] = $categoryBadgeMap[$catKey] ?? $p['sector_label'];
    $gridProjects[] = $p;

    $modalPayload['p' . $id] = [
        'id' => $id,
        'badge' => $p['sector_label'],
        'meta' => $p['client'] . ' • ' . $p['location'] . ' • ' . $p['year'],
        'title' => $p['title'],
        'img' => $p['image'],
        'summary' => $p['summary'],
        'outcome' => $p['outcomes'],
    ];
}

include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-projects-stitch-page">
  <div class="trc-shell trc-projects-stitch-stack">

    <!-- ======================================================= -->
    <!-- 1. CENTERED EDITORIAL HERO + CATEGORY FILTERS           -->
    <!-- ======================================================= -->
    <section class="trc-ed-hero">
      <span class="trc-ed-hero-pill">
        <span class="trc-ed-hero-dot" aria-hidden="true"></span>
        <span>Research &amp; Consultancy Portfolio</span>
      </span>

      <h1 class="trc-ed-hero-h1 trc-pr-hero-h1">
        Corridors engineered for <span class="trc-ed-serif">safety &amp; capacity.</span>
      </h1>

      <p class="trc-ed-hero-sub">
        Selected highway safety audits, traffic impact assessments, DPR proof-checking mandates, and ITS research studies delivered for NHAI, MoRTH, R&amp;B Gujarat, and urban transit authorities.
      </p>

      <!-- Filter Pills -->
      <div id="project-filters" class="trc-ed-filters" role="group" aria-label="Filter projects by category">
        <?php foreach ($filterTabs as $key => $label): ?>
        <button
          type="button"
          data-pr-filter="<?php echo htmlspecialchars($key); ?>"
          class="trc-pr-filter trc-ed-pill-btn<?php echo $key === 'all' ? ' is-active' : ''; ?>"
          aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>"
        >
          <?php echo htmlspecialchars($label); ?>
        </button>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- ======================================================= -->
    <!-- 2. FEATURED FLAGSHIP PROJECT SHOWCASE                   -->
    <!-- ======================================================= -->
    <section aria-label="Featured Project" class="trc-pr-flagship-card">
      <div class="trc-pr-flagship-grid">
        <div class="trc-pr-flagship-media">
          <img src="<?php echo htmlspecialchars($flagship['image']); ?>" alt="<?php echo htmlspecialchars($flagship['title']); ?>" loading="eager" />
          <div class="trc-pr-flagship-scrim" aria-hidden="true"></div>
          <span class="trc-pr-flagship-badge">Flagship Mandate</span>
        </div>

        <div class="trc-pr-flagship-body">
          <div class="trc-pr-flagship-copy">
            <div class="trc-pr-meta-line">
              <span class="trc-pr-meta-accent">NHAI &bull; IRC:SP:88</span>
              <span class="trc-pr-meta-sep">&bull;</span>
              <span><?php echo htmlspecialchars($flagship['location']); ?></span>
            </div>
            <h2><?php echo htmlspecialchars($flagship['title']); ?></h2>
            <p><?php echo htmlspecialchars($flagship['summary']); ?></p>
          </div>

          <!-- Key Outcome Metrics -->
          <div class="trc-pr-flagship-stats">
            <div>
              <strong>28 km</strong>
              <span>Corridor Audited</span>
            </div>
            <div>
              <strong class="is-emerald">7</strong>
              <span>Blackspots Rectified</span>
            </div>
            <div>
              <strong>58%</strong>
              <span>Fatal Crash Drop</span>
            </div>
          </div>

          <div class="trc-pr-flagship-foot">
            <span class="trc-pr-lead-note">Client: <?php echo htmlspecialchars($flagship['client']); ?></span>
            <a href="project.php?id=<?php echo urlencode((string)$flagship['id']); ?>" class="trc-ab-cta-pill trc-pr-case-btn">
              <span>View Case Study</span>
              <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================= -->
    <!-- 3. 3-COLUMN PROJECT SHOWCASE GRID                       -->
    <!-- ======================================================= -->
    <section aria-label="Project Showcase Grid" class="trc-pr-grid-sec">
      <div class="trc-pr-grid-head">
        <h2>Selected Consultancy &amp; Research Mandates</h2>
        <span id="visible-count" class="trc-pr-count">Showing <?php echo count($gridProjects); ?> of <?php echo count($gridProjects); ?></span>
      </div>

      <div id="projects-grid" class="trc-pr-cards-grid">
        <?php foreach ($gridProjects as $p): ?>
        <article data-pr-cat="<?php echo htmlspecialchars($p['filter_cat']); ?>" class="trc-pr-card">
          <div class="trc-pr-card-top">
            <div class="trc-pr-card-media">
              <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="<?php echo htmlspecialchars($p['title']); ?>" loading="lazy" />
              <span class="trc-pr-card-badge"><?php echo htmlspecialchars($p['filter_badge']); ?></span>
            </div>
            <div class="trc-pr-card-body">
              <div class="trc-pr-card-client">
                <?php echo htmlspecialchars($p['client']); ?> &bull; <?php echo htmlspecialchars($p['year']); ?>
              </div>
              <h3><?php echo htmlspecialchars($p['title']); ?></h3>
              <p><?php echo htmlspecialchars($p['summary']); ?></p>
            </div>
          </div>

          <div class="trc-pr-card-foot">
            <span class="trc-pr-card-loc"><?php echo htmlspecialchars($p['location']); ?></span>
            <a href="project.php?id=<?php echo urlencode((string)$p['id']); ?>" class="trc-stitch-card-btn">
              <span>View Brief</span>
              <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </section>

  </div>

  <!-- ========================================================= -->
  <!-- PROJECT CASE STUDY DIALOG MODAL                           -->
  <!-- ========================================================= -->
  <dialog id="tep-project-modal" class="trc-pr-modal" data-lenis-prevent aria-labelledby="modal-project-title">
    <div class="trc-pr-modal-box">
      <div class="trc-pr-modal-hero">
        <img id="modal-project-img" src="" alt="Project preview" />
        <button id="close-project-modal" type="button" aria-label="Close project brief" class="trc-pr-modal-close">
          <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">close</span>
        </button>
        <span id="modal-project-badge" class="trc-pr-modal-badge">Safety Audits</span>
      </div>

      <div class="trc-pr-modal-body">
        <div id="modal-project-meta" class="trc-pr-modal-meta">NHAI &bull; IRC:SP:88</div>
        <h3 id="modal-project-title">Project Title</h3>
        <p id="modal-project-summary" class="trc-pr-modal-summary"></p>

        <div class="trc-pr-modal-outcome">
          <span>Key Deliverables &amp; Outcome</span>
          <p id="modal-project-outcome"></p>
        </div>

        <div class="trc-pr-modal-actions">
          <a id="modal-project-page" href="project.php" class="trc-pr-modal-link">
            <span>Full Technical Sheet</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </a>
          <a href="contact.php" class="trc-ab-cta-pill">
            <span>Request Similar Study</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  </dialog>

  <script id="trc-projects-modal-json" type="application/json"><?php echo json_encode($modalPayload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?></script>
</main>
<?php include 'includes/footer.php'; ?>