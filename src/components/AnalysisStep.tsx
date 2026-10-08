import { Spinner } from "./Spinner";
import { StatusIcon } from "./StatusIcon";

/** Figma : Étape d'analyse. */
export function AnalysisStep({ label, state }: { label: string; state: "done" | "active" | "pending" }) {
  const done = state === "done";
  const active = state === "active";
  return (
    <li className="flex items-center gap-3 rounded-lg px-3 py-3" style={{ background: active ? "var(--color-muted)" : "transparent" }}>
      <span className="grid h-6 w-6 place-items-center">
        {done ? <StatusIcon status="ok" size={20} /> : active ? <Spinner /> : <span className="h-2 w-2 rounded-full bg-border" />}
      </span>
      <span className="text-[0.9063rem] font-medium" style={{ color: done || active ? "var(--color-foreground)" : "var(--color-muted-foreground)" }}>{label}</span>
    </li>
  );
}
