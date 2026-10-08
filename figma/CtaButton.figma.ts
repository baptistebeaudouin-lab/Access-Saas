// url=<DS>?node-id=6-108
// source=src/components/CtaButton.tsx
// component=CtaButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const disabled = instance.getEnum('État', { 'Défaut': false, 'Focus': false, 'Désactivé': true })

export default {
  example: figma.code`<CtaButton${disabled ? ' disabled' : ''} onClick={launch}>${label}</CtaButton>`,
  imports: ['import { CtaButton } from "./components"'],
  id: 'cta-button',
  metadata: { nestable: true },
}
