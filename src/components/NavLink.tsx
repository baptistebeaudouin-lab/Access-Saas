import type { ReactNode } from "react";

/** Figma : Lien de navigation (en-tête). */
export function NavLink({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className="rounded-md px-3 py-1.5 text-[0.875rem] font-medium transition-colors"
      style={{
        color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)",
        background: active ? "var(--color-muted)" : "transparent",
      }}
    >
      {children}
    </button>
  );
}
