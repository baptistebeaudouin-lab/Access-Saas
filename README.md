# A11Y Check

Outil interne de pré-diagnostic d'accessibilité (RGAA) à partir d'un visuel : créa digitale ou maquette de page web.
Code reconstruit depuis le Make Figma « B2B Accessibility Testing Tool » (version 13), découpé en composants alignés sur le design system Figma (fichier `eZ0AtUbBVOEB5Q76qjSDMh`).

## Lancement

```bash
npm install
npm run dev        # serveur de développement Vite
npm run build      # build de production dans dist/
npm run typecheck  # vérification TypeScript
npm run preview    # sert le build
```

Stack : Vite 8, React 19, TypeScript 5, Tailwind CSS 4.

## Structure

```
src/
  main.tsx              point d'entrée
  App.tsx               état global, navigation entre écrans, focus et titre de page
  index.css             styles globaux (importe styles/tokens.css)
  styles/tokens.css     tokens du design system (source de vérité des couleurs)
  data.ts               formats, génération et comptage du rapport, critères, historique
  status.tsx            statuts (STATUS) et criticités (CRIT) : libellés, couleurs, icônes
  types.ts              types partagés (vues, session, repères)
  components/           un fichier par composant + icons.tsx + index.ts
  screens/              Home, Config, Analyzing, Report, Historique, Referentiel, Admin
```

## Correspondance Figma → React

| Composant Figma | Composant React | Fichier |
| --- | --- | --- |
| Pastille de statut | `StatusPill` | `components/StatusPill.tsx` |
| Pastille de criticité | `CritPill` | `components/CritPill.tsx` |
| Étiquette de référence | `TagChip` | `components/TagChip.tsx` |
| Badge compteur | `CountBadge` | `components/CountBadge.tsx` |
| Compteur de criticité | `CritCounter` | `components/CritCounter.tsx` |
| Bandeau d'alerte | `Alert` | `components/Alert.tsx` |
| Repère | `Pin` | `components/Pin.tsx` |
| Indicateur de chargement | `Spinner` | `components/Spinner.tsx` |
| Bouton | `Button` | `components/Button.tsx` |
| Bouton principal | `CtaButton` | `components/CtaButton.tsx` |
| Lien texte | `TextLink` | `components/TextLink.tsx` |
| Lien de navigation | `NavLink` | `components/NavLink.tsx` |
| Onglet de format | `FormatTabs` | `components/FormatTabs.tsx` |
| Bouton icône | `IconButton` | `components/IconButton.tsx` |
| Lien d'évitement | `SkipLink` | `components/SkipLink.tsx` |
| Case à cocher | `Checkbox` | `components/Checkbox.tsx` |
| Option radio | `RadioCard` | `components/RadioCard.tsx` |
| Puce de canal | `ChannelChip` | `components/ChannelChip.tsx` |
| Puce de format | `FormatChip` | `components/FormatChip.tsx` |
| Liste déroulante | `Select` | `components/Select.tsx` |
| Champ texte | `TextField` | `components/TextField.tsx` |
| Champ de recherche | `SearchField` | `components/SearchField.tsx` |
| Champ numérique | `NumberInput` | `components/NumberInput.tsx` |
| Format ajouté | `CustomFormatChip` | `components/CustomFormatChip.tsx` |
| Zone de dépôt | `Dropzone` | `components/Dropzone.tsx` |
| Zone de dépôt compacte | `CompactDropzone` | `components/CompactDropzone.tsx` |
| Anneau de conformité | `ConformityRing` | `components/ConformityRing.tsx` |
| Barre de répartition | `DistributionBar` | `components/DistributionBar.tsx` |
| Ligne de constat | `FindingRow` | `components/FindingRow.tsx` |
| Ligne conforme | `OkRow` | `components/OkRow.tsx` |
| Accordéon de thème | `ThemeAccordion` | `components/ThemeAccordion.tsx` |
| Étape d'analyse | `AnalysisStep` | `components/AnalysisStep.tsx` |
| Rappels pour le développement | `DevReminders` | `components/DevReminders.tsx` |
| Carte score | `ScoreCard` | `components/ScoreCard.tsx` |
| Carte cartographie | `VisualMap` | `components/VisualMap.tsx` |
| Carte de choix | `ChoiceCard` | `components/ChoiceCard.tsx` |
| Carte test récent | `RecentTestCard` | `components/RecentTestCard.tsx` |
| Ligne d'historique | `HistoryRow` | `components/HistoryRow.tsx` |
| Carte critère | `CriterionCard` | `components/CriterionCard.tsx` |
| Ligne de tableau | `FormatTable` | `components/FormatTable.tsx` |
| État vide | `EmptyState` | `components/EmptyState.tsx` |
| Encart note | `NoteBox` | `components/NoteBox.tsx` |
| Groupe de formats | `FormatGroup` | `components/FormatGroup.tsx` |
| Logo | `Logo` | `components/Logo.tsx` |
| En-tête | `Header` | `components/Header.tsx` |
| Modale cartographie | `ZoomModal` | `components/ZoomModal.tsx` |
| Formulaire de format | `FormatForm` | `components/FormatForm.tsx` |

Composants sans équivalent Figma : `StatusIcon` (icône de statut colorée), `MapViewer` (visionneuse zoomable partagée par `VisualMap` et `ZoomModal`), `FileInput` (champ fichier masqué des zones de dépôt), `Kicker` (sur-titre d'écran). Les pictogrammes SVG sont dans `components/icons.tsx`.

## Couleurs

Aucune couleur en dur dans les composants : tout passe par les tokens de `src/styles/tokens.css` (classes Tailwind `bg-primary`, `text-accent`, `bg-subtle`… ou `var(--color-…)`). Les criticités utilisent `--color-crit-bloquant|majeur|mineur` et leurs `-surface` ; l'anneau de focus utilise `--color-focus`.

## Code Connect (Figma Dev Mode)

Chaque composant a son modèle dans `figma/<Composant>.figma.ts`, relié au nœud correspondant du design system Figma (`figma.config.json`, fichier `eZ0AtUbBVOEB5Q76qjSDMh`). Les propriétés Figma (Style, Taille, État, Statut…) sont traduites en props React.

```bash
npx figma connect parse                                  # vérifier les modèles
FIGMA_ACCESS_TOKEN=… npx figma connect publish           # publier dans Dev Mode
```

Le jeton doit avoir les droits « Code Connect: write » et « File content: read ». La bibliothèque Figma doit être publiée.
