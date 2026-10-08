import type { ReportCounts } from "../data";
import type { Status } from "../status";
import { ConformityRing } from "./ConformityRing";
import { CritCounter } from "./CritCounter";
import { DistributionBar } from "./DistributionBar";
import { StatusIcon } from "./StatusIcon";

/** Figma : Carte score. */
export function ScoreCard({ counts, tone }: { counts: ReportCounts; tone: Status }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <div className="flex items-center gap-5">
        <ConformityRing score={counts.score} tone={tone} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <StatusIcon status={tone} size={18} />
            <h3 className="text-[0.9375rem] font-semibold">{tone === "error" ? "Corrections requises" : tone === "warn" ? "Vérifications nécessaires" : "Globalement conforme"}</h3>
          </div>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{counts.total} points analysés · {counts.error + counts.warn} à traiter.</p>
          <div className="mt-3"><DistributionBar counts={counts} /></div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <CritCounter level="bloquant" value={counts.bloquant} />
        <CritCounter level="majeur" value={counts.majeur} />
        <CritCounter level="mineur" value={counts.mineur} />
        <CritCounter level="warn" value={counts.warn} />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
        <StatusIcon status="ok" size={15} /> <span className="font-medium text-foreground">{counts.ok}</span> points conformes, sans action requise.
      </p>
    </div>
  );
}
