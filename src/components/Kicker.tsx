import type { ReactNode } from "react";

/** Sur-titre d'écran (pas de composant Figma dédié). */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </p>
  );
}
