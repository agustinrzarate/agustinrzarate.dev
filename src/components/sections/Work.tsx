import Card from "../ui/Card";
import LazoAnimation from "../ui/Lazo";
import Typography from "../ui/typography";
import { useState, useEffect, useMemo } from "react";

interface WorkProps {
  activeSection: string;
}

function Work({ activeSection }: WorkProps) {
  const [hasRendered, setHasRendered] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  const work = useMemo(
    () => [
      {
        id: 1,
        company: "Global Task",
        projects: [
          {
            name: "Stradegy Investment Solutions",
            description:
              "Financial solution to design and optimize financial products that meet each client’s unique requirements. Responsible for building various features for product status tracking through dynamic charts, document export, code optimization",
            technologies: ["React", "TypeScript", "Tailwind", "Next.js"],
          },
        ],
      },
      {
        id: 2,
        company: "Urbetrack",
        projects: [
          {
            name: "GiRe",
            description:
              "GiRe is a platform that allows tracking materials from the main waste generators in the City of Buenos Aires, aimed at promoting and raising awareness about recycling. Development and implementation of interfaces, unit testing, e2e testing, refactoring, and optimization of views and components. Contributed to code reviews, created project documentation, and implemented Storybook for documenting reusable components.",
            technologies: [
              "React",
              "Axios",
              "Prime React",
              "Tailwind",
              "React Testing Library",
              "Jest",
              "Playwright",
              "Storybook",
            ],
          },
        ],
      },
      {
        id: 3,
        company: "GOIAR",
        projects: [
          {
            name: "GONNECTIA",
            description:
              "Financial solution for crypto investment management (mobile application and web back office). Collaborated on the UI/UX development of the application, architecture definition, and project implementation. Performed code reviews and developed features such as cash-in, cash-out, cryptocurrency buying and selling, among others. With a focus on project reusability, I was responsible for creating a template and its corresponding documentation, supported by a theoretical explanation of the implemented architecture and patterns. Unfortunately, this project was discontinued after the market crash in 2022.",
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
            name: "INTEL PARTNER MARKETING STUDIO",
            description:
              "Intel Partner Marketing Studio is a platform that provides membership resources and marketing materials for Intel Partner Alliance. I led a refactoring and library update plan to address scalability issues and improve the maintainability of an application with over two years of development. I designed a new architecture combining Hexagonal and Clean Architecture principles, migrated from JavaScript to TypeScript, implemented linting rules (ESLint), and converted class components to functional components. I refactored layout components to reduce renderings, improving load speed, and resolved console errors that accelerated the deployment process.",
            technologies: [
              "React",
              "Axios",
              "Redux Sagas",
              "Styled Components",
              "Sass – Scss",
              "React Testing Library",
              "Jest",
              "Prime React",
            ],
          },
        ],
      },
      {
        id: 4,
        company: "GRUPO PROMINENTE",
        projects: [
          {
            name: "Yopit",
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
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (activeSection === "work" && !hasRendered) {
      setHasRendered(true);

      // Animar las cards con delay escalonado
      work.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, 800 + index * 200); // 1500ms inicial + 500ms entre cada card
      });
    }
  }, [activeSection, hasRendered, work]);

  return (
    <div
      id="work"
      className="container-section h-full  flex items-center py-12 snap-start"
    >
      <div className="container-content relative p-6 bg-white max-w-[1248px] h-full flex flex-col overflow-clip">
        <div className="flex-shrink-0 relative mb-6">
          <Typography.H2>Work</Typography.H2>
          {hasRendered && (
            <div className="absolute -bottom-1.5-0 left-0 w-1/2 max-w-1/4 hidden md:block">
              <LazoAnimation />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide z-20 flex justify-end">
          <div className="grid grid-cols-1 gap-8 pr-4 md:w-3/4 ">
            {work.map((company, index) => (
              <div
                key={index}
                className={`flex relative ${
                  visibleCards.includes(index)
                    ? "animate-fade-in-down"
                    : "opacity-0"
                }`}
              >
                {hasRendered && (
                  <div className="w-4 absolute top-4 hidden md:block">
                    <div className="h-0.5 bg-violet-600 animate-grow"></div>
                  </div>
                )}
                <div className="md:px-4">
                  <Card company={company} />
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
