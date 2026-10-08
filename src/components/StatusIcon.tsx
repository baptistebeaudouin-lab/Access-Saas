import { STATUS, type Status } from "../status";

export function StatusIcon({ status, size = 18 }: { status: Status; size?: number }) {
  const m = STATUS[status];
  return <span style={{ color: m.color, fontSize: size, lineHeight: 0, display: "inline-flex" }}>{m.icon}</span>;
}
