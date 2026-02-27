import { Loader } from "./Loader";
import Typography from "./typography";

export function SuspenseLoader() {
  return (
    <div
      className="flex h-dvh w-dvw min-h-dvh min-w-dvw flex-col items-center justify-center gap-6 bg-inherit"
      role="status"
      aria-label="Loading page"
    >
      <Typography.H2>AZ</Typography.H2>
      <Loader className="text-current" />
    </div>
  );
}
