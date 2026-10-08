import { useCallback, useEffect, useRef, useState } from "react";
import { SEED_FORMATS, type FormatDef } from "./data";
import type { Kind, Session, View } from "./types";
import { Header, SkipLink } from "./components";
import { Admin } from "./screens/Admin";
import { Analyzing } from "./screens/Analyzing";
import { Config } from "./screens/Config";
import { Historique } from "./screens/Historique";
import { Home } from "./screens/Home";
import { Referentiel } from "./screens/Referentiel";
import { Report } from "./screens/Report";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [session, setSession] = useState<Session | null>(null);
  const [formats, setFormats] = useState<FormatDef[]>(SEED_FORMATS);

  // Navigation : titre du document, retour en haut et focus sur le titre principal (RGAA 12.x).
  const firstRender = useRef(true);
  useEffect(() => {
    const titles: Record<View, string> = { home: "Accueil", config: "Configuration du test", analyzing: "Analyse en cours", report: "Rapport de conformité", referentiel: "Référentiel", historique: "Historique", admin: "Paramètres" };
    document.title = `${titles[view]} — A11Y Check`;
    if (firstRender.current) { firstRender.current = false; return; }
    window.scrollTo({ top: 0 });
    const h1 = document.querySelector<HTMLElement>("main h1");
    if (h1) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); }
  }, [view]);

  const go = useCallback((v: View) => setView(v), []);
  const onAnalysisDone = useCallback(() => setView("report"), []);

  function startTest(kind: Kind) {
    // Libère les aperçus du test précédent.
    if (session) Object.values(session.previews).forEach((u) => URL.revokeObjectURL(u));
    setSession({
      kind,
      channels: [], // aucun canal pré-coché
      formats: [],
      formatDefs: {},
      importMode: "per-format",
      previews: {},
      fileDims: {},
    });
    setView("config");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink href="#contenu">Aller au contenu</SkipLink>
      <Header view={view} go={go} />
      <main id="contenu" tabIndex={-1} className="mx-auto max-w-6xl px-6 pb-24 pt-10 outline-none">
        {view === "home" && <Home startTest={startTest} openHistory={() => setView("historique")} />}
        {view === "config" && session && (
          <Config session={session} formats={formats} onCancel={() => setView("home")} onLaunch={(s) => { setSession(s); setView("analyzing"); }} />
        )}
        {view === "analyzing" && session && <Analyzing kind={session.kind} onDone={onAnalysisDone} />}
        {view === "report" && session && <Report session={session} />}
        {view === "referentiel" && <Referentiel />}
        {view === "historique" && <Historique />}
        {view === "admin" && <Admin formats={formats} setFormats={setFormats} />}
      </main>
    </div>
  );
}
