import type { ReactNode } from "react";

/** Figma : Bouton icône (zoom de la cartographie). */
export function IconButton({ children, onClick, disabled, label }: { children: ReactNode; onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={label} className="grid h-7 w-7 place-items-center rounded-md border font-mono text-[0.9375rem] leading-none transition-colors hover:bg-muted disabled:opacity-35" style={{ borderColor: "var(--color-border-interactive)" }}>
      {children}
    </button>
  );
}
