import Typography from "../ui/typography";

function Hero() {
  return (
    <div className="container-section">
      <div className="container-content flex flex-col py-28 gap-6 animate-fade-in-down">
        <div className="flex flex-1 flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">
          <div className="max-w-[592px] text-center md:text-left">
            <Typography.H1 className="max-w-[500px] mx-auto md:mx-0">
              Frontend Developer & UX/UI Designer
            </Typography.H1>
            <Typography.H4 className="mt-4">
              I like to build solid, scalable, and fluid applications with great
              user experiences.
            </Typography.H4>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src="/src/assets/profile-background.svg"
              alt="Profile background"
              className="animate-spin-slow"
              style={{
                animation: "spin 20s linear infinite",
                width: "clamp(250px, 25vw, 480px)",
                height: "clamp(250px, 25vw, 480px)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4/5  bg-slate-200 rounded-sm px-4 py-2 rounded-br-3xl"
              style={{
                left: "10%",
                width: "clamp(160px, 15vw, 220px)",
              }}
            >
              <Typography.P className="md:max-w-[120px] font-semibold text-violet-600">
                Hey there! 👋 I'm{" "}
                <span className="text-slate-800">Agustin</span>.
              </Typography.P>
            </div>
            <img
              src="/src/assets/profile-picture.png"
              alt="Profile picture"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "clamp(150px, 20vw, 280px)",
                height: "clamp(150px, 20vw, 280px)",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <Typography.P className="max-w-[330px]">
            Experienced in guiding teams through architectural decisions to
            ensure scalable and maintainable products.
          </Typography.P>
          <Typography.P className="max-w-[330px]">
            Skilled at transforming complex requirements into simple, intuitive,
            and efficient solutions.
          </Typography.P>
        </div>
      </div>
    </div>
  );
}

export default Hero;
