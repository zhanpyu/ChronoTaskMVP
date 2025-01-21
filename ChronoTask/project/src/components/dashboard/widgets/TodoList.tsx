import React, { useState } from 'react';
import { Plus, CheckCircle2, X, Trash2 } from 'lucide-react';
import { useStore } from '../../../store/useStore';

export const TodoList = () => {
  const { tasks, addTask, updateTask } = useStore();
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const priorityTasks = tasks.filter(task => task.priority === 'high' && task.status !== 'done').slice(0, 5);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTask({
        id: Date.now().toString(),
        title: newTodo,
        priority: 'high',
        status: 'todo',
        category: 'Tâche rapide'
      });
      setNewTodo('');
      setIsAddingTodo(false);
    }
  };

  const clearCompletedTodos = () => {
    tasks
      .filter(task => task.priority === 'high' && task.status === 'done')
      .forEach(task => {
        updateTask(task.id, { priority: 'medium' });
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <span>✏️</span>
          <span>Liste rapide</span>
        </h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={clearCompletedTodos}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Nettoyer les tâches terminées"
          >
            <Trash2 size={20} />
          </button>
          <button 
            onClick={() => setIsAddingTodo(true)}
            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {isAddingTodo && (
        <form onSubmit={handleAddTodo} className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Nouvelle tâche..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsAddingTodo(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Ajouter
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {priorityTasks.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            Aucune tâche prioritaire
          </div>
        ) : (
          priorityTasks.map((todo) => (
            <div 
              key={todo.id} 
              className={`group flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                todo.status === 'done' ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => {
                  const newStatus = todo.status === 'done' ? 'todo' : 'done';
                  updateTask(todo.id, { status: newStatus });
                }}
                className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                  todo.status === 'done'
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 group-hover:border-blue-500'
                }`}
              >
                <CheckCircle2 size={14} className={todo.status === 'done' ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} />
              </button>
              <div className="flex-1 min-w-0">
                <div className={`text-sm ${todo.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {todo.title}
                </div>
                {todo.dueDate && (
                  <div className="mt-1 text-xs text-gray-400">
                    Pour le {new Date(todo.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {!isAddingTodo && (
        <button
          onClick={() => setIsAddingTodo(true)}
          className="w-full flex items-center justify-center space-x-2 py-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus size={16} />
          <span>Créer une nouvelle tâche</span>
        </button>
      )}
    </div>
  );
};