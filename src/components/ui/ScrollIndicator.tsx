interface Section {
  id: string;
  name: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", name: "Hero", label: "Inicio" },
  { id: "about", name: "About", label: "Sobre mí" },
  { id: "work", name: "Work", label: "Trabajos" },
  { id: "contact", name: "Contact", label: "Contacto" },
];

interface ScrollIndicatorProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

function ScrollIndicator({
  activeSection,
  onSectionChange,
}: ScrollIndicatorProps) {
  const scrollToSection = (sectionId: string) => {
    onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group relative flex items-center justify-end transition-all duration-300 ${
              activeSection === section.id
                ? "text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            aria-label={`Ir a ${section.label}`}
          >
            {/* Línea vertical */}
            <div
              className={`w-8 h-0.5 transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-indigo-600"
                  : "bg-gray-300 group-hover:bg-gray-500"
              }`}
            />

            {/* Punto indicador */}
            <div
              className={`absolute right-0 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-indigo-600 border-indigo-600 scale-125"
                  : "bg-white border-gray-300 group-hover:border-gray-500 group-hover:scale-110"
              }`}
            />

            {/* Label */}
            <span
              className={`absolute right-8 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                activeSection === section.id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScrollIndicator;
