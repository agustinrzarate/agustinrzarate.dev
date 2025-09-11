import Typography from "./typography";

function Card({
  company,
}: {
  company: {
    company: string;
    projects: { name: string; description: string; technologies: string[] }[];
  };
}) {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Typography.H3 className="text-indigo-600">
            {company.company}
          </Typography.H3>
          {company.projects.map((project, index) => (
            <div key={index} className="space-y-3">
              <Typography.H4 className="text-gray-800">
                {project.name}
              </Typography.H4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
