import type { ReactNode } from "react";
import { cx } from "./cx";

/** Figma : Bouton principal (pleine largeur). */
export function CtaButton({ disabled, onClick, className, children }: { disabled?: boolean; onClick: () => void; className?: string; children: ReactNode }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cx(className, "w-full rounded-xl bg-primary py-3 text-[0.9375rem] font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-35")}
    >
      {children}
    </button>
  );
}
