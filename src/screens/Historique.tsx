import { useState } from "react";
import { HISTORY } from "../data";
import type { Status } from "../status";
import type { Kind } from "../types";
import { HistoryRow, Kicker, Select } from "../components";

/* ---------- Historique ---------- */

export function Historique() {
  const [status, setStatus] = useState<"tous" | Status>("tous");
  const [kind, setKind] = useState<"tous" | Kind>("tous");
  const [channel, setChannel] = useState("tous");
  const [period, setPeriod] = useState<"tous" | "7" | "30">("tous");
  const channels = Array.from(new Set(HISTORY.map((h) => h.channel)));
  const now = new Date();

  const filtered = HISTORY.filter((h) => {
    if (status !== "tous" && h.global !== status) return false;
    if (kind !== "tous" && h.kind !== kind) return false;
    if (channel !== "tous" && h.channel !== channel) return false;
    if (period !== "tous") {
      const days = (now.getTime() - new Date(h.date + "T00:00:00").getTime()) / 86400000;
      if (days > +period) return false;
    }
    return true;
  });

  return (
    <div className="a11y-fade">
      <Kicker>Historique</Kicker>
      <h1 className="text-[1.875rem] font-bold tracking-tight">Tests réalisés</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select label="Statut" value={status} onChange={(v) => setStatus(v as "tous" | Status)} options={[["tous", "Tous les statuts"], ["ok", "Conforme"], ["warn", "À vérifier"], ["error", "Non conforme"]]} />
        <Select label="Type de test" value={kind} onChange={(v) => setKind(v as "tous" | Kind)} options={[["tous", "Tous les types"], ["crea", "Créa"], ["maquette", "Maquette"]]} />
        <Select label="Canal" value={channel} onChange={setChannel} options={[["tous", "Tous les canaux"], ...channels.map((c) => [c, c] as [string, string])]} />
        <Select label="Période" value={period} onChange={(v) => setPeriod(v as "tous" | "7" | "30")} options={[["tous", "Toutes dates"], ["7", "7 derniers jours"], ["30", "30 derniers jours"]]} />
      </div>

      <p role="status" className="mt-5 text-[0.8125rem] text-muted-foreground">{filtered.length} test{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}</p>
      <ul className="mt-2 divide-y divide-border rounded-xl border border-border">
        {filtered.map((h) => (
          <HistoryRow key={h.name} entry={h} />
        ))}
        {filtered.length === 0 && <li className="px-4 py-8 text-center text-[0.875rem] text-muted-foreground">Aucun test pour ces filtres.</li>}
      </ul>
    </div>
  );
}
