import { HISTORY } from "../data";
import type { Kind } from "../types";
import { ChoiceCard, Kicker, RecentTestCard, TextLink } from "../components";

/* ---------- 1. Accueil ---------- */

export function Home({ startTest, openHistory }: { startTest: (k: Kind) => void; openHistory: () => void }) {
  return (
    <div className="a11y-fade">
      <Kicker>Pré-diagnostic d'accessibilité</Kicker>
      <h1 className="max-w-2xl text-[2.375rem] font-bold leading-[1.08] tracking-tight">
        Testez l'accessibilité d'une créa ou d'une maquette à partir d'un visuel.
      </h1>
      <p className="mt-3 max-w-xl text-[0.9688rem] leading-relaxed text-muted-foreground">
        Analyse de surface indicative alignée sur le RGAA. Chaque résultat est signalé par une icône,
        un intitulé et une couleur — jamais par la couleur seule.
      </p>

      <div className="mt-9 grid gap-4 md:grid-cols-2">
        <ChoiceCard
          onClick={() => startTest("crea")}
          eyebrow="Formats multiples"
          title="Tester une créa digitale"
          desc="Newsletter, réseaux sociaux ou bannière Display. Contrastes, lisibilité et intitulés au format réel."
        />
        <ChoiceCard
          onClick={() => startTest("maquette")}
          eyebrow="Analyse de surface"
          title="Tester une maquette de page web"
          desc="Structure visuelle, contenus et formulaires. Sans code, à partir du seul visuel importé."
        />
      </div>

      <div className="mt-14 flex items-center justify-between">
        <h2 className="text-[0.9375rem] font-semibold">Tests récents</h2>
        <TextLink onClick={openHistory}>Tout l'historique →</TextLink>
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HISTORY.slice(0, 4).map((h) => (
          <RecentTestCard key={h.name} entry={h} />
        ))}
      </ul>
    </div>
  );
}
