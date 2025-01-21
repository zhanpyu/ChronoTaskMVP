import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'wake-time',
    text: 'À quelle heure vous réveillez-vous habituellement ?',
    type: 'time'
  },
  {
    id: 'sleep-time',
    text: 'À quelle heure vous couchez-vous habituellement ?',
    type: 'time'
  },
  {
    id: 'priorities',
    text: 'Quels sont vos domaines prioritaires ?',
    type: 'multiselect',
    options: [
      'Santé et Bien-être',
      'Carrière',
      'Relations',
      'Développement Personnel',
      'Loisirs',
      'Finances'
    ]
  },
  {
    id: 'work-style',
    text: 'Quel est votre style de travail préféré ?',
    type: 'select',
    options: [
      'Sessions de travail intensif',
      'Travail régulier avec pauses fréquentes',
      'Flexibilité totale'
    ]
  },
  {
    id: 'goals',
    text: 'Quels sont vos objectifs principaux pour les 3 prochains mois ?',
    type: 'text'
  }
];