import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';

const MOCK_TASKS = [
  {
    id: 1,
    title: 'New Ideas for campaign',
    progress: 60,
    assignees: [
      { id: 1, name: 'Sarah K.', avatar: '/avatars/sarah.jpg', color: 'bg-pink-500' },
      { id: 2, name: 'John D.', avatar: '/avatars/john.jpg', color: 'bg-blue-500' }
    ],
    dueDate: '2024-03-20'
  },
  {
    id: 2,
    title: 'Change button',
    progress: 27,
    assignees: [
      { id: 3, name: 'Mike R.', avatar: '/avatars/mike.jpg', color: 'bg-purple-500' }
    ],
    dueDate: '2024-03-18'
  },
  {
    id: 3,
    title: 'New BrandBook',
    progress: 95,
    assignees: [
      { id: 1, name: 'Sarah K.', avatar: '/avatars/sarah.jpg', color: 'bg-pink-500' },
      { id: 4, name: 'Lisa M.', avatar: '/avatars/lisa.jpg', color: 'bg-green-500' }
    ],
    dueDate: '2024-03-25'
  }
];

export const AssignedTasks = () => {
  const [view, setView] = useState<'upcoming' | 'overdue' | 'completed'>('upcoming');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="text-blue-600" size={24} />
          <h2 className="text-lg font-semibold text-gray-900">Tasks I've assigned</h2>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex space-x-6 border-b border-gray-200">
        {(['upcoming', 'overdue', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`pb-3 text-sm font-medium transition-colors ${
              view === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {MOCK_TASKS.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Due {new Date(task.dueDate).toLocaleDateString('fr-FR', { 
                    day: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
              <div className="flex -space-x-2">
                {task.assignees.map((assignee) => (
                  <div
                    key={assignee.id}
                    className={`w-8 h-8 rounded-full ${assignee.color} border-2 border-white flex items-center justify-center text-xs font-medium text-white`}
                    title={assignee.name}
                  >
                    {assignee.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-900">{task.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    task.progress >= 80
                      ? 'bg-green-500'
                      : task.progress >= 40
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                  }`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};