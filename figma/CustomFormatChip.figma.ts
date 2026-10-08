// url=<DS>?node-id=7-101
// source=src/components/CustomFormatChip.tsx
// component=CustomFormatChip
import figma from 'figma'
const instance = figma.selectedInstance

const parts = instance.findText('Libellé').textContent.split('×')
const w = parseInt(parts[0], 10) || 0
const h = parseInt(parts[1], 10) || 0

export default {
  example: figma.code`<CustomFormatChip w={${String(w)}} h={${String(h)}} onRemove={onRemove} />`,
  imports: ['import { CustomFormatChip } from "./components"'],
  id: 'custom-format-chip',
  metadata: { nestable: true },
}
