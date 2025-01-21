import OpenAI from 'openai';
import { UserResponse } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface ChatResponse {
  message: string;
  data?: UserResponse;
}

const SYSTEM_PROMPT = `Tu es un assistant personnel spécialisé dans l'organisation et la productivité. 
Tu dois aider l'utilisateur à définir ses objectifs, ses routines et ses tâches.
Sois amical, empathique et pose des questions pertinentes pour comprendre ses besoins.

Voici les domaines à explorer :
1. Objectifs personnels et professionnels
2. Routines quotidiennes (réveil, coucher)
3. Priorités et valeurs
4. Style de travail préféré
5. Défis et obstacles actuels

Analyse les réponses pour suggérer des actions concrètes.`;

export const processUserResponse = async (
  userInput: string,
  conversationHistory: { role: string; content: string }[]
): Promise<ChatResponse> => {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userInput }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500
    });

    const assistantMessage = response.choices[0].message.content || '';

    // Analyse la réponse pour extraire des données structurées si nécessaire
    const data = extractStructuredData(userInput, assistantMessage);

    return {
      message: assistantMessage,
      data
    };
  } catch (error) {
    console.error('Error processing chat:', error);
    throw error;
  }
};

const extractStructuredData = (
  userInput: string,
  assistantResponse: string
): UserResponse | undefined => {
  // Logique d'extraction des données structurées
  // À implémenter selon les besoins spécifiques
  return undefined;
};