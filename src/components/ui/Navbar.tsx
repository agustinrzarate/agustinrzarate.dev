import { useActiveSection } from "@/hooks/useActiveSection";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function Navbar() {
  const activeSection = useActiveSection();
  const showResumeButton = activeSection !== "hero";

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf8]/90 backdrop-blur-md border-b border-black/5 px-6 md:px-12 anim-nav"
    >
      <div className="max-w-300 mx-auto flex items-center justify-between h-16">
        <button
          onClick={() => scrollToSection("hero")}
          aria-label="Go to top"
          className="font-extrabold text-xl text-gray-900 tracking-tight hover:text-violet-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
        >
          az.
        </button>

        <div className="flex items-center gap-6 md:gap-8">
          {[
            { label: "About", id: "about" },
            { label: "Work", id: "work" },
            { label: "Let's talk!", id: "contact" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors hidden sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
            >
              {label}
            </button>
          ))}
          <a
            href="/resume_agustin-zarate.pdf"
            download="Agustin_Zarate_Resume.pdf"
            aria-hidden={!showResumeButton}
            tabIndex={showResumeButton ? 0 : -1}
            className={`bg-violet-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-violet-700 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 flex items-center gap-1.5 ${
              showResumeButton
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
            }`}
          >
            ↓ Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
