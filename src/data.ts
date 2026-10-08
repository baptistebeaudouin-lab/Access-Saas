import type { Status } from "./status";

// API: SEED_FORMATS, groupByDevice, reportFor, countReport, CRITERIA, HISTORY, formatDate, DEV_REMINDERS.

/* ---------- Formats (source alimentant la bibliothèque + l'admin) ---------- */

export type Device = "Desktop" | "Mobile" | "Tablette" | "Habillage";

export type FormatDef = {
  id: string; // identifiant technique unique
  name: string; // nom technique
  label: string; // libellé lisible et unique
  w: number;
  h: number;
  device: Device;
  channel: string; // canal associé
};

export const SEED_FORMATS: FormatDef[] = [
  { id: "fmt-970-250", name: "banniere_970x250", label: "Bannière 970×250", w: 970, h: 250, device: "Desktop", channel: "Bannière-Display" },
  { id: "fmt-600-126", name: "desktop_600x126", label: "Desktop — 600×126", w: 600, h: 126, device: "Desktop", channel: "Bannière-Display" },
  { id: "fmt-300-600", name: "grand_angle_300x600", label: "Grand Angle 300×600", w: 300, h: 600, device: "Desktop", channel: "Bannière-Display" },
  { id: "fmt-320-100", name: "mobile_320x100", label: "Mobile — 320×100", w: 320, h: 100, device: "Mobile", channel: "Bannière-Display" },
  { id: "fmt-300-250", name: "pave_mobile_300x250", label: "Pavé Mobile 300×250", w: 300, h: 250, device: "Mobile", channel: "Bannière-Display" },
  { id: "fmt-256-280", name: "mobile_256x280", label: "Mobile — 256×280", w: 256, h: 280, device: "Mobile", channel: "Bannière-Display" },
  { id: "fmt-728-90", name: "tablette_728x90", label: "Tablette — 728×90", w: 728, h: 90, device: "Tablette", channel: "Bannière-Display" },
  { id: "fmt-1800-1000", name: "arche_1800x1000", label: "Arche 1800×1000", w: 1800, h: 1000, device: "Habillage", channel: "Bannière-Display" },
  { id: "fmt-1800-800", name: "habillage_1800x800", label: "Habillage 1800×800", w: 1800, h: 800, device: "Habillage", channel: "Bannière-Display" },
];

export const DEVICE_ORDER: Device[] = ["Desktop", "Mobile", "Tablette", "Habillage"];

export function groupByDevice(formats: FormatDef[]): { device: Device; formats: FormatDef[] }[] {
  return DEVICE_ORDER.map((device) => ({ device, formats: formats.filter((f) => f.device === device) })).filter(
    (g) => g.formats.length > 0
  );
}

export const CHANNELS = ["Newsletter", "Réseaux sociaux", "Bannière-Display"] as const;
export type Channel = (typeof CHANNELS)[number];

/* ---------- Modèle de rapport ---------- */

export type Crit = "bloquant" | "majeur" | "mineur";

export type ReportItem = {
  status: Status; // ok | warn | error (3 statuts uniquement)
  title: string;
  reco?: string;
  rgaa?: string; // référence RGAA si applicable
  tag?: string; // libellé alternatif (ex. "Bonne pratique tactile")
  crit?: Crit; // uniquement pour warn / error
  loc?: { x: number; y: number }; // position indicative sur le visuel
};
export type ReportTheme = { key: string; title: string; items: ReportItem[] };

/* Points de vigilance dev (maquette) — non vérifiables sur un visuel (➖). */
export const DEV_REMINDERS = [
  "Prévoir l'attribut lang sur l'élément racine",
  "Assurer un lien d'évitement fonctionnel",
  "Vérifier l'ordre de tabulation au clavier",
  "Associer chaque champ à une étiquette programmatique",
  "Contrôler la structure des landmarks et titres dans le code",
  "Vérifier le comportement au focus et au survol",
];

