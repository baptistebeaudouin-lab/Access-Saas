// url=<DS>?node-id=10-119
// source=src/components/ZoomModal.tsx
// component=ZoomModal
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<ZoomModal src={previewUrl} pins={pins} active={activeId} onPick={onPick} onClose={() => setZoom(false)} title={formatLabel} />`,
  imports: ['import { ZoomModal } from "./components"'],
  id: 'zoom-modal',
  metadata: { nestable: true },
}
