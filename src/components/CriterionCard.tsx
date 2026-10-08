import type { Criterion } from "../data";
import { STATUS } from "../status";
import { StatusIcon } from "./StatusIcon";
import { TagChip } from "./TagChip";

/** Figma : Carte critère (référentiel). */
export function CriterionCard({ criterion: c }: { criterion: Criterion }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center gap-2">
        <TagChip label={c.ref} />
        <span className="text-[0.8125rem] text-muted-foreground">{c.theme}</span>
      </div>
      <p className="mt-2 text-[0.9063rem] font-semibold">{c.title}</p>
      <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{c.desc}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg p-2.5" style={{ background: STATUS.ok.surface }}>
          <div className="flex items-center gap-1.5"><StatusIcon status="ok" size={15} /><span className="text-[0.8125rem] font-semibold" style={{ color: STATUS.ok.color }}>Exemple conforme</span></div>
          <p className="mt-1 text-[0.8125rem]">{c.exampleOk}</p>
        </div>
        <div className="rounded-lg p-2.5" style={{ background: STATUS.error.surface }}>
          <div className="flex items-center gap-1.5"><StatusIcon status="error" size={15} /><span className="text-[0.8125rem] font-semibold" style={{ color: STATUS.error.color }}>Exemple non conforme</span></div>
          <p className="mt-1 text-[0.8125rem]">{c.exampleKo}</p>
        </div>
      </div>
    </div>
  );
}
