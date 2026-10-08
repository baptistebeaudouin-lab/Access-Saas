// url=<DS>?node-id=9-113
// source=src/components/FormatTable.tsx
// component=FormatTable
import figma from 'figma'
const instance = figma.selectedInstance

instance.getEnum('Type', { 'En-tête': null, 'Ligne': null })

export default {
  example: figma.code`<FormatTable formats={formats} onEdit={onEdit} onDelete={onDelete} />`,
  imports: ['import { FormatTable } from "./components"'],
  id: 'format-table',
  metadata: { nestable: true },
}
