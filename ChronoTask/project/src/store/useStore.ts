import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, UserResponse, Task, DailyRoutine } from '../types';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  category: string;
  milestones: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface Store {
  user: User | null;
  currentStep: number;
  responses: UserResponse[];
  tasks: Task[];
  routines: DailyRoutine[];
  goals: Goal[];
  setUser: (user: User | null) => void;
  setCurrentStep: (step: number) => void;
  addResponse: (response: UserResponse) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addRoutine: (routine: DailyRoutine) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  logout: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      currentStep: 0,
      responses: [],
      tasks: [],
      routines: [],
      goals: [],
      
      setUser: (user) => set({ user }),
      setCurrentStep: (step) => set({ currentStep: step }),
      
      addResponse: (response) =>
        set((state) => ({
          responses: [...state.responses, response],
        })),
        
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
        
      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
        
      addRoutine: (routine) =>
        set((state) => ({
          routines: [...state.routines, routine],
        })),

      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, goal],
        })),

      updateGoal: (goalId, updates) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId ? { ...goal, ...updates } : goal
          ),
        })),

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, responses: [], tasks: [], routines: [], goals: [] });
      },
    }),
    {
      name: 'app-storage',
    }
  )
);