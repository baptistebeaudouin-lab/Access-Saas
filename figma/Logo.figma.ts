// url=<DS>?node-id=10-30
// source=src/components/Logo.tsx
// component=Logo
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<Logo onClick={() => go('home')} />`,
  imports: ['import { Logo } from "./components"'],
  id: 'logo',
  metadata: { nestable: true },
}
