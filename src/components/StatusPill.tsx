import { STATUS, type Status } from "../status";
import { StatusIcon } from "./StatusIcon";

/** Figma : Pastille de statut. */
export function StatusPill({ status, label }: { status: Status; label?: string }) {
  const m = STATUS[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.8125rem] font-semibold"
      style={{ color: m.color, background: m.surface }}
    >
      <StatusIcon status={status} size={15} />
      {label ?? m.label}
    </span>
  );
}
