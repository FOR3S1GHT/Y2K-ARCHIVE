import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'

// Each section of the archive is loaded on demand, so the portal itself
// stays small and a deep link only pays for the page it opens.
const Home = lazy(() => import('./pages/Home'))
const Trends = lazy(() => import('./pages/Trends'))
const Brands = lazy(() => import('./pages/Brands'))
const Timeline = lazy(() => import('./pages/Timeline'))
const Icons = lazy(() => import('./pages/Icons'))
const Closet = lazy(() => import('./pages/Closet'))
const Culture = lazy(() => import('./pages/Culture'))
const Archive = lazy(() => import('./pages/Archive'))
const About = lazy(() => import('./pages/About'))

/** Shown only while a section module is being fetched. */
function SectionLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6"
    >
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome/70">
        <span className="size-1.5 animate-signal rounded-full bg-cyber motion-reduce:animate-none" aria-hidden="true" />
        <span>LOADING MEMORY SECTOR...</span>
      </div>
      <div className="h-px w-48 overflow-hidden bg-chrome/15">
        <div className="h-full w-1/3 animate-marquee bg-gradient-to-r from-transparent via-cyber to-transparent motion-reduce:animate-none" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <LoadingScreen />
      <Navbar />

      <div id="archive-content" className="flex-1">
        <PageTransition>
          <Suspense fallback={<SectionLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/icons" element={<Icons />} />
              <Route path="/closet" element={<Closet />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/about" element={<About />} />
              {/* Unknown paths return to the portal rather than dead-ending. */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </div>

      <Footer />
      <BackToTop />
    </div>
  )
}
