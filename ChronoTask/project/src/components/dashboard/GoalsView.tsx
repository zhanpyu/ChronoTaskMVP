import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Target, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  category: string;
  milestones: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export const GoalsView = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    deadline: '',
    category: '',
    milestones: [],
  });
  const [newMilestone, setNewMilestone] = useState('');

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      setGoals([
        ...goals,
        {
          id: Date.now().toString(),
          title: newGoal.title,
          description: newGoal.description || '',
          deadline: newGoal.deadline,
          progress: 0,
          category: newGoal.category || '',
          milestones: newGoal.milestones || [],
        },
      ]);
      setNewGoal({
        title: '',
        description: '',
        deadline: '',
        category: '',
        milestones: [],
      });
      setIsAddingGoal(false);
    }
  };

  const addMilestone = () => {
    if (newMilestone.trim()) {
      setNewGoal({
        ...newGoal,
        milestones: [
          ...(newGoal.milestones || []),
          {
            id: Date.now().toString(),
            title: newMilestone,
            completed: false,
          },
        ],
      });
      setNewMilestone('');
    }
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map((milestone) =>
            milestone.id === milestoneId
              ? { ...milestone, completed: !milestone.completed }
              : milestone
          );
          const progress =
            (updatedMilestones.filter((m) => m.completed).length /
              updatedMilestones.length) *
            100;
          return {
            ...goal,
            milestones: updatedMilestones,
            progress,
          };
        }
        return goal;
      })
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Objectifs</h1>
        <button
          onClick={() => setIsAddingGoal(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouvel objectif</span>
        </button>
      </div>

      {isAddingGoal && (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <input
            type="text"
            placeholder="Titre de l'objectif"
            className="input"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="input"
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          />
          <div className="flex space-x-4">
            <input
              type="date"
              className="input"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            />
            <input
              type="text"
              placeholder="Catégorie"
              className="input"
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Étapes clés</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Nouvelle étape"
                className="input flex-1"
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMilestone()}
              />
              <button
                onClick={addMilestone}
                className="btn btn-primary"
              >
                Ajouter
              </button>
            </div>
            <ul className="space-y-2">
              {newGoal.milestones?.map((milestone) => (
                <li
                  key={milestone.id}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <CheckCircle2 size={16} />
                  <span>{milestone.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingGoal(false)}
              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Annuler
            </button>
            <button onClick={handleAddGoal} className="btn btn-primary">
              Créer l'objectif
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {goal.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
              </div>
              <Target className="text-blue-500" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progression</span>
                  <span>{Math.round(goal.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {goal.milestones.map((milestone) => (
                  <button
                    key={milestone.id}
                    onClick={() => toggleMilestone(goal.id, milestone.id)}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <CheckCircle2
                      className={milestone.completed ? 'text-green-500' : 'text-gray-300'}
                    />
                    <span className={milestone.completed ? 'line-through text-gray-500' : ''}>
                      {milestone.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {goal.category}
                </span>
                <span className="text-gray-600">
                  Échéance : {new Date(goal.deadline).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};