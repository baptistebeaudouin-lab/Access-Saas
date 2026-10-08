import { useState } from "react";
import { countReport, formatDate, reportFor } from "../data";
import type { Status } from "../status";
import type { MapPin, Session } from "../types";
import {
  Alert,
  Button,
  DevReminders,
  EmptyState,
  FormatTabs,
  ScoreCard,
  ThemeAccordion,
  VisualMap,
  ZoomModal,
} from "../components";

/* ---------- 5. Rapport ---------- */

export function Report({ session }: { session: Session }) {
  const isCrea = session.kind === "crea";
  const isDisplay = isCrea && session.channels.includes("Bannière-Display");
  const previews = session.previews ?? {};
  const tabIds = isDisplay ? session.formats : [];
  const tabs = tabIds.length > 0 ? tabIds : null;

  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<string | null>("contrastes");
  const [active, setActive] = useState<string | null>(null);
  const [zoomOpen, setZoomOpen] = useState(false);


  const currentId = tabs ? tabs[tab] : null;
  const def = currentId ? session.formatDefs[currentId] : undefined;
  const formatSize = def ? `${def.w}×${def.h}` : undefined;
  const vignette = session.importMode === "single" ? previews.main : currentId ? previews[currentId] : previews.main ?? Object.values(previews)[0];

  const themes = reportFor({ kind: session.kind, channels: session.channels, formatSize });
  const counts = countReport(themes);
  const tone: Status = counts.error > 0 ? "error" : counts.warn > 0 ? "warn" : "ok";
  const channelLabel = isCrea ? session.channels.join(" · ") || "Créa" : "Maquette web";
  const today = formatDate(new Date().toISOString());

  let n = 0;
  const numbers: Record<string, number> = {};
  const pins: MapPin[] = [];
  themes.forEach((t) => t.items.forEach((it, i) => {
    if (it.loc && it.status !== "ok") { const id = `${t.key}-${i}`; numbers[id] = ++n; pins.push({ id, themeKey: t.key, status: it.status, loc: it.loc, n }); }
  }));

  function focusItem(themeKey: string, id: string) {
    setOpen(themeKey); setActive(id);
    setTimeout(() => document.getElementById(`item-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 70);
  }

  const [notice, setNotice] = useState("");
  async function share() {
    try { await navigator.clipboard.writeText(window.location.href); setNotice("Lien du rapport copié dans le presse-papiers."); }
    catch { setNotice("Copie impossible : copiez l'adresse depuis la barre du navigateur."); }
  }
  function selectTab(i: number) {
    setTab(i); setActive(null);
  }

  const emptyFormat = !!tabs && session.importMode === "per-format" && !vignette;

  return (
    <div className="a11y-fade">
      {/* Bandeau */}
      <Alert status="warn" className="mb-6">
        <span className="font-semibold">Pré-diagnostic indicatif.</span> Cette analyse de surface ne remplace pas un audit RGAA complet réalisé par un·e expert·e.
      </Alert>

      {/* En-tête */}
      <div className="flex flex-wrap items-center gap-4 border-b border-border pb-6">
        <div className="h-16 w-20 overflow-hidden rounded-lg border border-border bg-muted">
          {vignette && <img src={vignette} alt="Vignette du visuel testé" className="h-full w-full object-cover" />}
        </div>
        <div className="min-w-0">
          <h1 className="text-[1.5rem] font-bold tracking-tight">Rapport de conformité</h1>
          <p className="mt-0.5 font-mono text-[0.8125rem] text-muted-foreground">
            {isCrea ? "Créa digitale" : "Maquette web"} · {channelLabel} · {today}
          </p>
        </div>
        <div className="ml-auto flex gap-2 print:hidden">
          <Button onClick={share}>Partager</Button>
          <Button variant="primary" onClick={() => window.print()}>Exporter en PDF</Button>
        </div>
      </div>

      <p role="status" className="mt-2 text-right text-[0.8125rem] text-muted-foreground empty:hidden">{notice}</p>

      {/* Onglets par format */}
      {tabs && (
        <>
          <FormatTabs tabs={tabs.map((id) => ({ id, label: session.formatDefs[id]?.label ?? id }))} selected={tab} onSelect={selectTab} />
          <p className="mt-2 text-[0.8125rem] text-muted-foreground">
            Les tailles de police sont exprimées en <span className="font-semibold text-foreground">pixels réellement affichés</span>, pas en pixels du fichier.
          </p>
        </>
      )}

      <div role={tabs ? "tabpanel" : undefined} id={tabs ? `panel-${tab}` : undefined} aria-labelledby={tabs ? `tab-${tab}` : undefined} tabIndex={tabs ? 0 : undefined}>
        {emptyFormat ? (
          <EmptyState
            className="mt-8"
            title="Aucun visuel importé pour ce format"
            desc="Importez le visuel de ce format pour obtenir son rapport."
          />
        ) : (
          <>
            {/* Synthèse visuelle */}
            <section aria-labelledby="synthese-title" className="mt-6">
              <h2 id="synthese-title" className="sr-only">Synthèse de conformité</h2>
              <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <VisualMap src={vignette} pins={pins} active={active} onPick={focusItem} onExpand={() => setZoomOpen(true)} />
                <ScoreCard counts={counts} tone={tone} />
              </div>
            </section>

            {/* Détails par thème */}
            <section aria-labelledby="details-title" className="mt-8">
              <h2 id="details-title" className="sr-only">Détail des résultats par thème</h2>
              <div className="space-y-2.5">
                {themes.map((t) => (
                  <ThemeAccordion key={t.key} theme={t} open={open === t.key} onToggle={() => setOpen(open === t.key ? null : t.key)} numbers={numbers} activeId={active} onPick={(id) => setActive(active === id ? null : id)} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Rappels dev (maquette) */}
      {!isCrea && <DevReminders />}

      {zoomOpen && vignette && (
        <ZoomModal src={vignette} pins={pins} active={active} onPick={focusItem} onClose={() => setZoomOpen(false)} title={def ? def.label : channelLabel} />
      )}
    </div>
  );
}
