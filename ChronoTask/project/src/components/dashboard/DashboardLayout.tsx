import React from 'react';
import { useStore } from '../../store/useStore';
import { Bell, Search, Settings, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { TodoList } from './widgets/TodoList';
import { TimeTracker } from './widgets/TimeTracker';
import { Activity } from './widgets/Activity';
import { TasksView } from './TasksView';

export const DashboardLayout = () => {
  const { user } = useStore();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-gray-900">ChronoTask</div>
            <div className="text-sm text-gray-500">
              {format(new Date(), 'EEEE, MMMM d', { locale: fr })}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Bell size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Settings size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.email?.[0].toUpperCase()}
                </span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-light text-gray-600 mb-8">
            Bonjour, <span className="text-gray-900 font-normal">{user?.email?.split('@')[0]}</span>
          </h1>

          <div className="grid grid-cols-12 gap-6">
            {/* To-do List */}
            <div className="col-span-4 bg-white rounded-xl shadow-sm p-6">
              <TodoList />
            </div>

            {/* Time Tracker */}
            <div className="col-span-4 bg-white rounded-xl shadow-sm p-6">
              <TimeTracker />
            </div>

            {/* Working Hours */}
            <div className="col-span-4 bg-white rounded-xl shadow-sm p-6">
              <Activity />
            </div>

            {/* Task Board */}
            <div className="col-span-12 bg-white rounded-xl shadow-sm p-6">
              <TasksView />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};