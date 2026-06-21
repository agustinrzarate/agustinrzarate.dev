import profilePicture from "@/assets/profile-picture.png";

const TECH_TAGS = [
  "React.js",
  "React Native",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Figma",
  "Node.js",
];
const scrollToSection = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const D = (ms: number): React.CSSProperties => ({ animationDelay: `${ms}ms` });

function Hero() {
  return (
    <div id="hero" className="container-section snap-start bg-[#fafaf8] pt-16">
      <div className="container-content flex flex-col justify-center gap-8">
        {/* Badge */}
        <div className="anim-blur-up" style={D(200)}>
          <span className="inline-flex items-center gap-2 bg-white/70 border border-black/10 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700">
            👋 Hey there! I'm Agustín
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* Left — text */}
          <div className="space-y-6 max-w-xl">
            <h1
              className="leading-none font-extrabold"
              style={{ fontSize: "clamp(2.5rem, 9vw, 6.5rem)" }}
            >
              <span className="block text-gray-900 anim-blur-up" style={D(350)}>
                Agustín
              </span>
              <span
                className="block text-violet-600 anim-blur-up"
                style={D(480)}
              >
                Zarate.
              </span>
            </h1>

            <p
              className="text-base font-semibold text-gray-800 anim-fade-up"
              style={D(600)}
            >
              <span className="bg-yellow-300 px-1 rounded-sm">
                Frontend engineer
              </span>{" "}
              & UX/UI developer
            </p>

            <p
              className="text-gray-600 leading-relaxed text-base anim-fade-up"
              style={D(700)}
            >
              I like to build solid, scalable, and fluid applications with great
              user experiences.
            </p>
            <p
              className="text-gray-600 text-sm leading-relaxed anim-fade-up"
              style={D(780)}
            >
              Experienced in guiding teams through architectural decisions to
              ensure scalable and maintainable products.
            </p>
            <p
              className="text-gray-600 text-sm leading-relaxed anim-fade-up"
              style={D(840)}
            >
              Skilled at transforming complex requirements into simple,
              intuitive, and efficient solutions.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-wrap gap-3 pt-2 anim-fade-up"
              style={D(960)}
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-violet-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-violet-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                Contact with me ↗
              </button>
              <a
                href="/resume_agustin-zarate.pdf"
                download="Agustin_Zarate_Resume.pdf"
                className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                ↓ Download resume
              </a>
            </div>

            {/* Status */}
            <p
              className="text-xs text-gray-500 flex items-center gap-4 pt-1 anim-fade-up"
              style={D(1080)}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"
                  aria-hidden="true"
                />
                Open to new opportunities
              </span>
              <span>
                <span aria-hidden="true">📍 </span>
                <span className="sr-only">Location: </span>
                Córdoba, AR
              </span>
            </p>
          </div>

          {/* Right — photo (hidden on mobile) */}
          <div
            className="hidden md:flex flex-shrink-0 flex-col items-center gap-6 anim-slide-right"
            style={D(500)}
          >
            {/* Dot-pattern + photo wrapper */}
            <div className="relative flex items-center justify-center" style={{ padding: "28px" }}>
              {/* CSS dot pattern background */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: "radial-gradient(circle, #c4c9d4 1.5px, transparent 1.5px)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Years badge — top-left */}
              <div
                className="absolute top-0 left-0 bg-violet-600 text-white rounded-2xl px-4 py-2.5 text-center z-10 shadow-lg anim-pop"
                style={D(900)}
                aria-label="More than 6 years of experience"
              >
                <div className="text-2xl font-extrabold leading-none">5+</div>
                <div className="text-xs font-medium text-violet-100">Years</div>
              </div>

              {/* Circle photo — floating */}
              <div
                className="rounded-full border-[5px] border-violet-500 overflow-hidden anim-float relative z-0"
                style={{
                  width: "clamp(220px, 22vw, 300px)",
                  height: "clamp(220px, 22vw, 300px)",
                }}
              >
                <img
                  src={profilePicture}
                  alt="Agustín Zarate, Frontend Engineer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Tech tags — 2 rows of 4 */}
            <div
              className="flex flex-wrap justify-center gap-2"
              style={{ width: "clamp(320px, 28vw, 420px)" }}
              aria-label="Technologies"
            >
              {TECH_TAGS.map((tech, i) => (
                <span
                  key={tech}
                  className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium anim-fade-up whitespace-nowrap"
                  style={D(900 + i * 60)}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
