import type { ReactNode } from "react";

/** Figma : Lien d'évitement — visible uniquement à la prise de focus. */
export function SkipLink({ href = "#contenu", children }: { href?: string; children: ReactNode }) {
  return (
    <a href={href} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-[0.875rem] focus:font-semibold focus:text-primary-foreground">
      {children}
    </a>
  );
}
