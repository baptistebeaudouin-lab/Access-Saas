// url=<DS>?node-id=7-48
// source=src/components/FormatChip.tsx
// component=FormatChip
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const checked = instance.getEnum('Sélectionné', { 'Oui': true, 'Non': false })

export default {
  example: figma.code`<FormatChip label="${label}" checked={${checked ? 'true' : 'false'}} onToggle={onToggle} />`,
  imports: ['import { FormatChip } from "./components"'],
  id: 'format-chip',
  metadata: { nestable: true },
}
