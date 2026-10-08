// url=<DS>?node-id=7-87
// source=src/components/TextField.tsx
// component=TextField
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Étiquette')
const state = instance.getEnum('État', { 'Vide': 'empty', 'Rempli': 'filled', 'Focus': 'filled', 'Erreur': 'error' })

export default {
  example: figma.code`<TextField label="${label}" value={value} onChange={setValue} />${state === 'error' ? figma.code`
{/* Erreur : message rendu par le formulaire parent (Alert size="sm") */}` : ''}`,
  imports: ['import { TextField } from "./components"'],
  id: 'text-field',
  metadata: { nestable: true },
}
