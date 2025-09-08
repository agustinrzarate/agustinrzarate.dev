import Card from "../ui/Card";
import LazoAnimation from "../ui/Lazo";
import Typography from "../ui/typography";

function Work() {
  return (
    <div className="container-section py-12">
      <div className="container-content p-6 bg-white  max-w-[1248px]">
        <Typography.H2>Work</Typography.H2>
        <div className="flex-1 relative">
          <div className="absolute w-1/2 max-h-[60%]">
            <LazoAnimation />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full  mx-auto">
          {/* Fila 1 */}
          <div></div>
          <div className="flex items-center justify-center border border-indigo-500 rounded-lg p-6 font-bold">
            COMPONENTE
          </div>

          {/* Fila 2 */}
          <div className="flex items-center justify-center bg-white shadow p-6 font-bold">
            COMPONENTE
          </div>
          <div></div>

          {/* Fila 3 */}
          <div></div>
          <div className="flex items-center justify-center border border-indigo-500 rounded-lg p-6 font-bold">
            <Card />
          </div>

          {/* Fila 4 */}
          <div className="flex items-center justify-center border border-indigo-500 rounded-lg p-6 font-bold">
            <Card />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Work;
