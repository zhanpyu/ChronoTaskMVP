import React from 'react';
import { Layout, Calendar, ListTodo, Target, Clock } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'overview', icon: Layout, label: 'Vue d\'ensemble' },
  { id: 'tasks', icon: ListTodo, label: 'Tâches' },
  { id: 'calendar', icon: Calendar, label: 'Calendrier' },
  { id: 'goals', icon: Target, label: 'Objectifs' },
  { id: 'routines', icon: Clock, label: 'Routines' },
];

export const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700">
      <div className="p-6">
        <div className="text-emerald-400 font-bold text-xl mb-8">MaVieOrganisée</div>
        <nav className="space-y-2">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                currentView === id
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};