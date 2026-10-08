// url=<DS>?node-id=9-65
// source=src/components/CriterionCard.tsx
// component=CriterionCard
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<CriterionCard criterion={criterion} />`,
  imports: ['import { CriterionCard } from "./components"'],
  id: 'criterion-card',
  metadata: { nestable: true },
}
