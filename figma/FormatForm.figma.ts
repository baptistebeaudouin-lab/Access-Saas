// url=<DS>?node-id=10-245
// source=src/components/FormatForm.tsx
// component=FormatForm
import figma from 'figma'
const instance = figma.selectedInstance

const editing = instance.getEnum('Mode', { 'Ajout': false, 'Modification': true })

export default {
  example: figma.code`<FormatForm draft={draft} onChange={setDraft} editing={${editing ? 'true' : 'false'}} error={error} onSave={onSave} onCancel={onCancel} />`,
  imports: ['import { FormatForm } from "./components"'],
  id: 'format-form',
  metadata: { nestable: true },
}
