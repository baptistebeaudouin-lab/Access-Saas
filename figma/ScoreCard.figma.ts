// url=<DS>?node-id=8-244
// source=src/components/ScoreCard.tsx
// component=ScoreCard
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<ScoreCard counts={counts} tone={tone} />`,
  imports: ['import { ScoreCard } from "./components"'],
  id: 'score-card',
  metadata: { nestable: true },
}
