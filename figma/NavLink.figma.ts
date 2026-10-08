// url=<DS>?node-id=6-130
// source=src/components/NavLink.tsx
// component=NavLink
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const active = instance.getEnum('État', { 'Actif': true, 'Inactif': false, 'Survol': false, 'Focus': false })

export default {
  example: figma.code`<NavLink active={${active ? 'true' : 'false'}} onClick={() => go(view)}>${label}</NavLink>`,
  imports: ['import { NavLink } from "./components"'],
  id: 'nav-link',
  metadata: { nestable: true },
}
