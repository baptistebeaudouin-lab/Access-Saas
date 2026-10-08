import type { ReportCounts } from "../data";
import { CRIT, STATUS } from "../status";

/** Figma : Barre de répartition (criticités + conformes). */
export function DistributionBar({ counts }: { counts: ReportCounts }) {
  const segs = [
    { key: "bloquant", v: counts.bloquant, color: CRIT.bloquant.color, label: "Bloquant" },
    { key: "majeur", v: counts.majeur, color: CRIT.majeur.color, label: "Majeur" },
    { key: "mineur", v: counts.mineur, color: CRIT.mineur.color, label: "Mineur" },
    { key: "ok", v: counts.ok, color: STATUS.ok.color, label: "Conforme" },
  ];
  return (
    <div>
      <div className="flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full" role="img" aria-label={segs.map((s) => `${s.label} ${s.v}`).join(", ")}>
        {segs.map((s) => (s.v > 0 ? <div key={s.key} style={{ flex: s.v, background: s.color }} /> : null))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {segs.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} aria-hidden="true" />
            {s.label} <span className="font-mono font-semibold text-foreground">{s.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
