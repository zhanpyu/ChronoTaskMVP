import React, { useState, useEffect, useMemo } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth, isSameDay, addMonths, subMonths, parseISO, startOfDay, endOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CalendarEvent, Task, DailyRoutine } from '../../types';

type ViewType = 'day' | 'week' | 'month';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const TIME_SLOTS = HOURS.map(hour => ({
  hour,
  label: format(new Date().setHours(hour, 0), 'HH:mm')
}));

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('week');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  
  const { tasks, routines, goals } = useStore();

  // Optimisation : Mémoisation des événements
  const memoizedEvents = useMemo(() => {
    const taskEvents = tasks.map((task: Task) => ({
      id: `task-${task.id}`,
      title: task.title,
      start: task.dueDate ? startOfDay(new Date(task.dueDate)) : startOfDay(new Date()),
      end: task.dueDate ? endOfDay(new Date(task.dueDate)) : endOfDay(new Date()),
      type: 'task' as const,
      priority: task.priority,
      description: task.description,
      category: task.category
    }));

    const routineEvents = routines.map((routine: DailyRoutine) => {
      const [hours, minutes] = routine.time.split(':');
      const start = new Date();
      start.setHours(parseInt(hours), parseInt(minutes), 0);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + routine.duration);

      return {
        id: `routine-${routine.id}`,
        title: routine.activity,
        start,
        end,
        type: 'routine' as const,
        priority: routine.priority
      };
    });

    return [...taskEvents, ...routineEvents];
  }, [tasks, routines]);

  useEffect(() => {
    setEvents(memoizedEvents);
  }, [memoizedEvents]);

  const renderDayView = () => {
    const dayEvents = events.filter(event => 
      isSameDay(event.start, currentDate)
    );

    return (
      <div className="flex flex-col h-[calc(100vh-12rem)] overflow-y-auto">
        {TIME_SLOTS.map(({ hour, label }) => {
          const hourEvents = dayEvents.filter(event => 
            event.start.getHours() === hour
          );

          return (
            <div key={hour} className="flex min-h-[80px] border-b border-gray-700">
              <div className="w-24 py-3 text-sm text-gray-400 text-right pr-4 font-medium">
                {label}
              </div>
              <div className="flex-1 relative">
                {hourEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEventModal(true);
                    }}
                    className={`absolute w-[calc(100%-1rem)] ml-2 p-3 rounded-lg cursor-pointer transition-all hover:transform hover:scale-[1.02] ${
                      event.priority === 'high'
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : event.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    }`}
                    style={{
                      top: `${(event.start.getMinutes() / 60) * 100}%`,
                      height: `${Math.max(((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 100, 25)}%`,
                      zIndex: event.priority === 'high' ? 3 : event.priority === 'medium' ? 2 : 1
                    }}
                  >
                    <div className="text-sm font-medium line-clamp-1">{event.title}</div>
                    {event.type === 'task' && event.category && (
                      <div className="text-xs opacity-75 mt-1 line-clamp-1">{event.category}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate, { locale: fr });
    const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    return (
      <div className="flex flex-col h-[calc(100vh-12rem)] overflow-auto">
        <div className="flex border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          <div className="w-24" />
          {days.map(day => (
            <div
              key={day.toString()}
              className="flex-1 text-center py-3 text-sm font-medium text-gray-300"
            >
              {format(day, 'EEE d', { locale: fr })}
            </div>
          ))}
        </div>
        <div className="flex-1 relative">
          {TIME_SLOTS.map(({ hour, label }) => (
            <div key={hour} className="flex min-h-[80px] border-b border-gray-700">
              <div className="w-24 py-3 text-sm text-gray-400 text-right pr-4 font-medium sticky left-0">
                {label}
              </div>
              {days.map(day => {
                const dayEvents = events.filter(event => 
                  isSameDay(event.start, day) && event.start.getHours() === hour
                );

                return (
                  <div key={day.toString()} className="flex-1 relative border-l border-gray-700">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                        className={`absolute w-[calc(100%-0.5rem)] ml-1 p-2 rounded-lg cursor-pointer transition-all hover:transform hover:scale-[1.02] ${
                          event.priority === 'high'
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : event.priority === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                        }`}
                        style={{
                          top: `${(event.start.getMinutes() / 60) * 100}%`,
                          height: `${Math.max(((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 100, 25)}%`,
                          zIndex: event.priority === 'high' ? 3 : event.priority === 'medium' ? 2 : 1
                        }}
                      >
                        <div className="text-sm font-medium line-clamp-1">{event.title}</div>
                        {event.type === 'task' && event.category && (
                          <div className="text-xs opacity-75 mt-0.5 line-clamp-1">{event.category}</div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const startDate = startOfWeek(start, { locale: fr });
    
    // Optimisation : Calcul des semaines
    const weeks = useMemo(() => {
      const result = [];
      let currentWeek = [];
      let day = startDate;

      while (day <= end || currentWeek.length > 0) {
        if (currentWeek.length === 7) {
          result.push(currentWeek);
          currentWeek = [];
        }
        currentWeek.push(day);
        day = addDays(day, 1);
      }
      if (currentWeek.length > 0) {
        result.push(currentWeek);
      }
      return result;
    }, [currentDate]);

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-700 rounded-lg overflow-hidden">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="bg-gray-800 p-3 text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const dayEvents = events.filter(event => isSameDay(event.start, day));
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`bg-gray-800 min-h-[120px] p-2 transition-colors hover:bg-gray-750 ${
                  !isCurrentMonth ? 'opacity-50' : ''
                }`}
                onClick={() => {
                  setSelectedSlot(day);
                  setShowEventModal(true);
                }}
              >
                <div className="text-sm font-medium text-gray-400 mb-2">
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setShowEventModal(true);
                      }}
                      className={`text-xs p-2 rounded-lg truncate cursor-pointer transition-all hover:transform hover:scale-[1.02] ${
                        event.priority === 'high'
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          : event.priority === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      }`}
                    >
                      <div className="font-medium line-clamp-1">{event.title}</div>
                      {event.type === 'task' && event.category && (
                        <div className="opacity-75 mt-0.5 text-[10px] line-clamp-1">{event.category}</div>
                      )}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-400 py-1 px-2 bg-gray-700/50 rounded-lg">
                      +{dayEvents.length - 3} autres
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Calendrier</h1>
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
            {(['day', 'week', 'month'] as ViewType[]).map((type) => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewType === type
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type === 'day' ? 'Jour' : type === 'week' ? 'Semaine' : 'Mois'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (viewType === 'month') {
                  setCurrentDate(subMonths(currentDate, 1));
                } else {
                  setCurrentDate(addDays(currentDate, -7));
                }
              }}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-white font-medium">
              {viewType === 'month'
                ? format(currentDate, 'MMMM yyyy', { locale: fr })
                : format(currentDate, 'd MMMM yyyy', { locale: fr })}
            </span>
            <button
              onClick={() => {
                if (viewType === 'month') {
                  setCurrentDate(addMonths(currentDate, 1));
                } else {
                  setCurrentDate(addDays(currentDate, 7));
                }
              }}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedEvent(null);
              setSelectedSlot(new Date());
              setShowEventModal(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus size={20} />
            <span>Nouvel événement</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {viewType === 'day' && renderDayView()}
        {viewType === 'week' && renderWeekView()}
        {viewType === 'month' && renderMonthView()}
      </div>

      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                {selectedEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  defaultValue={selectedEvent?.title}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Date de début
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    defaultValue={selectedEvent?.start.toISOString().slice(0, 16)}
                    step="1800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Date de fin
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    defaultValue={selectedEvent?.end.toISOString().slice(0, 16)}
                    step="1800"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows={3}
                  defaultValue={selectedEvent?.description}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Priorité
                </label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  defaultValue={selectedEvent?.priority || 'medium'}
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                {selectedEvent && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  {selectedEvent ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};