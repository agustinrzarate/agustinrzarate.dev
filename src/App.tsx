import { lazy, Suspense } from "react";
import Navbar from "./components/ui/Navbar";
import { SuspenseLoader } from "./components/ui/SuspenseLoader";
import { useActiveSection } from "./hooks/useActiveSection";

const Hero = lazy(() => import("./components/sections/Hero"));
const About = lazy(() => import("./components/sections/About"));
const Work = lazy(() => import("./components/sections/Work"));
const Contact = lazy(() => import("./components/sections/Contact"));

// Content that mounts only after lazy sections have loaded, so useActiveSection
// runs when hero/about/work/contact elements already exist in the DOM.
function AppContent() {
  const activeSection = useActiveSection();

  return (
    <>
      {/* Skip to main content — visible only on keyboard focus */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-violet-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide">
          <Hero />
          <About />
          <Work activeSection={activeSection} />
          <Contact />
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <AppContent />
    </Suspense>
  );
}

export default App;
