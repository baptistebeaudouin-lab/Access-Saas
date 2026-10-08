// url=<DS>?node-id=8-215
// source=src/components/ThemeAccordion.tsx
// component=ThemeAccordion
import figma from 'figma'
const instance = figma.selectedInstance

const theme = instance.getString('Thème')
const open = instance.getEnum('État', { 'Ouvert': true, 'Fermé': false })

export default {
  example: figma.code`{/* Thème « ${theme} » */}
<ThemeAccordion theme={theme} open={${open ? 'true' : 'false'}} onToggle={onToggle} numbers={numbers} activeId={activeId} onPick={onPick} />`,
  imports: ['import { ThemeAccordion } from "./components"'],
  id: 'theme-accordion',
  metadata: { nestable: true },
}
