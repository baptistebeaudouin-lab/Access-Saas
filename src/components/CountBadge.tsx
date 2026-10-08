import { STATUS, type Status } from "../status";

/** Figma : Badge compteur (« N à traiter »). */
export function CountBadge({ status, count }: { status: Status; count: number }) {
  return (
    <span className="rounded-full px-2 py-0.5 font-mono text-[0.8125rem] font-semibold" style={{ color: STATUS[status].color, background: STATUS[status].surface }}>
      {count} à traiter
    </span>
  );
}
