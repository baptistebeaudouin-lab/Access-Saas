import type { Crit } from "../data";
import { CRIT } from "../status";

/** Figma : Pastille de criticité. */
export function CritPill({ level }: { level: Crit }) {
  const m = CRIT[level];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.8125rem] font-semibold"
      style={{ color: m.color, background: m.surface }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: m.color }} />
      {m.label}
    </span>
  );
}
