// url=<DS>?node-id=6-99
// source=src/components/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const variant = instance.getEnum('Style', { 'Primaire': 'primary', 'Secondaire': 'secondary', 'Danger': 'danger' })
const size = instance.getEnum('Taille', { 'Moyenne': 'md', 'Petite': 'sm' })
const disabled = instance.getEnum('État', { 'Défaut': false, 'Survol': false, 'Focus': false, 'Désactivé': true })
const hasIcon = instance.getBoolean('Icône')
const icon = hasIcon ? instance.getInstanceSwap('Icône · choix') : null
let iconCode
if (icon && icon.type === 'INSTANCE') iconCode = icon.executeTemplate().example

export default {
  example: figma.code`<Button variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}${iconCode ? figma.code` icon={${iconCode}}` : ''}>${label}</Button>`,
  imports: ['import { Button } from "./components"'],
  id: 'button',
  metadata: { nestable: true },
}
