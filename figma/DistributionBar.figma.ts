// url=<DS>?node-id=8-33
// source=src/components/DistributionBar.tsx
// component=DistributionBar
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<DistributionBar counts={counts} />`,
  imports: ['import { DistributionBar } from "./components"'],
  id: 'distribution-bar',
  metadata: { nestable: true },
}