/* Constats spécifiques par format (dimensions réelles affichées) → font varier le score. */
const FORMAT_FINDINGS: Record<string, ReportItem[]> = {
  "970×250": [
    { status: "ok", title: "Message principal lisible au format Bannière 970×250", rgaa: "RGAA 3.2" },
    { status: "warn", title: "Marge de sécurité gauche un peu juste", reco: "Prévoir une marge interne suffisante autour du texte.", crit: "mineur", loc: { x: 12, y: 45 } },
  ],
  "300×250": [
    { status: "error", title: "Pavé Mobile 300×250 : CTA illisible sous 12px réels", reco: "Agrandir le libellé ou simplifier le message au format réduit.", rgaa: "RGAA 3.2", crit: "bloquant", loc: { x: 58, y: 82 } },
    { status: "error", title: "Densité d'information trop forte pour la surface", reco: "Réduire le nombre d'éléments affichés à ce format.", crit: "majeur", loc: { x: 50, y: 40 } },
    { status: "warn", title: "Risque de troncature du titre sur petits écrans", reco: "Raccourcir l'accroche ou tester le rendu réel.", crit: "majeur", loc: { x: 50, y: 20 } },
  ],
  "320×100": [
    { status: "warn", title: "Mobile 320×100 : hauteur insuffisante pour le CTA", reco: "Repositionner le CTA ou augmenter sa taille relative.", crit: "majeur", loc: { x: 78, y: 55 } },
    { status: "ok", title: "Logo lisible au format 320×100", rgaa: "RGAA 1.1" },
  ],
};

const DEFAULT_FORMAT_FINDINGS: ReportItem[] = [
  { status: "ok", title: "Lisibilité globale correcte au format réel", rgaa: "RGAA 3.2" },
  { status: "warn", title: "Vérifier la lisibilité du CTA au format réel", reco: "Contrôler la taille de police en pixels réellement affichés.", crit: "mineur", loc: { x: 60, y: 78 } },
];

/* ---------- Génération du rapport, selon le type / les canaux / le format ---------- */

