// url=<DS>?node-id=5-42
// source=src/components/TagChip.tsx
// component=TagChip
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.findText('Libellé')

export default {
  example: figma.code`<TagChip label="${text.textContent}" />`,
  imports: ['import { TagChip } from "./components"'],
  id: 'tag-chip',
  metadata: { nestable: true },
}
