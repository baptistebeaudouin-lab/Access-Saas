import { useEffect, useState } from "react";
import type { Kind } from "../types";
import { AnalysisStep, Kicker } from "../components";

/* ---------- 4. Analyse en cours ---------- */

const STEPS = ["Lecture du visuel", "Analyse des contrastes", "Analyse du contenu", "Génération du rapport"];

export function Analyzing({ kind, onDone }: { kind: Kind; onDone: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= STEPS.length) { const t = setTimeout(onDone, 450); return () => clearTimeout(t); }
    const t = setTimeout(() => setStep((s) => s + 1), 750);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <div className="a11y-fade mx-auto max-w-md pt-16">
      <Kicker>Analyse en cours</Kicker>
      <h1 className="text-[1.625rem] font-bold tracking-tight">Test {kind === "crea" ? "de la créa" : "de la maquette"} en cours…</h1>
      <ol className="mt-8 space-y-1" aria-live="polite">
        {STEPS.map((label, i) => (
          <AnalysisStep key={label} label={label} state={i < step ? "done" : i === step ? "active" : "pending"} />
        ))}
      </ol>
    </div>
  );
}