export function reportFor(opts: { kind: "crea" | "maquette"; channels: string[]; formatId?: string; formatSize?: string }): ReportTheme[] {
  const { kind, channels, formatSize } = opts;

  const themes: ReportTheme[] = [
    { key: "contrastes", title: "Contrastes", items: [
      { status: "error", title: "Bouton « En savoir plus » : contraste 2.1:1", reco: "Augmenter à 4.5:1 minimum en assombrissant le fond ou le libellé.", rgaa: "RGAA 3.3", crit: "bloquant", loc: { x: 70, y: 80 } },
      { status: "ok", title: "Contraste texte/fond : 7.2:1 — conforme", rgaa: "RGAA 3.2" },
      { status: "ok", title: "Contraste des titres : 8.9:1 — conforme", rgaa: "RGAA 3.2" },
    ] },
    { key: "couleurs", title: "Couleurs", items: [
      { status: "warn", title: "Statut de disponibilité signalé par la seule pastille verte", reco: "Doubler l'information d'une icône et d'un libellé texte.", rgaa: "RGAA 3.1", crit: "majeur", loc: { x: 35, y: 35 } },
      { status: "ok", title: "Légende du graphique doublée d'un motif", rgaa: "RGAA 3.1" },
    ] },
    { key: "typographie", title: "Typographie", items: [
      { status: "warn", title: "Interlignage serré sur le paragraphe principal", reco: "Viser un interlignage d'au moins 1,5 fois la taille du texte.", rgaa: "RGAA 10.12", crit: "mineur", loc: { x: 30, y: 55 } },
      { status: "warn", title: "Alignement justifié détecté", reco: "Préférer un alignement à gauche pour un espacement régulier des mots.", crit: "mineur" },
      { status: "warn", title: "Texte en tout-majuscules sur l'accroche", reco: "Réserver les capitales aux libellés courts.", crit: "mineur" },
      { status: "ok", title: "Corps de texte estimé à 16px — taille confortable" },
    ] },
    { key: "contenu", title: "Contenu", items: [
      { status: "error", title: "Intitulé « Cliquez ici » détecté", reco: "Remplacer par un intitulé explicite décrivant la destination du lien.", rgaa: "RGAA 6.1", crit: "majeur", loc: { x: 52, y: 68 } },
      { status: "warn", title: "Anglicismes ou abréviations non explicités", reco: "Développer les abréviations à la première occurrence.", crit: "mineur" },
      { status: "warn", title: "Mur de texte / densité excessive", reco: "Aérer en paragraphes courts et listes.", crit: "mineur" },
      { status: "ok", title: "Hiérarchie de titres visuellement cohérente", rgaa: "RGAA 9.1" },
    ] },
    { key: "images", title: "Images", items: [
      { status: "warn", title: "Texte détecté dans l'image bannière", reco: "Vérifier l'alternative textuelle et éviter le texte porté par l'image.", rgaa: "RGAA 1.1", crit: "majeur", loc: { x: 45, y: 24 } },
      { status: "ok", title: "Logo pourvu d'une zone d'alternative dédiée", rgaa: "RGAA 1.1" },
    ] },
    { key: "liens", title: "Liens / CTA", items: [
      { status: "warn", title: "Zone cliquable du CTA proche de 40px", reco: "Garantir une cible tactile d'au moins 44×44px.", tag: "Bonne pratique tactile", crit: "mineur", loc: { x: 74, y: 82 } },
      { status: "ok", title: "CTA principal bien démarqué du texte environnant", rgaa: "RGAA 10.6" },
    ] },
  ];

  if (kind === "maquette") {
    themes.push({ key: "structuration", title: "Structuration & zones", items: [
      { status: "ok", title: "Hiérarchie de titres apparente et cohérente", rgaa: "RGAA 9.1" },
      { status: "warn", title: "Header, contenu et footer peu différenciés visuellement", reco: "Renforcer la séparation visuelle des grandes zones.", crit: "mineur", loc: { x: 50, y: 15 } },
    ] });
    themes.push({ key: "navigation", title: "Navigation", items: [
      { status: "ok", title: "Deux systèmes de navigation visibles (principale + fil d'ariane)" },
      { status: "warn", title: "Lien d'évitement non maquetté", reco: "Prévoir un lien d'évitement visible à la prise de focus.", crit: "majeur", loc: { x: 20, y: 8 } },
    ] });
    themes.push({ key: "formulaires", title: "Formulaires", items: [
      { status: "error", title: "Placeholder utilisé en remplacement de l'étiquette", reco: "Afficher une étiquette visible, distincte du placeholder.", rgaa: "RGAA 11.1", crit: "majeur", loc: { x: 40, y: 60 } },
      { status: "warn", title: "Champs obligatoires non signalés visuellement", reco: "Indiquer clairement les champs requis (texte + marque).", crit: "majeur", loc: { x: 40, y: 66 } },
      { status: "warn", title: "Message d'erreur reposant sur la seule couleur", reco: "Ajouter une icône et un texte explicite à l'erreur.", rgaa: "RGAA 3.1", crit: "majeur", loc: { x: 42, y: 72 } },
    ] });
    themes.push({ key: "tableaux", title: "Tableaux", items: [
      { status: "warn", title: "En-têtes de colonnes peu distincts des données", reco: "Différencier visuellement la ligne d'en-tête.", crit: "mineur", loc: { x: 55, y: 50 } },
      { status: "ok", title: "Alternance de lignes facilitant la lecture" },
    ] });
    themes.push({ key: "boutons", title: "Boutons & liens", items: [
      { status: "ok", title: "Intitulés de boutons explicites", rgaa: "RGAA 6.1" },
      { status: "warn", title: "État visuel de lien visité peu lisible", reco: "Prévoir un état visuel distinct et suffisamment contrasté.", crit: "mineur" },
    ] });
    return themes;
  }

  // Créa : modules selon les canaux cochés.
  if (channels.includes("Newsletter")) {
    themes.push({ key: "newsletter", title: "Spécificités Newsletter", items: [
      { status: "ok", title: "Structuration en paragraphes courts", rgaa: "RGAA 9.1" },
      { status: "warn", title: "Densité de contenu élevée dans l'en-tête", reco: "Alléger l'en-tête au profit du message principal.", crit: "mineur" },
      { status: "warn", title: "Hiérarchie visuelle des blocs à renforcer", reco: "Distinguer clairement titre, corps et CTA.", crit: "mineur", loc: { x: 40, y: 30 } },
    ] });
  }
  if (channels.includes("Réseaux sociaux")) {
    themes.push({ key: "rs", title: "Spécificités Réseaux sociaux", items: [
      { status: "warn", title: "Structuration texte / hashtags à clarifier", reco: "Séparer le message des hashtags en fin de post.", crit: "mineur" },
      { status: "warn", title: "Rappel : prévoir une description alternative sur la plateforme de diffusion", reco: "Renseigner le texte alternatif au moment de la publication.", rgaa: "RGAA 1.1", crit: "majeur" },
    ] });
  }
  if (channels.includes("Bannière-Display")) {
    const findings = (formatSize && FORMAT_FINDINGS[formatSize]) || DEFAULT_FORMAT_FINDINGS;
    themes.push({ key: "lisibilite", title: "Lisibilité au format réel", items: findings });
  }

  return themes;
}

/* ---------- Comptage du rapport (score, statuts, criticités) ---------- */

