import { STATUS, type Status } from "../status";

/** Figma : Repère (pastille numérotée sur la cartographie). */
export function Pin({ number, status, active }: { number: number; status: Status; active?: boolean }) {
  const c = STATUS[status].color;
  return (
    <span
      className="grid place-items-center rounded-full font-mono font-semibold text-primary-foreground shadow-md ring-2"
      style={{
        background: c,
        width: active ? 28 : 22,
        height: active ? 28 : 22,
        fontSize: active ? 13 : 12,
        boxShadow: active ? `0 0 0 4px ${STATUS[status].surface}` : undefined,
        ["--tw-ring-color" as string]: "var(--color-background)",
      }}
    >
      {number}
    </span>
  );
}
