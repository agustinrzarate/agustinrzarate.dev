import aboutImage from "@/assets/about-image.png";
import { useInView } from "@/hooks/useInView";

const STATS = [
  { value: "5+", label: "Years experience" },
  { value: "3+", label: "Companies served" },
  { value: "2x", label: "Frontend leader" },
  { value: "∞",  label: "Coffee consumed" },
];

const PARAGRAPHS = [
  <>I've built products for companies related to the fintech world such as virtual wallets and financial solutions to design and optimize financial products.</>,
  <>I also took part in <strong className="text-white font-semibold">Intel Partner Marketing Studio</strong>, a global platform for managing digital marketing resources, where I led significant refactors, migrated from JavaScript to TypeScript, and improved scalability and maintainability.</>,
  <>At <strong className="text-white font-semibold">GOIAR</strong> I was selected by my peers as one of three leaders of the frontend community. In that role, we coordinated and delivered internal training sessions on hexagonal architecture, clean architecture, frontend design patterns, and criteria for selecting technologies based on the context of each project.</>,
  <>I'm a frontend developer with a strong focus on scalability, performance optimization, and building maintainable solutions. My main stack includes React.js, Next.js, TypeScript, Tailwind, and I occasionally enjoy crafting UIs with FIGMA.</>,
];

function About() {
  const { ref, inView } = useInView(0.1);

  return (
    <div id="about" className="container-section bg-[#1C1040] snap-start">
      <div
        ref={ref}
        className="container-content flex flex-col md:flex-row items-center gap-12 md:gap-16"
      >
        {/* Left — text */}
        <div className="flex-1 space-y-4 sm:space-y-8">
          <p
            className={`text-xs font-semibold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 ${inView ? "anim-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "100ms" }}
          >
            <span>02</span>
            <span className="inline-block w-8 h-px bg-white/30" />
            <span>ABOUT ME</span>
          </p>

          <h2
            className={`text-yellow-300 font-extrabold leading-tight ${inView ? "anim-blur-up" : "opacity-0"}`}
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", animationDelay: "200ms" }}
          >
            Over the years,
          </h2>

          <div className="space-y-3 sm:space-y-4 text-white/75 text-sm leading-relaxed">
            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className={`${i === 2 ? "hidden sm:block" : ""} ${
                  inView ? "anim-fade-left" : "opacity-0"
                }`}
                style={{ animationDelay: `${320 + i * 100}ms` }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div className=" grid-cols-2 gap-3 pt-2 hidden md:grid">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-white/5 border border-white/10 rounded-2xl p-5 ${inView ? "anim-pop" : "opacity-0"}`}
                style={{ animationDelay: `${700 + i * 120}ms` }}
              >
                <div className="text-yellow-300 font-extrabold text-3xl leading-none">{stat.value}</div>
                <div className="text-white/50 text-xs mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — illustration */}
        <div
          className={`hidden lg:flex flex-shrink-0 w-2/5 justify-end items-center ${inView ? "anim-slide-right" : "opacity-0"}`}
          style={{ animationDelay: "300ms" }}
        >
          <img
            src={aboutImage}
            alt="About illustration"
            className="rounded-2xl"
            style={{
              width: "clamp(260px, 20vw, 400px)",
              height: "clamp(320px, 24vw, 480px)",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