export function countReport(themes: ReportTheme[]) {
  const c = { ok: 0, warn: 0, error: 0, neutral: 0, bloquant: 0, majeur: 0, mineur: 0 };
  themes.forEach((t) => t.items.forEach((it) => { c[it.status]++; if (it.crit) c[it.crit]++; }));
  const total = c.ok + c.warn + c.error;
  const score = total ? Math.round((c.ok / total) * 100) : 0;
  return { ...c, total, score };
}

export type ReportCounts = ReturnType<typeof countReport>;

/* ---------- Référentiel des critères ---------- */

export type Criterion = {
  ref: string; // RGAA x.x ou "Bonne pratique"
  theme: string;
  title: string;
  desc: string;
  exampleOk: string;
  exampleKo: string;
};

export const CRITERIA: Criterion[] = [
  { ref: "RGAA 1.1", theme: "Images", title: "Alternative textuelle des images", desc: "Chaque image porteuse d'information dispose d'une alternative pertinente.", exampleOk: "Logo avec alternative « Journal Le Média »", exampleKo: "Image de texte sans alternative" },
  { ref: "RGAA 3.1", theme: "Couleurs", title: "Information non portée par la seule couleur", desc: "Toute information codée par la couleur est doublée par du texte ou une forme.", exampleOk: "Erreur signalée par icône + texte", exampleKo: "Champ en erreur en rouge uniquement" },
  { ref: "RGAA 3.2", theme: "Contrastes", title: "Contraste minimal du texte", desc: "4.5:1 (3:1 pour les grands textes) entre le texte et son arrière-plan.", exampleOk: "Texte gris foncé sur blanc, 7:1", exampleKo: "Texte gris clair sur blanc, 2.5:1" },
  { ref: "RGAA 3.3", theme: "Contrastes", title: "Contraste des composants d'interface", desc: "3:1 minimum pour les bordures de champs, boutons et éléments actifs.", exampleOk: "Champ bordé d'un gris à 3.2:1", exampleKo: "Champ bordé d'un gris à 1.3:1" },
  { ref: "RGAA 6.1", theme: "Contenu", title: "Intitulés de liens explicites", desc: "L'intitulé seul permet de comprendre la fonction ou la destination du lien.", exampleOk: "« Consulter nos offres d'abonnement »", exampleKo: "« Cliquez ici »" },
  { ref: "RGAA 9.1", theme: "Contenu", title: "Hiérarchie des titres", desc: "Les niveaux de titres traduisent la structure logique du contenu.", exampleOk: "Un h1, des h2 pour les sections", exampleKo: "Titres simulés par du gras seul" },
  { ref: "RGAA 10.12", theme: "Typographie", title: "Propriétés d'espacement du texte", desc: "Interlignage, espacement des paragraphes, mots et lettres suffisants.", exampleOk: "Interligne à 1,5", exampleKo: "Interligne trop serré" },
  { ref: "RGAA 11.1", theme: "Formulaires", title: "Étiquettes de champs de formulaire", desc: "Chaque champ est accompagné d'une étiquette visible, explicite et associée.", exampleOk: "Étiquette « Adresse e-mail » visible", exampleKo: "Champ sans étiquette, placeholder seul" },
  { ref: "RGAA 12.6", theme: "Structuration", title: "Zones de regroupement", desc: "Les régions de la page (en-tête, navigation, contenu) sont identifiables.", exampleOk: "Header / nav / footer distincts", exampleKo: "Zones indifférenciées" },
  { ref: "Bonne pratique tactile", theme: "Liens / CTA", title: "Taille des cibles tactiles", desc: "Les zones interactives offrent une surface d'activation d'au moins 44×44px.", exampleOk: "Bouton de 48px de haut", exampleKo: "Lien de 20px de haut" },
];

/* ---------- Historique ---------- */

export type HistoryEntry = {
  name: string;
  kind: "crea" | "maquette";
  channel: string;
  date: string; // ISO
  global: Status;
};

export const HISTORY: HistoryEntry[] = [
  { name: "Newsletter Rentrée 2026", kind: "crea", channel: "Newsletter", date: "2026-09-14", global: "warn" },
  { name: "Campagne Display Auto", kind: "crea", channel: "Bannière-Display", date: "2026-09-12", global: "error" },
  { name: "Maquette Home Abonnés", kind: "maquette", channel: "Maquette web", date: "2026-09-09", global: "ok" },
  { name: "Post RS — Podcast", kind: "crea", channel: "Réseaux sociaux", date: "2026-09-05", global: "warn" },
  { name: "Bannière Display Sport", kind: "crea", channel: "Bannière-Display", date: "2026-08-28", global: "warn" },
];

export function formatDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}
