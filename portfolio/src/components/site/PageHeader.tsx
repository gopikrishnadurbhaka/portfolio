import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string | undefined; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-navy-foreground">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-page relative py-16 md:py-24">
        <p className="kicker animate-rise text-gold-bright">{eyebrow}</p>
        <h1 className="animate-rise mt-5 max-w-4xl text-4xl font-medium leading-[1.08] md:text-6xl">{title}</h1>
        {intro && <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-navy-muted">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  titleId,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  intro?: string | undefined;
  titleId?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-3xl">
      <p className={`kicker ${tone === "dark" ? "text-gold-bright" : "text-gold-strong"}`}>{eyebrow}</p>
      <h2
        id={titleId}
        className={`mt-4 text-3xl font-medium leading-[1.12] md:text-[2.75rem] ${tone === "dark" ? "text-navy-foreground" : "text-primary"}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${tone === "dark" ? "text-navy-muted" : "text-muted-foreground"}`}>{intro}</p>
      )}
    </div>
  );
}
