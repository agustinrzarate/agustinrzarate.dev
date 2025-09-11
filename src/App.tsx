import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import ScrollIndicator from "./components/ui/ScrollIndicator";
import { useScrollDetection } from "./hooks/useScrollDetection";
import Contact from "./components/sections/Contact";

function App() {
  const sections = ["hero", "about", "work"];
  const { activeSection, setActiveSection } = useScrollDetection({ sections });

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide">
      <ScrollIndicator
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="h-screen snap-start">
        <Hero />
      </div>
      <div className="h-screen snap-start">
        <About />
      </div>
      <div className="h-screen snap-start">
        <Work activeSection={activeSection} />
      </div>
      <div className="h-screen snap-start">
        <Contact />
      </div>
    </div>
  );
}

export default App;
