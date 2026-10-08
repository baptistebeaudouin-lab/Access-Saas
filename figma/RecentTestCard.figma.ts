// url=<DS>?node-id=9-26
// source=src/components/RecentTestCard.tsx
// component=RecentTestCard
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<RecentTestCard entry={entry} />`,
  imports: ['import { RecentTestCard } from "./components"'],
  id: 'recent-test-card',
  metadata: { nestable: true },
}
