import React, { useState } from 'react';
import { useStore } from '../../../store/useStore';

const ActivityRing = ({ 
  value, 
  total, 
  color, 
  thickness = 8,
  size = 160
}: { 
  value: number; 
  total: number; 
  color: string;
  thickness?: number;
  size?: number;
}) => {
  const percentage = (value / total) * 100;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={thickness}
        fill="none"
        className="text-gray-100"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        fill="none"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
};

export const Activity = () => {
  const [view, setView] = useState<'weekly' | 'daily'>('weekly');
  const { tasks } = useStore();
  
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;

  const getDailyData = () => ({
    workingHours: {
      current: 6,
      total: 8,
      percentage: 75
    },
    tasksCompleted: {
      current: completedTasks,
      total: Math.max(totalTasks, 1),
      percentage: totalTasks ? (completedTasks / totalTasks) * 100 : 0
    },
    projectsCompleted: {
      current: 2,
      total: 3,
      percentage: 66.7
    }
  });

  const getWeeklyData = () => ({
    workingHours: {
      current: 29,
      total: 40,
      percentage: 72.5
    },
    tasksCompleted: {
      current: completedTasks,
      total: Math.max(totalTasks, 1),
      percentage: totalTasks ? (completedTasks / totalTasks) * 100 : 0
    },
    projectsCompleted: {
      current: 4,
      total: 7,
      percentage: 57.1
    }
  });

  const data = view === 'daily' ? getDailyData() : getWeeklyData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Activité</h2>
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setView('weekly')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              view === 'weekly'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Semaine
          </button>
          <button
            onClick={() => setView('daily')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              view === 'daily'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Jour
          </button>
        </div>
      </div>

      <div className="relative flex justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-1">
            <div className="text-3xl font-semibold text-gray-900">
              {data.workingHours.current}
              <span className="text-lg text-gray-400">/{data.workingHours.total}h</span>
            </div>
            <div className="text-sm text-gray-500">Heures travaillées</div>
          </div>
        </div>
        <div className="relative">
          <ActivityRing
            value={data.workingHours.current}
            total={data.workingHours.total}
            color="#FBBF24"
            size={200}
            thickness={12}
          />
          <div className="absolute inset-0 transform rotate-[120deg]">
            <ActivityRing
              value={data.tasksCompleted.current}
              total={data.tasksCompleted.total}
              color="#60A5FA"
              size={200}
              thickness={12}
            />
          </div>
          <div className="absolute inset-0 transform rotate-[240deg]">
            <ActivityRing
              value={data.projectsCompleted.current}
              total={data.projectsCompleted.total}
              color="#34D399"
              size={200}
              thickness={12}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
            <span className="text-sm text-gray-600">Tâches terminées</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">
              {data.tasksCompleted.current}/{data.tasksCompleted.total}
            </span>
            <span className="ml-2 text-green-500">
              {data.tasksCompleted.percentage.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
            <span className="text-sm text-gray-600">Projets terminés</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">
              {data.projectsCompleted.current}/{data.projectsCompleted.total}
            </span>
            <span className="ml-2 text-green-500">
              {data.projectsCompleted.percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};