// url=<DS>?node-id=6-119
// source=src/components/TextLink.tsx
// component=TextLink
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const tone = instance.getEnum('Ton', { 'Accent': 'accent', 'Discret': 'muted' })
instance.getEnum('État', { 'Défaut': null, 'Survol': null })

export default {
  example: figma.code`<TextLink tone="${tone}" onClick={onClick}>${label}</TextLink>`,
  imports: ['import { TextLink } from "./components"'],
  id: 'text-link',
  metadata: { nestable: true },
}
