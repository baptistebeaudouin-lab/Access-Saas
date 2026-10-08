import { useState } from "react";
import { CRITERIA } from "../data";
import { CriterionCard, Kicker, SearchField } from "../components";

/* ---------- Référentiel ---------- */

export function Referentiel() {
  const [q, setQ] = useState("");
  const shown = CRITERIA.filter((c) => (c.title + c.ref + c.theme).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="a11y-fade">
      <Kicker>Référentiel</Kicker>
      <h1 className="text-[1.875rem] font-bold tracking-tight">Critères testés par l'outil</h1>
      <SearchField id="ref-search" label="Rechercher un critère" value={q} onChange={setQ} placeholder="Rechercher un critère…" className="mt-6" />
      <p role="status" className="mt-3 text-[0.8125rem] text-muted-foreground">{shown.length} critère{shown.length > 1 ? "s" : ""}</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {shown.length === 0 && <p className="text-[0.875rem] text-muted-foreground">Aucun critère ne correspond à « {q} ».</p>}
        {shown.map((c) => (
          <CriterionCard key={c.ref + c.title} criterion={c} />
        ))}
      </div>
    </div>
  );
}
