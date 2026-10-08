// url=<DS>?node-id=6-151
// source=src/components/IconButton.tsx
// component=IconButton
import figma from 'figma'
const instance = figma.selectedInstance

const icon = instance.getInstanceSwap('Icône')
let iconCode
if (icon && icon.type === 'INSTANCE') iconCode = icon.executeTemplate().example
const disabled = instance.getEnum('État', { 'Défaut': false, 'Survol': false, 'Désactivé': true })

export default {
  example: figma.code`<IconButton label="Zoom arrière" onClick={onClick}${disabled ? ' disabled' : ''}>${iconCode}</IconButton>`,
  imports: ['import { IconButton } from "./components"'],
  id: 'icon-button',
  metadata: { nestable: true },
}
