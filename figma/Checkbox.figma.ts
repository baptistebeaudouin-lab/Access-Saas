// url=<DS>?node-id=7-15
// source=src/components/Checkbox.tsx
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance

const checked = instance.getEnum('Coché', { 'Oui': true, 'Non': false })
instance.getEnum('État', { 'Défaut': null, 'Focus': null })

export default {
  example: figma.code`<Checkbox checked={${checked ? 'true' : 'false'}} />`,
  imports: ['import { Checkbox } from "./components"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
