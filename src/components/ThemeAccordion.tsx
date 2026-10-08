import { useState } from "react";
import type { ReportTheme } from "../data";
import { STATUS, type Status } from "../status";
import { CountBadge } from "./CountBadge";
import { FindingRow } from "./FindingRow";
import { ChevronDownIcon } from "./icons";
import { OkRow } from "./OkRow";
import { StatusIcon } from "./StatusIcon";

/** Figma : Accordéon de thème. */
export function ThemeAccordion({ theme, open, onToggle, numbers, activeId, onPick }: { theme: ReportTheme; open: boolean; onToggle: () => void; numbers: Record<string, number>; activeId: string | null; onPick: (id: string) => void }) {
  const [okOpen, setOkOpen] = useState(false);
  const items = theme.items.map((it, i) => ({ it, id: `${theme.key}-${i}` }));
  const issues = items.filter((x) => x.it.status !== "ok");
  const conformes = items.filter((x) => x.it.status === "ok");
  const worst: Status = issues.some((x) => x.it.status === "error") ? "error" : issues.length ? "warn" : "ok";
  const panelId = `acc-${theme.key}`;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <h3>
        <button onClick={onToggle} aria-expanded={open} aria-controls={panelId} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50">
          <StatusIcon status={worst} size={19} />
          <span className="text-[0.9375rem] font-semibold">{theme.title}<span className="sr-only"> — {STATUS[worst].label}</span></span>
          <span className="ml-auto flex items-center gap-2.5">
            {issues.length > 0 ? (
              <CountBadge status={worst} count={issues.length} />
            ) : (
              <span className="hidden items-center gap-1 sm:inline-flex"><StatusIcon status="ok" size={14} /><span className="font-mono text-[0.8125rem] font-medium" style={{ color: STATUS.ok.color }}>OK</span></span>
            )}
          </span>
          <span className="text-muted-foreground transition-transform" style={{ transform: open ? "rotate(180deg)" : "none" }} aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </button>
      </h3>
      {open && (
        <div id={panelId} className="border-t border-border">
          {issues.map(({ it, id }) => (
            <FindingRow key={id} item={it} id={id} number={numbers[id]} active={activeId === id} onPick={onPick} />
          ))}
          {conformes.length > 0 && (
            <div className={issues.length ? "border-t border-border" : ""}>
              <button onClick={() => setOkOpen((v) => !v)} aria-expanded={okOpen} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[0.8125rem] transition-colors hover:bg-muted/50">
                <StatusIcon status="ok" size={16} />
                <span className="font-medium" style={{ color: STATUS.ok.color }}>{conformes.length} point{conformes.length > 1 ? "s" : ""} vérifié{conformes.length > 1 ? "s" : ""} sans anomalie</span>
                <span className="ml-1 text-muted-foreground transition-transform" style={{ transform: okOpen ? "rotate(90deg)" : "none" }} aria-hidden="true">▸</span>
              </button>
              {okOpen && (
                <ul className="px-4 pb-3">
                  {conformes.map(({ it, id }) => (
                    <OkRow key={id} item={it} />
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
