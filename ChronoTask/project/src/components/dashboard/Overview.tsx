import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  Clock, Calendar, ChevronRight, ArrowUp, 
  ArrowDown, Activity, Target, Lock
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const Overview = () => {
  const { responses, tasks, goals } = useStore();
  const wakeTime = responses.find(r => r.questionId === 'wake-time')?.answer as string;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-8 bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {format(new Date(), 'd')}
            </span>
          </div>
          <div>
            <div className="text-gray-400">
              {format(new Date(), 'EEEE', { locale: fr })},
            </div>
            <div className="text-xl font-semibold text-white">
              {format(new Date(), 'MMMM yyyy', { locale: fr })}
            </div>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
          <span>Voir mes tâches</span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Statistiques principales */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Activity className="text-emerald-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Progression</h3>
            </div>
            <div className="text-sm text-gray-400">Hebdomadaire</div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-white">{completionRate}%</div>
              <div className="text-sm text-gray-400">Taux de complétion</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                <ArrowUp className="text-emerald-400" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Temps système */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Lock className="text-blue-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Temps système</h3>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">Temps total</div>
              <div className="text-white">108 heures, 23 minutes</div>
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i < 10 ? 'bg-emerald-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Objectifs */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Target className="text-purple-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Objectifs</h3>
            </div>
            <div className="text-sm text-gray-400">Cette semaine</div>
          </div>
          <div className="relative">
            <div className="w-24 h-24 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={`${(goals?.length || 0) * 25}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">36%</div>
                  <div className="text-xs text-gray-400">Croissance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique d'activité */}
      <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Activité journalière</h3>
          <div className="flex items-center space-x-4">
            <select className="bg-gray-700 text-white rounded-lg px-3 py-1 text-sm">
              <option>Cette semaine</option>
              <option>Ce mois</option>
              <option>Cette année</option>
            </select>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-16 flex flex-col items-center space-y-2">
              <div 
                className="w-4 bg-emerald-500 rounded-t-lg"
                style={{ height: `${Math.random() * 100 + 20}px` }}
              />
              <div className="text-sm text-gray-400">
                {format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'EEE', { locale: fr })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};