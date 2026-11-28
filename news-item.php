<?php
$activePage = 'news';
require_once 'includes/site-data.php';
$stories = getTRCAllStoriesMap();
$requestedId = isset($_GET['id']) ? trim($_GET['id']) : '';
$story = isset($stories[$requestedId]) ? $stories[$requestedId] : null;

$pageTitle = $story
    ? $story['title'] . ' | TRC SVNIT Surat'
    : 'Article Not Found | TRC SVNIT Surat';
$pageDesc = $story
    ? $story['summary']
    : 'News and field reports from TEP Research & Consultancy Cell, SVNIT Surat.';

include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage">

  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title"><?php echo $story ? htmlspecialchars($story['cat_label']) : 'Article Not Found'; ?></h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; <a href="news.php">News</a> &rsaquo; Briefing</p>
    </div>
  </div>

  <section class="section">
    <div class="trc-shell" style="max-width:960px;">
      <?php if ($story): ?>
      <article class="trc-story-detail-card" data-reveal="fade-in-up">
        <div class="trc-story-top-bar">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
            <span class="trc-news-card-pill trc-news-card-pill--inline"><?php echo htmlspecialchars($story['cat_label']); ?></span>
            <span class="trc-story-meta-text"><?php echo htmlspecialchars($story['date']); ?></span>
            <?php if (!empty($story['sponsor'])): ?>
            <span class="trc-story-meta-text">&bull; <?php echo htmlspecialchars($story['sponsor']); ?></span>
            <?php endif; ?>
            <?php if (!empty($story['read_time'])): ?>
            <span class="trc-story-meta-text">&bull; <?php echo htmlspecialchars($story['read_time']); ?></span>
            <?php endif; ?>
          </div>
          <a href="news.php" class="trc-pill-outline-btn trc-pill-outline-btn--sm">&larr; All News</a>
        </div>

        <div class="trc-story-figure">
          <img src="<?php echo htmlspecialchars($story['image']); ?>" alt="<?php echo htmlspecialchars($story['alt']); ?>" />
        </div>

        <div class="trc-story-prose">
          <h2><?php echo htmlspecialchars($story['title']); ?></h2>
          <p class="trc-story-lead"><?php echo htmlspecialchars($story['summary']); ?></p>
          <p><?php echo htmlspecialchars($story['body']); ?></p>

          <?php if (!empty($story['bullets'])): ?>
          <div class="trc-takeaways-box">
            <h3>Key Field Takeaways</h3>
            <ul class="trc-check-list">
              <?php foreach ($story['bullets'] as $bullet): ?>
              <li><?php echo htmlspecialchars($bullet); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
          <?php endif; ?>

          <div class="trc-story-actions">
            <a href="news.php" class="trc-pill-outline-btn">&larr; Back to Newsroom</a>
            <a href="contact.php#enquiry-form" class="trc-pill-green-btn">Discuss This Study &rarr;</a>
          </div>
        </div>
      </article>
      <?php else: ?>
      <div class="trc-empty-card" style="text-align:center;padding:3rem;">
        <h2>Story Not Found</h2>
        <p style="margin:0.75rem 0 1.5rem;">The requested news briefing may have moved or been archived.</p>
        <a href="news.php" class="trc-pill-green-btn">&larr; Return to Newsroom</a>
      </div>
      <?php endif; ?>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
