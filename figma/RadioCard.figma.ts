// url=<DS>?node-id=7-25
// source=src/components/RadioCard.tsx
// component=RadioCard
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const checked = instance.getEnum('Sélectionné', { 'Oui': true, 'Non': false })

export default {
  example: figma.code`<RadioCard name="mode-import" checked={${checked ? 'true' : 'false'}} onChange={onChange}>${label}</RadioCard>`,
  imports: ['import { RadioCard } from "./components"'],
  id: 'radio-card',
  metadata: { nestable: true },
}
