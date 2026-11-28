import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Layout & smooth scroll components
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';

// Page components
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Publications from './pages/Publications';
import News from './pages/News';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

const RouteEffects = () => {
  const { pathname, hash, key } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    let scrollTimer;
    let refreshTimer;
    if (hash) {
      const targetId = hash.slice(1);
      scrollTimer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: -84 });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 60);
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px 150px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    // Failsafe: ensure anything already above/near viewport reveals immediately
    const rafId = requestAnimationFrame(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    });

    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      if (refreshTimer) clearTimeout(refreshTimer);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [pathname, hash, key, lenis]);

  return null;
};

function App() {
  return (
    <SmoothScroll>
      <BrowserRouter>
        <RouteEffects />
        <div className="min-h-screen bg-surface text-on-surface antialiased selection:bg-brand-green selection:text-on-brand-green">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="publications" element={<Publications />} />
              <Route path="news" element={<News />} />
              <Route path="team" element={<Team />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </SmoothScroll>
  );
}

export default App;
