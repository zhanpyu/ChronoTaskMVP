import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { questions } from '../data/questions';
import { Clock, Check } from 'lucide-react';

export const Onboarding = () => {
  const { currentStep, addResponse, setCurrentStep } = useStore();
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const question = questions[currentStep];

  const handleNext = () => {
    if (currentAnswer) {
      addResponse({ questionId: question.id, answer: currentAnswer });
      setCurrentAnswer('');
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const renderInput = () => {
    switch (question.type) {
      case 'time':
        return (
          <input
            type="time"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={currentAnswer as string}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
        );
      case 'select':
        return (
          <select
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={currentAnswer as string}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          >
            <option value="">Sélectionnez une option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'multiselect':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  checked={(currentAnswer as string[])?.includes(option)}
                  onChange={(e) => {
                    const newAnswer = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (e.target.checked) {
                      setCurrentAnswer([...newAnswer, option]);
                    } else {
                      setCurrentAnswer(newAnswer.filter((a) => a !== option));
                    }
                  }}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      default:
        return (
          <textarea
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={currentAnswer as string}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
        );
    }
  };

  const isNextDisabled = () => {
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.length === 0;
    }
    return !currentAnswer;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Clock className="text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Ma Vie Organisée</h2>
          </div>
          <div className="text-sm text-gray-500">
            Question {currentStep + 1}/{questions.length}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">{question.text}</h3>
          {renderInput()}
        </div>

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={() => {
                setCurrentStep(currentStep - 1);
                const previousAnswer = useStore.getState().responses
                  .find((r) => r.questionId === questions[currentStep - 1].id)?.answer;
                setCurrentAnswer(previousAnswer || '');
              }}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              Précédent
            </button>
          )}
          {currentStep < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`ml-auto px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 ${
                isNextDisabled() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              <span>Suivant</span>
              <Check size={16} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`ml-auto px-6 py-2 bg-green-500 text-white rounded-lg flex items-center space-x-2 ${
                isNextDisabled() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
            >
              <span>Terminer</span>
              <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};