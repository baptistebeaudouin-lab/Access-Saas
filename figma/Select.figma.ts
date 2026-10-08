// url=<DS>?node-id=7-63
// source=src/components/Select.tsx
// component=Select
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Étiquette')
const value = instance.getString('Valeur')
instance.getEnum('État', { 'Défaut': null, 'Focus': null })

export default {
  example: figma.code`<Select label="${label}" value={value} onChange={setValue} options={[['all', '${value}']]} />`,
  imports: ['import { Select } from "./components"'],
  id: 'select',
  metadata: { nestable: true },
}
