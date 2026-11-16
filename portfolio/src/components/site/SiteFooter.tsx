import { ArrowUp } from "lucide-react";

import { hasText, site } from "@/lib/content";

/**
 * Slim footer: name, tagline, optional disclaimer and copyright only.
 * The sticky header already provides navigation on every device, and the
 * Contact section right above the footer already lists email, location,
 * profiles and downloads — so repeating them here would be clutter.
 */
export function SiteFooter() {
  const { person } = site;

  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold leading-tight md:text-3xl">{person.name}</p>
          <span className="gold-rule mt-4" />
          <p className="mt-4 max-w-md text-sm text-navy-muted">{person.tagline}</p>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex w-fit items-center gap-2 text-sm text-navy-muted underline decoration-gold/60 underline-offset-4 transition-colors hover:text-navy-foreground"
        >
          <ArrowUp className="size-4 text-gold-bright" aria-hidden />
          Back to top
        </button>
      </div>
      <div className="border-t border-navy-line">
        {site.settings.disclaimer.enabled && hasText(site.settings.disclaimer.text) && <p className="container-page pt-5 text-xs leading-relaxed text-navy-muted">{site.settings.disclaimer.text}</p>}
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-navy-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {person.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-wider">{person.eyebrow}</p>
        </div>
      </div>
    </footer>
  );
}
