import { DEV_REMINDERS } from "../data";
import { WrenchIcon } from "./icons";
import { StatusIcon } from "./StatusIcon";

/** Figma : Rappels pour le développement (maquette web). */
export function DevReminders({ items = DEV_REMINDERS }: { items?: string[] }) {
  return (
    <section aria-labelledby="dev-title" className="mt-8 rounded-xl border border-dashed border-border-interactive bg-subtle p-5">
      <div className="mb-1 flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/5 text-muted-foreground" aria-hidden="true"><WrenchIcon /></span>
        <div>
          <h2 id="dev-title" className="text-[0.9375rem] font-semibold">Rappels pour le développement</h2>
          <p className="text-[0.8125rem] text-muted-foreground">Points de vigilance à transmettre — pas des résultats de test.</p>
        </div>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((r) => (
          <li key={r} className="flex items-start gap-2 rounded-lg bg-background/70 px-2.5 py-2 text-[0.8438rem] leading-relaxed">
            <span className="mt-0.5 text-muted-foreground" aria-hidden="true"><StatusIcon status="neutral" size={16} /></span>
            <span><span className="sr-only">Non vérifiable sur un visuel : </span>{r}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
