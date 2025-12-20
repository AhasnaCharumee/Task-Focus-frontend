import React from "react";
import type { Task } from "../types/Task";
import styles from "../pages/user/Tasks.module.css";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit, onToggleComplete }) => {
  const isCompleted = Boolean(task.completed);
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    console.log('Checkbox clicked for task:', task.title, 'Current completed:', task.completed, 'Will set to:', !isCompleted);
    onToggleComplete(task);
  };
  
  return (
    <div className={`${styles.taskItem} ${isCompleted ? styles.completed : ''}`}>
      {/* Checkbox for completion */}
      <input 
        type="checkbox" 
        checked={isCompleted}
        onChange={handleCheckboxChange}
        className={styles.taskCheckbox}
        title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
      />
      
      <div className={styles.taskContent}>
        <span className={styles.taskTitle}>{task.title}</span>
      </div>

      {/* Task Meta Info */}
      <div className={styles.taskMeta}>
        {task.dueDate && (
          <span className={styles.taskDuedate}>
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        {task.labels && task.labels.length > 0 && (
          task.labels.map((lbl) => (
            <span key={lbl} className={styles.taskLabel}>
              🏷️ {lbl}
            </span>
          ))
        )}
        {task.recurrence?.enabled && (
          <span className={styles.taskRecurrence}>
            🔄 {task.recurrence.frequency}
            {task.recurrence.interval && task.recurrence.interval > 1 ? ` ×${task.recurrence.interval}` : ''}
          </span>
        )}
        {task.reminders && task.reminders.length > 0 && (
          <span className={styles.taskReminders}>
            🔔 {task.reminders.length}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className={styles.taskActions}>
        <button className={styles.btnEdit} onClick={() => onEdit(task)} title="Edit this task">
          ✏️ Edit
        </button>
        <button className={styles.btnDelete} onClick={() => onDelete(task._id)} title="Delete this task">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
