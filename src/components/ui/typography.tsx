import { cn } from "@/lib/utils";

function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 font-extrabold tracking-tight text-indigo-600 leading-tight",
        className
      )}
      style={{
        fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
      }}
    >
      {children}
    </h1>
  );
}

function TypographyH2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 font-extrabold tracking-tight text-balance text-indigo-600 leading-tight",
        className
      )}
      style={{
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      {children}
    </h2>
  );
}

function TypographyH3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-semibold tracking-tight text-violet-600",
        className
      )}
      style={{
        fontSize: "clamp(1.25rem, 3.5vw, 2rem)",
      }}
    >
      {children}
    </h3>
  );
}

function TypographyH4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "scroll-m-20 font-semibold tracking-tight text-slate-600",
        className
      )}
      style={{
        fontSize: "clamp(1rem, 3vw, 1.5rem)",
      }}
    >
      {children}
    </h4>
  );
}

function TypographyP({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "leading-normal text-slate-600",
        className
      )}
      style={{
        fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
      }}
    >
      {children}
    </p>
  );
}

const Typography = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  P: TypographyP,
};

export default Typography;
