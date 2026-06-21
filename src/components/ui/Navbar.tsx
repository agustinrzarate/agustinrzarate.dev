const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf8]/90 backdrop-blur-md border-b border-black/5 px-6 md:px-12 anim-nav"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16">
        <button
          onClick={() => scrollToSection("hero")}
          aria-label="Go to top"
          className="font-extrabold text-xl text-gray-900 tracking-tight hover:text-violet-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
        >
          az.
        </button>

        <div className="flex items-center gap-6 md:gap-8">
          {[
            { label: "Work", id: "work" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors hidden sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-violet-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-violet-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          >
            Say hello
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
