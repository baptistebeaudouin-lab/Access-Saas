import type { ReactNode } from "react";
import { STATUS, type Status } from "../status";
import { cx } from "./cx";
import { StatusIcon } from "./StatusIcon";

/**
 * Figma : Bandeau d'alerte.
 * `size="md"` : bandeau bordé (avertissement du rapport) ; `size="sm"` : message compact (erreurs de formulaire).
 */
export function Alert({ status, size = "md", className, children }: { status: Status; size?: "md" | "sm"; className?: string; children: ReactNode }) {
  const m = STATUS[status];
  if (size === "sm") {
    return (
      <p className={cx(className, "flex items-start gap-2 rounded-lg px-3 py-2 text-[0.8125rem]")} style={{ color: m.color, background: m.surface }}>
        <StatusIcon status={status} size={16} /> {children}
      </p>
    );
  }
  return (
    <div className={cx(className, "flex items-start gap-2.5 rounded-xl border p-3.5")} style={{ borderColor: m.color, background: m.surface }}>
      <StatusIcon status={status} />
      <p className="text-[0.8438rem] leading-relaxed" style={{ color: m.color }}>
        {children}
      </p>
    </div>
  );
}
