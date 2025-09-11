import { useState, useEffect, useRef } from "react";

interface UseScrollDetectionOptions {
  sections: string[];
}

export function useScrollDetection({ sections }: UseScrollDetectionOptions) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);
  const isManualChangeRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  console.log(activeSection);

  useEffect(() => {
    const detectActiveSection = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            return sectionId;
          }
        }
      }
      return sections[0];
    };

    const handleScroll = () => {
      // Si es un cambio manual (click en indicador), no actualizar automáticamente
      if (isManualChangeRef.current) {
        return;
      }

      // Limpiar timeout anterior
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Esperar a que termine el scroll para detectar la sección correcta
      scrollTimeoutRef.current = setTimeout(() => {
        console.log("detecting active section");
        const newActiveSection = detectActiveSection();
        setActiveSection(newActiveSection);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sections]);

  // Función para actualizar manualmente (cuando se hace clic en el indicador)
  const updateActiveSection = (sectionId: string) => {
    isManualChangeRef.current = true;
    setActiveSection(sectionId);

    // Resetear el flag después de un tiempo
    setTimeout(() => {
      isManualChangeRef.current = false;
    }, 200);
  };

  return { activeSection, setActiveSection: updateActiveSection };
}
