import { formatDate, type HistoryEntry } from "../data";
import { StatusPill } from "./StatusPill";

/** Figma : Ligne d'historique. */
export function HistoryRow({ entry }: { entry: HistoryEntry }) {
  return (
    <li className="flex items-center gap-4 px-4 py-3.5">
      <div className="h-11 w-14 shrink-0 rounded-md bg-muted" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.9063rem] font-semibold">{entry.name}</p>
        <p className="truncate font-mono text-[0.8125rem] text-muted-foreground">{entry.kind === "crea" ? "Créa" : "Maquette"} · {entry.channel} · {formatDate(entry.date)}</p>
      </div>
      <StatusPill status={entry.global} />
    </li>
  );
}
