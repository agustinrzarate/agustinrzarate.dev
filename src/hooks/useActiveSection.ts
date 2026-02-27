import { useState, useEffect } from "react";


export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const sectionIds = ["hero", "about", "work", "contact"];

    const observerOptions = {
      root: null, 
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);

      if (visibleEntry) {
        const sectionId = visibleEntry.target.id;
        setActiveSection(sectionId);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
