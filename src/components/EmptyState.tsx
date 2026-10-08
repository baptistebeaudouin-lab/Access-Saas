import type { ReactNode } from "react";
import { cx } from "./cx";
import { UploadIcon } from "./icons";

/** Figma : État vide. */
export function EmptyState({ title, desc, icon = <UploadIcon size={28} />, className }: { title: string; desc: string; icon?: ReactNode; className?: string }) {
  return (
    <div className={cx(className, "grid place-items-center rounded-2xl border border-dashed p-12 text-center")} style={{ borderColor: "var(--color-border-interactive)" }}>
      <span className="text-muted-foreground" aria-hidden="true">{icon}</span>
      <p className="mt-3 text-[0.9375rem] font-semibold">{title}</p>
      <p className="mt-1 text-[0.875rem] text-muted-foreground">{desc}</p>
    </div>
  );
}
