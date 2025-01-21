import React, { useState, useEffect } from 'react';
import { Play, Pause, MoreVertical, Clock, RotateCcw } from 'lucide-react';
import { useStore } from '../../../store/useStore';

export const TimeTracker = () => {
  const { tasks } = useStore();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showTaskSelect, setShowTaskSelect] = useState(false);

  const availableTasks = tasks.filter(task => task.status !== 'done');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const selectedTask = selectedTaskId ? tasks.find(t => t.id === selectedTaskId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Clock className="text-blue-600" size={24} />
          <h2 className="text-lg font-semibold text-gray-900">Chronomètre</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setTime(0)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <RotateCcw size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-6xl font-mono font-semibold text-gray-900 tracking-wider tabular-nums">
              {formatTime(time)}
            </div>
            {selectedTask ? (
              <div 
                className="text-sm text-gray-500 cursor-pointer hover:text-blue-500"
                onClick={() => setShowTaskSelect(true)}
              >
                {selectedTask.title}
              </div>
            ) : (
              <button
                onClick={() => setShowTaskSelect(true)}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + Sélectionner une tâche
              </button>
            )}
          </div>
        </div>
        <svg className="w-full h-48">
          <circle
            cx="50%"
            cy="50%"
            r="70"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          <circle
            cx="50%"
            cy="50%"
            r="70"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeDasharray={`${(time % 3600) / 3600 * 439} 439`}
            className="transform -rotate-90 origin-center transition-all duration-1000"
          />
        </svg>
      </div>

      {showTaskSelect && (
        <div className="absolute inset-x-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
          <div className="max-h-48 overflow-y-auto">
            {availableTasks.map(task => (
              <button
                key={task.id}
                onClick={() => {
                  setSelectedTaskId(task.id);
                  setShowTaskSelect(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="font-medium text-gray-900">{task.title}</div>
                {task.category && (
                  <div className="text-sm text-gray-500">{task.category}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all ${
            isRunning 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Suivi de tâche activé</span>
        </div>
        <span className="text-sm font-medium text-gray-900">
          {selectedTask ? selectedTask.category || 'Sans catégorie' : 'Aucune tâche'}
        </span>
      </div>
    </div>
  );
};