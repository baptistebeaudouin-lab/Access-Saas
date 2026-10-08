// url=<DS>?node-id=9-174
// source=src/components/FormatGroup.tsx
// component=FormatGroup
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.findText('Groupe').textContent

export default {
  example: figma.code`<FormatGroup title="${title}">{formatChips}</FormatGroup>`,
  imports: ['import { FormatGroup } from "./components"'],
  id: 'format-group',
  metadata: { nestable: true },
}
