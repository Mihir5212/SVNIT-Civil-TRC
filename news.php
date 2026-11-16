<?php
$activePage = 'news';
$pageTitle = 'Latest News & Updates | TRC SVNIT Surat';
$pageDesc = 'Stay informed on the latest announcements, seminar proceedings, and research updates from the TRC cell at SVNIT Surat.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Latest News &amp; Updates</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; News</p>
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      <ul class="news-grid" id="news-list" style="list-style:none;padding:0;">
        <!-- Rendered dynamically by main.js pages.news() -->
      </ul>
      <div id="news-empty" style="text-align:center;padding:3rem 0;"></div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
