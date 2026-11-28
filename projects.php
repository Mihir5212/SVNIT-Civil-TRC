<?php
$activePage = 'projects';
$pageTitle = 'Our Projects | TRC SVNIT Surat';
$pageDesc = 'Explore notable completed civil and transportation engineering projects, road safety audits, and traffic planning consultancy by TEP Research & Consultancy Cell, SVNIT Surat.';
require_once 'includes/projects-data.php';

$projects = getTRCProjects();
$sectors = getTRCSectors();

// Check for sector filter in query parameter
$selectedSector = isset($_GET['sector']) ? trim(strtolower($_GET['sector'])) : 'all';
if (!array_key_exists($selectedSector, $sectors)) {
    $selectedSector = 'all';
}

include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-projects-rx-page">

  <!-- Centered Editorial Hero (Matching News & Updates Theme) -->
  <section class="trc-ed-hero trc-ed-hero--band">
    <div class="trc-shell trc-ed-hero-wrap">
      <span class="trc-ed-hero-pill">
        <span class="trc-ed-hero-dot" aria-hidden="true"></span>
        <span>Project Portfolio</span>
      </span>

      <h1 class="trc-ed-hero-h1">
        Highway safety &amp; infrastructure <span class="trc-ed-serif">projects.</span>
      </h1>

      <p class="trc-ed-hero-sub">
        We believe in full ownership across all the work that we do. Explore completed road safety audits, traffic planning, and corridor studies.
      </p>

      <!-- Category Filter Pills directly inside hero matching News -->
      <nav class="trc-ed-filters" id="projectsFilterNav" aria-label="Filter Projects by Sector">
        <?php foreach ($sectors as $key => $label):
          $isActive = ($key === $selectedSector);
        ?>
          <button type="button"
                  class="projects-filter-tab trc-ed-pill-btn<?php echo $isActive ? ' is-active' : ''; ?>"
                  data-filter="<?php echo htmlspecialchars($key); ?>"
                  aria-pressed="<?php echo $isActive ? 'true' : 'false'; ?>">
            <?php echo htmlspecialchars($label); ?>
          </button>
        <?php endforeach; ?>
      </nav>
    </div>
  </section>

  <div class="projects-archive-container trc-projects-body-wrap">

    <!-- 4. 2-Column Projects Archive Grid (Matching Images 1, 2, 5) -->
    <div class="projects-archive-grid" id="projectsArchiveGrid">

      <?php foreach ($projects as $p): 
        $sectorKey = htmlspecialchars($p['sector']);
        $projectUrl = 'project.php?id=' . urlencode($p['id']);
        $isVisible = ($selectedSector === 'all' || $selectedSector === $p['sector']);
      ?>
      <article class="project-card-item<?php echo $isVisible ? '' : ' is-hidden'; ?>" 
               data-sector="<?php echo $sectorKey; ?>" 
               id="project-<?php echo $p['id']; ?>">

        <!-- Top: Photo Frame with Center Rotating Action Button (Images 3 & 4) -->
        <a href="<?php echo $projectUrl; ?>" class="project-card-media" aria-label="Explore <?php echo htmlspecialchars($p['title']); ?>">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" 
               alt="<?php echo htmlspecialchars($p['title']); ?>" 
               class="project-card-img" 
               loading="lazy" />
          
          <div class="project-card-overlay" aria-hidden="true"></div>

          <!-- Rotating Center Circular Button (Image 3 & Image 4) -->
          <div class="project-center-btn" aria-hidden="true">
            <span class="project-center-icon">
              <!-- Thin cross icon rotating from + to × on hover -->
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="16" y1="6" x2="16" y2="26"></line>
                <line x1="6" y1="16" x2="26" y2="16"></line>
              </svg>
            </span>
          </div>
        </a>

        <!-- Bottom: Card Information in 2 Columns (Image 2 & 5) -->
        <div class="project-card-info">
          <!-- Left Column: Title & Category -->
          <div class="project-card-left">
            <h2 class="project-card-title">
              <a href="<?php echo $projectUrl; ?>"><?php echo htmlspecialchars($p['title']); ?></a>
            </h2>
            <span class="project-card-category"><?php echo htmlspecialchars($p['sector_label']); ?></span>
          </div>

          <!-- Right Column: Scope Summary & Explore Link -->
          <div class="project-card-right">
            <p class="project-card-summary"><?php echo htmlspecialchars($p['summary']); ?></p>
            <a href="<?php echo $projectUrl; ?>" class="project-explore-link">
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

      <!-- Empty State (if filter has no items) -->
      <div class="projects-empty-state" id="projectsEmptyState">
        <h3>No projects found in this category</h3>
        <p>Please select another category or view all completed projects.</p>
      </div>

    </div>

  </div>
</main>

<!-- Interactive Client-side Tab Filtering Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.projects-filter-tab');
    const projectCards = document.querySelectorAll('.project-card-item');
    const emptyState = document.getElementById('projectsEmptyState');

    function applyFilter(targetSector) {
        let visibleCount = 0;

        projectCards.forEach(card => {
            const cardSector = card.getAttribute('data-sector');
            if (targetSector === 'all' || cardSector === targetSector) {
                card.classList.remove('is-hidden');
                visibleCount++;
            } else {
                card.classList.add('is-hidden');
            }
        });

        if (emptyState) {
            if (visibleCount === 0) {
                emptyState.classList.add('is-visible');
            } else {
                emptyState.classList.remove('is-visible');
            }
        }

        // Update active tab styling
        filterTabs.forEach(tab => {
            const isMatch = tab.getAttribute('data-filter') === targetSector;
            tab.classList.toggle('is-active', isMatch);
            tab.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
        });

        // Update URL query parameter without full reload
        const url = new URL(window.location);
        if (targetSector === 'all') {
            url.searchParams.delete('sector');
        } else {
            url.searchParams.set('sector', targetSector);
        }
        window.history.replaceState({}, '', url);
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const sector = this.getAttribute('data-filter');
            applyFilter(sector);
        });
    });

    // Check URL parameters on back/forward
    window.addEventListener('popstate', function() {
        const params = new URLSearchParams(window.location.search);
        const sector = params.get('sector') || 'all';
        applyFilter(sector);
    });
});
</script>

<?php include 'includes/footer.php'; ?>
