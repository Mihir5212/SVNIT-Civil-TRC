<?php
$activePage = 'news';
$pageTitle = 'Latest News & Events | TRC SVNIT Surat';
$pageDesc = 'Stay informed on research grants, field audit milestones, IRC committee adoptions, and workshops at the TRC cell, SVNIT Surat.';
require_once 'includes/site-data.php';
$lead = getTRCNewsLead();
$items = getTRCNewsItems();
$events = getTRCNewsEvents();
$newsFilters = [
    'all' => 'ALL NEWS',
    'research' => 'RESEARCH & GRANTS',
    'field' => 'FIELD MILESTONES',
    'events' => 'EVENTS & IRC',
];
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Latest News &amp; Field Reports</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; News</p>
    </div>
  </div>

  <!-- Lead Observatory Story -->
  <section class="section trc-news-lead-section">
    <div class="trc-shell">
      <article class="trc-news-lead-card" data-reveal="fade-in-up">
        <div class="trc-news-lead-media">
          <img src="<?php echo htmlspecialchars($lead['image']); ?>" alt="<?php echo htmlspecialchars($lead['alt']); ?>" loading="lazy" />
          <span class="trc-news-badge"><?php echo htmlspecialchars($lead['cat_label']); ?></span>
        </div>
        <div class="trc-news-lead-body">
          <div class="trc-news-meta-row">
            <span><?php echo htmlspecialchars($lead['badge']); ?></span>
            <span>&bull;</span>
            <span><?php echo htmlspecialchars($lead['sponsor']); ?></span>
            <span>&bull;</span>
            <span><?php echo htmlspecialchars($lead['read_time']); ?></span>
          </div>
          <h2><?php echo htmlspecialchars($lead['title']); ?></h2>
          <p><?php echo htmlspecialchars($lead['summary']); ?></p>
          <ul class="trc-check-list">
            <?php foreach ($lead['bullets'] as $b): ?>
            <li><?php echo htmlspecialchars($b); ?></li>
            <?php endforeach; ?>
          </ul>
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;">
            <a href="news-item.php?id=<?php echo urlencode($lead['id']); ?>" class="trc-pill-green-btn">
              <span>READ FULL STORY</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- Filterable Newsroom Feed -->
  <section class="section trc-newsroom-section">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">RECENT BRIEFINGS</span>
          <h2 class="trc-h2">Newsroom &amp; Project Briefings</h2>
        </div>

        <div class="trc-filter-bar" role="group" aria-label="Filter news by category" data-filter-group="news">
          <?php foreach ($newsFilters as $key => $label): ?>
          <button type="button" class="trc-filter-tab<?php echo $key === 'all' ? ' is-active' : ''; ?>" data-filter="<?php echo htmlspecialchars($key); ?>" aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>">
            <?php echo htmlspecialchars($label); ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="trc-news-3col" id="trcNewsGrid">
        <?php foreach ($items as $n): ?>
        <article class="trc-news-card" data-category="<?php echo htmlspecialchars($n['category']); ?>" data-reveal="fade-in-up">
          <a href="news-item.php?id=<?php echo urlencode($n['id']); ?>" class="trc-news-card-img-wrap">
            <img src="<?php echo htmlspecialchars($n['image']); ?>" alt="<?php echo htmlspecialchars($n['alt']); ?>" loading="lazy" />
            <span class="trc-news-card-pill"><?php echo htmlspecialchars($n['cat_label']); ?></span>
          </a>
          <div class="trc-news-card-body">
            <div class="trc-news-meta-row">
              <span><?php echo htmlspecialchars($n['date']); ?></span>
              <span><?php echo htmlspecialchars($n['read_time']); ?></span>
            </div>
            <h3><a href="news-item.php?id=<?php echo urlencode($n['id']); ?>"><?php echo htmlspecialchars($n['title']); ?></a></h3>
            <p><?php echo htmlspecialchars($n['summary']); ?></p>
            <a href="news-item.php?id=<?php echo urlencode($n['id']); ?>" class="trc-text-arrow-link">
              <span>READ BRIEFING</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Upcoming Workshops & Symposiums -->
  <section class="section trc-events-section">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">CALENDAR</span>
          <h2 class="trc-h2">Upcoming Workshops &amp; Symposiums</h2>
        </div>
        <span class="trc-pill-badge">DEC 2026 &ndash; FEB 2027</span>
      </div>

      <div class="trc-events-3col" data-reveal="fade-in-up">
        <?php foreach ($events as $ev): ?>
        <div class="trc-event-card<?php echo !empty($ev['highlight']) ? ' is-featured' : ''; ?>">
          <div class="trc-event-top">
            <span class="trc-event-date"><?php echo htmlspecialchars($ev['date']); ?></span>
            <span class="trc-event-venue"><?php echo htmlspecialchars($ev['venue']); ?></span>
          </div>
          <h3><?php echo htmlspecialchars($ev['title']); ?></h3>
          <p><?php echo htmlspecialchars($ev['description']); ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
