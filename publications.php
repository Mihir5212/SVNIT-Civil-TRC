<?php
$activePage = 'publications';
$pageTitle = 'Publications & Research | TRC SVNIT Surat';
$pageDesc = 'Explore peer-reviewed journal papers, conference proceedings, technical reports, and book chapters authored by TRC, SVNIT Surat.';
require_once 'includes/site-data.php';
$publications = getTRCPublications();
$tracks = getTRCPublicationTracks();
$pubFilters = [
    'all' => 'ALL (' . count($publications) . ')',
    'journal' => 'JOURNAL ARTICLES',
    'conference' => 'CONFERENCE PAPERS',
    'report' => 'TECHNICAL REPORTS',
    'chapter' => 'BOOK CHAPTERS',
];
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Publications &amp; Research Papers</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; Publications</p>
    </div>
  </div>

  <!-- Publications Metrics Bar -->
  <section class="section trc-metrics-strip">
    <div class="trc-shell">
      <div class="trc-metrics-4col" data-reveal="fade-in-up">
        <div class="trc-metric-cell">
          <strong>120+</strong>
          <span>Peer-Reviewed Papers &amp; Reports</span>
        </div>
        <div class="trc-metric-cell">
          <strong>ASCE &bull; Elsevier</strong>
          <span>SCI / Q1 Indexed Journals</span>
        </div>
        <div class="trc-metric-cell">
          <strong>TRB &bull; WCTR</strong>
          <span>Global Research Symposia</span>
        </div>
        <div class="trc-metric-cell">
          <strong>IRC &bull; Indo-HCM</strong>
          <span>National Standard Adoption</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Filterable Publications Archive -->
  <section class="section trc-publications-section">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">SELECTED SCHOLARSHIP</span>
          <h2 class="trc-h2">Featured Publications &amp; Monographs</h2>
        </div>

        <div class="trc-filter-bar" role="group" aria-label="Filter publications by category" data-filter-group="publications">
          <?php foreach ($pubFilters as $key => $label): ?>
          <button type="button" class="trc-filter-tab<?php echo $key === 'all' ? ' is-active' : ''; ?>" data-filter="<?php echo htmlspecialchars($key); ?>" aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>">
            <?php echo htmlspecialchars($label); ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="trc-pub-grid" id="trcPubGrid">
        <?php foreach ($publications as $idx => $pub): ?>
        <article class="trc-pub-card" data-category="<?php echo htmlspecialchars($pub['category']); ?>" data-reveal="fade-in-up">
          <div class="trc-pub-media">
            <img src="<?php echo htmlspecialchars($pub['image']); ?>" alt="<?php echo htmlspecialchars($pub['alt']); ?>" loading="lazy" />
            <span class="trc-pub-badge"><?php echo htmlspecialchars($pub['badge']); ?></span>
          </div>
          <div class="trc-pub-body">
            <span class="trc-pub-scope"><?php echo htmlspecialchars($pub['scope']); ?></span>
            <h3><?php echo htmlspecialchars($pub['title']); ?></h3>
            <p class="trc-pub-authors"><strong>Authors:</strong> <?php echo htmlspecialchars($pub['authors']); ?></p>
            <p class="trc-pub-venue"><?php echo htmlspecialchars($pub['venue']); ?></p>

            <div class="trc-pub-footer">
              <span class="trc-pub-doi"><?php echo htmlspecialchars($pub['identifier']); ?></span>
              <button type="button" class="trc-pub-toggle" aria-expanded="false" data-pub-toggle>
                <span>ABSTRACT</span>
                <span class="trc-pub-toggle-plus">+</span>
              </button>
            </div>

            <div class="trc-pub-abstract" hidden>
              <p><?php echo htmlspecialchars($pub['summary']); ?></p>
            </div>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Research Archive Focus Tracks -->
  <section class="section trc-tracks-section">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">INDEXED DOMAINS</span>
          <h2 class="trc-h2">Core Research &amp; Code Contributions</h2>
        </div>
        <span class="trc-pill-badge">SVNIT TRANSPORTATION LAB</span>
      </div>

      <div class="trc-tracks-list" data-reveal="fade-in-up">
        <?php foreach ($tracks as $tr): ?>
        <div class="trc-track-row">
          <span class="trc-track-index"><?php echo htmlspecialchars($tr['index']); ?></span>
          <div class="trc-track-main">
            <h3><?php echo htmlspecialchars($tr['title']); ?></h3>
            <span class="trc-track-scope"><?php echo htmlspecialchars($tr['scope']); ?></span>
          </div>
          <p class="trc-track-desc"><?php echo htmlspecialchars($tr['description']); ?></p>
          <span class="trc-track-tags"><?php echo htmlspecialchars($tr['tags']); ?></span>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
