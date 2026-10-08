import { formatDate, type HistoryEntry } from "../data";
import { StatusPill } from "./StatusPill";

/** Figma : Carte test récent. */
export function RecentTestCard({ entry }: { entry: HistoryEntry }) {
  return (
    <li className="rounded-xl border border-border p-4">
      <div className="mb-3 aspect-[4/3] w-full rounded-lg bg-muted" aria-hidden="true" />
      <StatusPill status={entry.global} />
      <p className="mt-2 truncate text-[0.875rem] font-semibold">{entry.name}</p>
      <p className="mt-0.5 truncate font-mono text-[0.8125rem] text-muted-foreground">
        {entry.channel} · {formatDate(entry.date)}
      </p>
    </li>
  );
}
