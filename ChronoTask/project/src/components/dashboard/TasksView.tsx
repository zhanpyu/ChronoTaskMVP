import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, MoreVertical, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types';

const TASK_STATUS = {
  todo: { label: 'À faire', color: 'bg-gray-100' },
  'in-progress': { label: 'En cours', color: 'bg-blue-50' },
  done: { label: 'Terminé', color: 'bg-green-50' },
};

export const TasksView = () => {
  const { tasks, addTask, updateTask } = useStore();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    category: '',
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    
    updateTask(taskId, { status: newStatus });
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: 'todo',
        category: newTask.category,
      });
      setNewTask({ title: '', description: '', priority: 'medium', category: '' });
      setIsAddingTask(false);
    }
  };

  const clearCompletedTasks = () => {
    tasks
      .filter(task => task.status === 'done')
      .forEach(task => {
        const taskIndex = tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
        }
      });
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Tableau des tâches</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearCompletedTasks}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
            <span>Nettoyer les tâches terminées</span>
          </button>
          <button
            onClick={() => setIsAddingTask(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            <span>Nouvelle tâche</span>
          </button>
        </div>
      </div>

      {isAddingTask && (
        <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Titre de la tâche"
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Description (optionnel)"
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <div className="flex space-x-4">
              <select
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
              >
                <option value="low">Priorité basse</option>
                <option value="medium">Priorité moyenne</option>
                <option value="high">Priorité haute</option>
              </select>
              <input
                type="text"
                placeholder="Catégorie"
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingTask(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(TASK_STATUS).map(([status, { label, color }]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${color} p-4 rounded-lg`}
                >
                  <h3 className="font-semibold mb-4">{label}</h3>
                  <div className="space-y-3">
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow-sm"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{task.title}</h4>
                                  {task.description && (
                                    <p className="text-sm text-gray-600 mt-1">
                                      {task.description}
                                    </p>
                                  )}
                                  {task.category && (
                                    <span className="inline-block mt-2 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                                      {task.category}
                                    </span>
                                  )}
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                  <MoreVertical size={16} />
                                </button>
                              </div>
                              <div className="mt-2">
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded ${
                                    task.priority === 'high'
                                      ? 'bg-red-50 text-red-700'
                                      : task.priority === 'medium'
                                      ? 'bg-yellow-50 text-yellow-700'
                                      : 'bg-green-50 text-green-700'
                                  }`}
                                >
                                  {task.priority === 'high'
                                    ? 'Priorité haute'
                                    : task.priority === 'medium'
                                    ? 'Priorité moyenne'
                                    : 'Priorité basse'}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};