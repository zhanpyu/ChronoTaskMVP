import React from 'react';
import { useStore } from '../../store/useStore';

interface DailyScheduleProps {
  wakeTime: string;
}

export const DailySchedule = ({ wakeTime }: DailyScheduleProps) => {
  const { routines } = useStore();

  return (
    <div className="space-y-3">
      {wakeTime && (
        <div className="flex items-center space-x-2">
          <div className="w-16 text-gray-400 text-sm">{wakeTime}</div>
          <div className="flex-1">
            <div className="h-10 flex items-center px-4 bg-emerald-500/10 text-emerald-400 rounded-lg">
              Réveil
            </div>
          </div>
        </div>
      )}
      
      {routines.map((routine) => (
        <div key={routine.id} className="flex items-center space-x-2">
          <div className="w-16 text-gray-400 text-sm">{routine.time}</div>
          <div className="flex-1">
            <div
              className={`h-10 flex items-center px-4 rounded-lg ${
                routine.priority === 'high'
                  ? 'bg-red-500/10 text-red-400'
                  : routine.priority === 'medium'
                  ? 'bg-yellow-500/10 text-yellow-400'
                  : 'bg-green-500/10 text-green-400'
              }`}
            >
              {routine.activity}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};