import { useEffect, useRef } from "react";

export default function LazoAnimation() {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    // Estado inicial: línea oculta
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "none";

    // Dispara la animación
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 2s ease-in-out";
      path.style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <div className="min-w-full min-h-full">
      <svg
        viewBox="0 0 607 792"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="800"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M2 2.01302H597C599.667 1.84635 605 3.21302 605 10.013C605 15.9516 605 409.762 605 680.513C605 719.789 605 756.476 605 789.013"
          stroke="#7C3AED"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
