import React, { useMemo } from 'react';
import type { Task } from '../../types/Task';
import styles from './AICard.module.css';

// Lightbulb Icon
const Lightbulb: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1.3-.8-2.6-2.3-3.1.2-1.3-.8-2.6-2.3-3.1-.2-1.3.8-2.6 2.3-3.1 1.5.5 2.5 1.8 2.3 3.1z" />
    <path d="M12 22h-.01" />
    <path d="M17 21H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2z" />
  </svg>
);

export default function ContextSuggestions({ tasks }: { tasks: Task[] }) {
  const now = new Date();
  const day = now.getDay(); // 0 Sun .. 1 Mon
  const hour = now.getHours();

  const suggestions = useMemo(() => {
    if (!tasks || tasks.length === 0) return ['Add tasks to get context-aware suggestions'];
    // Priority: dueDate soon, then labels like urgent
    const withScore = tasks
      .map((t) => {
        let score = 0;
        if (t.dueDate) {
          const d = Date.parse(t.dueDate);
          if (!isNaN(d)) {
            const diff = (d - Date.now()) / 3600 / 1000;
            if (diff < 24) score += 50;
            else if (diff < 72) score += 20;
          }
        }
        const labels = (t.labels || []).join(' ');
        if (labels.includes('urgent')) score += 30;
        if (labels.includes('work') && day === 1 && hour < 12) score += 10; // Monday morning boost for work
        return { t, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);

    return withScore.map(
      (item) =>
        `Focus on: "${item.t.title || 'Untitled'}" (priority score: ${item.score})`
    );
  }, [tasks, day, hour]);

  const contextHint =
    day === 1 && hour < 12
      ? 'It is Monday morning — consider deep work tasks.'
      : 'Suggestions adjust based on time and labels.';

  return (
    <div className={styles.card}>
      <Lightbulb size={24} className={styles.cardIcon} />
      <h3 className={styles.heading}>Context Suggestions</h3>
      <p className={styles.description}>Actionable insights based on your current workload.</p>
      <ul className={styles.suggestionList}>
        {suggestions.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </ul>
      <div className={styles.contextText}>{contextHint}</div>
    </div>
  );
}
