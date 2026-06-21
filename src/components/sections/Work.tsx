import { useInView } from "@/hooks/useInView";

interface WorkProps {
  activeSection: string;
}

const WORK_ITEMS = [
  {
    years: "2025 — Current",
    company: "GOIAR",
    projectName: "Gonnectia",
    description: " Soon...",
    technologies: [],
  },

  {
    years: "2024 — 2025",
    company: "GlobalTask",
    projectName: "Stradegy Investment Solutions",
    description:
      "Financial solution to design and optimize financial products that meet each client's unique requirements. Responsible for building various features for product status tracking through dynamic charts, document export, code optimization.",
    technologies: ["React", "TypeScript", "Tailwind", "Next.js"],
  },
  {
    years: "2022 — 2023",
    company: "GOIAR",
    projectName: "Gonnectia",
    description: `At GOIAR, I had the pleasure of contributing to several projects, such as the development of digital wallets, a biometric identification processes for
Buquebus, and an Intel advertising management platform.
Additionally, I conducted technical interviews for candidates on various
projects and took part in building communities within the company, being
elected by my peers as one of the three leaders of the frontend community.


Mentoring engineers within and outside my team on best practices,
performance and advanced patterns.

Identifying gaps around the org-wide frontend infrastructure, drafting
proposals and implementing solutions that improved maintainability and
developer workflow.

Led the migration from JavaScript to TypeScript to enhance code quality
and catch bugs at compile time.

Created a full set of Figma prototypes for a fintech digital wallet,
ensuring a consistent and intuitive user experience.
- Code reviews.

`,
    technologies: [
      "React Native",
      "React JS",
      "JavaScript",
      "TypeScript",
      "Axios",
      "Redux Sagas",
      "Styled Components",
      "React Testing Library",
      "Jest",
      "Cognito",
      "Figma",
    ],
  },
  {
    years: "2021 — 2022",
    company: "Grupo Prominente",
    projectName: "Yopit",
    description:
      "Virtual wallet aimed at Argentine businesses, frontend development for web and mobile applications. Developed user authentication and token persistence (with Firebase), user language management, device linking functionality, file download manager, data filtering, form validations using regex and Formik, and mobile permission management.",
    technologies: [
      "React",
      "Axios",
      "Redux Sagas",
      "Styled Components",
      "Sass – Scss",
      "React Testing Library",
      "Jest",
      "Prime React",
      "Firebase",
    ],
  },
];

function Work() {
  const { ref, inView } = useInView(0.05);

  return (
    <div id="work" className="container-section snap-start bg-[#fafaf8]">
      <div
        ref={ref}
        className="container-content flex flex-col gap-8 overflow-y-auto scrollbar-hide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset"
        tabIndex={0}
        role="region"
        aria-label="Work experience timeline"
      >
        {/* Header */}
        <div className="flex-shrink-0 space-y-2 pt-2">
          <p
            className={`text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ${
              inView ? "anim-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            <span>03</span>
            <span className="inline-block w-8 h-px bg-gray-300" />
            <span>MY WORK</span>
          </p>
          <h2
            className={`font-extrabold text-violet-600 leading-tight ${
              inView ? "anim-blur-up" : "opacity-0"
            }`}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              animationDelay: "200ms",
            }}
          >
            My work
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative flex-1 pb-8">
          {/* Vertical line — animated grow */}
          <div
            className={`absolute top-0 bottom-0 w-0.5 ${
              inView ? "anim-line-grow" : "opacity-0"
            }`}
            style={{
              left: "calc(7rem + 5px)",
              background:
                "linear-gradient(to bottom, #6d28d9 0%, #6d28d9 60%, transparent 100%)",
              animationDelay: "400ms",
            }}
          />

          <div className="space-y-10">
            {WORK_ITEMS.map((item, i) => (
              <div
                key={item.years}
                className={`flex items-start ${
                  inView ? "anim-fade-left" : "opacity-0"
                }`}
                style={{ animationDelay: `${400 + i * 120}ms` }}
              >
                {/* Year range */}
                <div className="w-28 flex-shrink-0 text-right pr-4 pt-1">
                  <span className="text-xs text-gray-400 font-medium leading-snug whitespace-nowrap">
                    {item.years}
                  </span>
                </div>

                {/* Dot with outer ring — container stays w-3 to keep alignment with line */}
                <div className="w-3 flex-shrink-0 flex items-center justify-center mt-1 relative z-10">
                  {/* Outer ring overflows via absolute, doesn't shift layout */}
                  <div className="absolute w-5 h-5 rounded-full bg-violet-500/20 border border-violet-400/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-700 relative z-10" />
                </div>

                {/* Content card */}
                <div className="flex-1 pl-6 pb-4 group">
                  <div className="border border-gray-100 rounded-xl p-5 bg-white transition-all duration-300 ease-out group-hover:border-violet-200 group-hover:shadow-[0_4px_24px_-4px_rgba(109,40,217,0.12)] group-hover:bg-violet-50/40 group-hover:translate-y-[-2px]">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <span className="font-bold text-violet-600 text-base leading-snug">
                        {item.company}
                      </span>
                      <span className="text-amber-500 text-xs flex items-center gap-1 font-medium">
                        ✦ {item.projectName}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-violet-50 text-violet-600 border border-violet-100 text-xs px-2.5 py-1 rounded-full font-medium transition-colors duration-200 group-hover:bg-violet-100 group-hover:border-violet-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;
