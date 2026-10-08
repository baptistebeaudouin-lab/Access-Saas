// url=<DS>?node-id=10-116
// source=src/components/Header.tsx
// component=Header
import figma from 'figma'
const instance = figma.selectedInstance

const view = instance.getEnum('Page', { 'Accueil': 'home', 'Historique': 'historique', 'Référentiel': 'referentiel', 'Paramètres': 'admin' })

export default {
  example: figma.code`<Header view="${view}" go={go} />`,
  imports: ['import { Header } from "./components"'],
  id: 'header',
  metadata: { nestable: true },
}
