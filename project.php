<?php
$activePage = 'project';
require_once 'includes/projects-data.php';

$projects = getTRCProjects();
$id = isset($_GET['id']) ? (int)$_GET['id'] : 1;

if (!isset($projects[$id])) {
    $id = 1; // default fallback
}
$p = $projects[$id];

$pageTitle = htmlspecialchars($p['title']) . ' | TRC SVNIT Surat';
$pageDesc = htmlspecialchars($p['summary']);

// Find 2 related projects
$relatedProjects = [];
foreach ($projects as $otherId => $otherProj) {
    if ($otherId !== $id) {
        $relatedProjects[] = $otherProj;
        if (count($relatedProjects) >= 2) break;
    }
}

include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="project-detail-page">
  <div class="project-detail-container">

    <!-- Breadcrumb Bar -->
    <nav class="projects-breadcrumb-bar" aria-label="Breadcrumb">
      <ul class="projects-breadcrumb-list">
        <li class="projects-breadcrumb-item"><a href="index.php">Home</a></li>
        <li class="projects-breadcrumb-sep">/</li>
        <li class="projects-breadcrumb-item"><a href="projects.php">Projects</a></li>
        <li class="projects-breadcrumb-sep">/</li>
        <li class="projects-breadcrumb-item projects-breadcrumb-cur" aria-current="page"><?php echo htmlspecialchars($p['title']); ?></li>
      </ul>
    </nav>

    <!-- Project Hero Header -->
    <header class="project-detail-hero">
      <span class="project-detail-badge"><?php echo htmlspecialchars($p['sector_label']); ?></span>
      <h1 class="project-detail-title"><?php echo htmlspecialchars($p['title']); ?></h1>
    </header>

    <!-- Project Featured Hero Banner -->
    <div class="project-detail-banner">
      <img src="<?php echo htmlspecialchars($p['image']); ?>" 
           alt="<?php echo htmlspecialchars($p['title']); ?>" />
    </div>

    <!-- Project Content Grid: Main Case Study + Sticky Sidebar -->
    <div class="project-detail-layout">

      <!-- Left Column: Comprehensive Technical Case Study -->
      <div class="project-detail-main">
        <p class="project-detail-lead"><?php echo htmlspecialchars($p['summary']); ?></p>

        <!-- Scope of Work -->
        <section class="project-detail-section">
          <h2 class="project-detail-h2">Scope of Work &amp; Investigation</h2>
          <ul class="project-scope-list">
            <?php foreach ($p['scope'] as $item): ?>
              <li>
                <span class="project-scope-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="4 10 8 14 16 6"></polyline>
                  </svg>
                </span>
                <span><?php echo htmlspecialchars($item); ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        </section>

        <!-- Methodologies & Standards Applied -->
        <section class="project-detail-section">
          <h2 class="project-detail-h2">Standards &amp; Engineering Methodology</h2>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;">
            <?php 
              $methods = explode(',', $p['methodologies']);
              foreach ($methods as $m): 
                $m = trim($m);
            ?>
              <span style="display:inline-block;background:#ffffff;border:1px solid rgba(8,69,52,0.18);padding:6px 16px;border-radius:8px;font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;color:#084534;">
                <?php echo htmlspecialchars($m); ?>
              </span>
            <?php endforeach; ?>
          </div>
        </section>

        <!-- Measurable Outcomes -->
        <section class="project-detail-section">
          <h2 class="project-detail-h2">Key Outcomes &amp; Impact</h2>
          <div class="project-outcome-box">
            <p><?php echo htmlspecialchars($p['outcomes']); ?></p>
          </div>
        </section>
      </div>

      <!-- Right Column: Sticky Project Facts & Call-to-Action -->
      <aside class="project-detail-aside">
        <div class="project-sidebar-card">
          <h2 class="project-sidebar-title">Project Factsheet</h2>
          <dl class="project-fact-group">
            <div class="project-fact-item">
              <dt>Client / Authority</dt>
              <dd><?php echo htmlspecialchars($p['client']); ?></dd>
            </div>
            <div class="project-fact-item">
              <dt>Location</dt>
              <dd><?php echo htmlspecialchars($p['location']); ?></dd>
            </div>
            <div class="project-fact-item">
              <dt>Discipline</dt>
              <dd><?php echo htmlspecialchars($p['sector_label']); ?></dd>
            </div>
            <div class="project-fact-item">
              <dt>Completion Year</dt>
              <dd><?php echo htmlspecialchars($p['year']); ?></dd>
            </div>
            <div class="project-fact-item">
              <dt>Status</dt>
              <dd>
                <span style="display:inline-block;background:#eaf4f0;color:#084534;padding:4px 12px;border-radius:50px;font-size:12px;font-weight:700;letter-spacing:0.04em;">
                  <?php echo htmlspecialchars($p['status_label']); ?>
                </span>
              </dd>
            </div>
          </dl>

          <a href="contact.php" class="project-sidebar-cta">
            <span>Discuss a Similar Project</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </aside>

    </div>

    <!-- Related Work Section with Rotating Center Buttons -->
    <?php if (!empty($relatedProjects)): ?>
    <section style="margin-top:80px;padding-top:48px;border-top:1px solid rgba(8,69,52,0.12);">
      <h2 style="font-family:'Poppins',sans-serif;font-size:32px;font-weight:600;color:#062b20;margin-bottom:32px;">Related Projects</h2>
      <div class="projects-archive-grid">
        <?php foreach ($relatedProjects as $rp): 
          $rpUrl = 'project.php?id=' . urlencode($rp['id']);
        ?>
        <article class="project-card-item">
          <a href="<?php echo $rpUrl; ?>" class="project-card-media" aria-label="Explore <?php echo htmlspecialchars($rp['title']); ?>">
            <img src="<?php echo htmlspecialchars($rp['image']); ?>" alt="<?php echo htmlspecialchars($rp['title']); ?>" class="project-card-img" loading="lazy" />
            <div class="project-card-overlay" aria-hidden="true"></div>
            <div class="project-center-btn" aria-hidden="true">
              <span class="project-center-icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="16" y1="6" x2="16" y2="26"></line>
                  <line x1="6" y1="16" x2="26" y2="16"></line>
                </svg>
              </span>
            </div>
          </a>
          <div class="project-card-info">
            <div class="project-card-left">
              <h3 class="project-card-title"><a href="<?php echo $rpUrl; ?>"><?php echo htmlspecialchars($rp['title']); ?></a></h3>
              <span class="project-card-category"><?php echo htmlspecialchars($rp['sector_label']); ?></span>
            </div>
            <div class="project-card-right">
              <p class="project-card-summary"><?php echo htmlspecialchars($rp['summary']); ?></p>
              <a href="<?php echo $rpUrl; ?>" class="project-explore-link">
                <span>EXPLORE PROJECT</span>
                <span class="project-explore-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </section>
    <?php endif; ?>

  </div>
</main>
<?php include 'includes/footer.php'; ?>
