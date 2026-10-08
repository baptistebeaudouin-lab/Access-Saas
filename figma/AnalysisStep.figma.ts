// url=<DS>?node-id=8-234
// source=src/components/AnalysisStep.tsx
// component=AnalysisStep
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const state = instance.getEnum('État', { 'Terminée': 'done', 'En cours': 'active', 'À venir': 'pending' })

export default {
  example: figma.code`<AnalysisStep label="${label}" state="${state}" />`,
  imports: ['import { AnalysisStep } from "./components"'],
  id: 'analysis-step',
  metadata: { nestable: true },
}
