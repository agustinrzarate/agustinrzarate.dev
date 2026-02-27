export function Loader({ className }: { className?: string }) {
  const delays = [
    "[animation-delay:0ms]",
    "[animation-delay:150ms]",
    "[animation-delay:300ms]",
    "[animation-delay:450ms]",
    "[animation-delay:600ms]",
    "[animation-delay:750ms]",
  ];

  return (
    <div
      className={`flex items-center justify-center gap-1.5 ${className ?? ""}`}
      role="status"
      aria-label="Loading"
    >
      {delays.map((delay, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full bg-indigo-600 animate-pulse ${delay}`}
        />
      ))}
    </div>
  );
}
