export interface Question {
  id: string;
  text: string;
  options?: string[];
  type: 'text' | 'select' | 'time' | 'multiselect';
}

export interface UserResponse {
  questionId: string;
  answer: string | string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: Date;
  category: string;
}

export interface DailyRoutine {
  id: string;
  time: string;
  activity: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'task' | 'routine' | 'goal';
  priority: 'high' | 'medium' | 'low';
  description?: string;
  category?: string;
}