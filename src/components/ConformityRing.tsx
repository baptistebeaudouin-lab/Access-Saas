import { STATUS, type Status } from "../status";

/** Figma : Anneau de conformité. */
export function ConformityRing({ score, tone }: { score: number; tone: Status }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = STATUS[tone].color;
  return (
    <div className="relative grid place-items-center" style={{ width: 132, height: 132 }} role="img" aria-label={`Score de conformité ${score}%`}>
      <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90" aria-hidden="true">
        <circle cx="66" cy="66" r={r} fill="none" stroke="var(--color-muted)" strokeWidth="12" />
        <circle cx="66" cy="66" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} style={{ transition: "stroke-dasharray 0.6s ease" }} />
      </svg>
      <div className="absolute text-center">
        <div className="font-mono text-[1.875rem] font-semibold leading-none" style={{ color }}>{score}<span className="text-[0.9375rem]">%</span></div>
        <div className="mt-1 text-[0.8125rem] font-medium text-muted-foreground">conforme</div>
      </div>
    </div>
  );
}
