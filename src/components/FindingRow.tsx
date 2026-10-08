import type { ReportItem } from "../data";
import { STATUS } from "../status";
import { CritPill } from "./CritPill";
import { Pin } from "./Pin";
import { StatusIcon } from "./StatusIcon";
import { StatusPill } from "./StatusPill";
import { TagChip } from "./TagChip";

/** Figma : Ligne de constat (point à traiter, avec repère éventuel). */
export function FindingRow({ item, id, number, active, onPick }: { item: ReportItem; id: string; number?: number; active: boolean; onPick: (id: string) => void }) {
  return (
    <div id={`item-${id}`} className="flex scroll-mt-24 gap-3 border-b border-border px-4 py-3.5 transition-colors last:border-b-0" style={{ background: active ? STATUS[item.status].surface : undefined, boxShadow: active ? `inset 3px 0 0 ${STATUS[item.status].color}` : undefined }}>
      <span className="mt-0.5">
        {number ? (
          <button onClick={() => onPick(id)} aria-pressed={active} aria-label={`Repère ${number} : ${active ? "masquer" : "localiser"} sur le visuel`} className="rounded-full">
            <Pin number={number} status={item.status} active={active} />
          </button>
        ) : <StatusIcon status={item.status} size={19} />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <StatusPill status={item.status} />
          {item.crit && <CritPill level={item.crit} />}
          <TagChip label={item.rgaa ?? item.tag} />
          {number && <span className="font-mono text-[0.8125rem] text-muted-foreground">· repère {number}</span>}
        </div>
        <p className="mt-1.5 text-[0.875rem] font-medium leading-snug">{item.title}</p>
        {item.reco && <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Recommandation : </span>{item.reco}</p>}
      </div>
    </div>
  );
}
