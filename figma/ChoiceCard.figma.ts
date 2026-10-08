// url=<DS>?node-id=9-23
// source=src/components/ChoiceCard.tsx
// component=ChoiceCard
import figma from 'figma'
const instance = figma.selectedInstance

const eyebrow = instance.getString('Surtitre')
const title = instance.getString('Titre')
const desc = instance.getString('Description')
instance.getEnum('État', { 'Défaut': null, 'Survol': null })

export default {
  example: figma.code`<ChoiceCard eyebrow="${eyebrow}" title="${title}" desc="${desc}" onClick={onClick} />`,
  imports: ['import { ChoiceCard } from "./components"'],
  id: 'choice-card',
  metadata: { nestable: true },
}
