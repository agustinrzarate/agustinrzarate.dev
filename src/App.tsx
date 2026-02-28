import { lazy, Suspense } from "react";
import ScrollIndicator from "./components/ui/ScrollIndicator";
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

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide">
        <Hero />
        <About />
        <Work activeSection={activeSection} />
        <Contact />
      </div>
      <ScrollIndicator activeSection={activeSection} />
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
