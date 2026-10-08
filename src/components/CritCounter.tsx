import type { Crit } from "../data";
import { CRIT, STATUS } from "../status";
import { StatusIcon } from "./StatusIcon";

/** Figma : Compteur de criticité. `level="warn"` = compteur « À vérifier » (icône de statut au lieu de la puce). */
export function CritCounter({ level, value }: { level: Crit | "warn"; value: number }) {
  const isWarn = level === "warn";
  const m = isWarn ? { label: "À vérifier", color: STATUS.warn.color, surface: STATUS.warn.surface } : CRIT[level];
  const on = value > 0;
  return (
    <div className="rounded-xl border px-3 py-2.5" style={{ borderColor: on ? m.color : "var(--color-border)", background: on ? m.surface : "transparent" }}>
      <div className="flex items-center gap-1.5">
        {isWarn ? (
          <StatusIcon status="warn" size={15} />
        ) : (
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: on ? m.color : "var(--color-border-interactive)" }} aria-hidden="true" />
        )}
        <span className="font-mono text-[1.25rem] font-semibold leading-none" style={{ color: on ? m.color : "var(--color-muted-foreground)" }}>{value}</span>
      </div>
      <p className="mt-1.5 text-[0.8125rem] font-medium leading-tight text-muted-foreground">{m.label}</p>
    </div>
  );
}
