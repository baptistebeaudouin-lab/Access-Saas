// url=<DS>?node-id=8-318
// source=src/components/VisualMap.tsx
// component=VisualMap
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<VisualMap src={previewUrl} pins={pins} active={activeId} onPick={onPick} onExpand={() => setZoom(true)} />`,
  imports: ['import { VisualMap } from "./components"'],
  id: 'visual-map',
  metadata: { nestable: true },
}
