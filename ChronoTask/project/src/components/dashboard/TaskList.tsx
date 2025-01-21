import React from 'react';
import { useStore } from '../../store/useStore';
import { Circle, CheckCircle, Clock } from 'lucide-react';

export const TaskList = () => {
  const { tasks } = useStore();
  const priorityTasks = tasks.filter(task => task.priority === 'high').slice(0, 5);

  return (
    <div className="space-y-3">
      {priorityTasks.length === 0 ? (
        <div className="text-center py-4 text-gray-400">
          Aucune tâche prioritaire
        </div>
      ) : (
        priorityTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600"
          >
            <div className="flex items-center space-x-3">
              {task.status === 'done' ? (
                <CheckCircle className="text-emerald-400" />
              ) : (
                <Circle className="text-gray-400" />
              )}
              <span className={`text-sm ${task.status === 'done' ? 'line-through text-gray-400' : 'text-white'}`}>
                {task.title}
              </span>
            </div>
            {task.dueDate && (
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <Clock size={14} />
                <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};