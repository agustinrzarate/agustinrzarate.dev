import Typography from "../ui/typography";

function About() {
  return (
    <div className="container-section bg-violet-600">
      <div className="container-content flex-1  animate-fade-in-down">
        <div className="flex flex-1 flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left space-y-8 max-w-[600px]">
            <Typography.H2 className="max-w-[210px] text-yellow-300">
              Over the years,
            </Typography.H2>
            <Typography.P className="text-white font-semibold">
              I’ve built products for companies related to the fintetch world
              such as virtual wallets and financial solutions to design and
              optimize financial products. <br /> <br />
              I also took part in Intel Partner Marketing Studio, a global
              platform for managing digital marketing resources, where I led
              significant refactors, migrated from JavaScript to TypeScript, and
              improved scalability and maintainability. <br /> <br />
              At GOIAR I being selected by my peers as one of three leaders of
              the frontend comunity. In that role, we coordinated and delivered
              internal training sessions on hexagonal architecture, clean
              architecture, frontend design patterns, and criteria for selecting
              technologies based on the context of each project. <br /> <br />
              I’m a frontend developer with a strong focus on scalability,
              performance optimization, and building maintainable solutions. My
              main stack includes React.js, Next.js, TypeScript, Tailwind, and I
              occasionally enjoy crafting UIs with FIGMA.
            </Typography.P>
          </div>
          <div className="hidden lg:block min-w-[320px]">
            <img
              src="/src/assets/about-image.png"
              alt="About image"
              style={{
                width: "clamp(300px, 20vw, 445px)",
                height: "clamp(360px, 24vw, 530px)",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
