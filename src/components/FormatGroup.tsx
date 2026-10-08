import type { ReactNode } from "react";

/** Figma : Groupe de formats (intitulé de groupe + contenu). */
export function FormatGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}
