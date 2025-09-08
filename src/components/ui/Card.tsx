import Typography from "./typography";

function Card() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <Typography.H3>Global Task</Typography.H3>
          <Typography.H4>Stradegy Investment Solutions</Typography.H4>
        </div>
        <p className="text-sm font-medium text-slate-600">
          Financial solution to design and optimize financial products that meet
          each client’s unique requirements. Responsible for building various
          features for product status tracking through dynamic charts, document
          export, code optimization
        </p>
      </div>
    </div>
  );
}

export default Card;
