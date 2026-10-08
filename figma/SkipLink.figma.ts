// url=<DS>?node-id=6-154
// source=src/components/SkipLink.tsx
// component=SkipLink
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<SkipLink href="#contenu">Aller au contenu</SkipLink>`,
  imports: ['import { SkipLink } from "./components"'],
  id: 'skip-link',
  metadata: { nestable: true },
}
