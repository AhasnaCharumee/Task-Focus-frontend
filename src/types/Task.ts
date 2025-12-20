export interface Task {
  _id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Optional labels/tags for categorization and filtering
  labels?: string[];
  // Optional recurrence configuration (matches backend recurrence subdocument)
  recurrence?: {
    enabled?: boolean;
    frequency?: "daily" | "weekly" | "monthly";
    interval?: number; // every N (days/weeks/months)
    daysOfWeek?: number[]; // for weekly recurrence: 0=Sun..6=Sat
    startDate?: string; // ISO date string
    endDate?: string; // ISO date string
    nextRun?: string; // ISO date string
    lastRun?: string; // ISO date string
  };
  // Reminder offsets in minutes before dueDate (e.g., [60, 10] = 1 hour and 10 minutes before)
  reminders?: number[];
}
