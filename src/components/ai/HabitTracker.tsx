import React, { useEffect, useState } from 'react';
import styles from './AICard.module.css';

// Zap Icon
const Zap: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

type Habit = { id: string; title: string; streak: number; lastDone?: string };

const STORAGE_KEY = 'ai_habits_v1';

function loadHabits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Habit[]) : [];
  } catch {
    return [];
  }
}
function saveHabits(h: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  const add = () => {
    if (!title.trim()) return;
    const h: Habit = { id: Date.now().toString(), title: title.trim(), streak: 0 };
    const next = [h, ...habits];
    setHabits(next);
    saveHabits(next);
    setTitle('');
  };

  const toggleDone = (id: string) => {
    const today = new Date().toISOString().slice(0, 10);
    const next = habits.map((h) => {
      if (h.id !== id) return h;
      if (h.lastDone === today) {
        // undo
        return { ...h, lastDone: undefined, streak: Math.max(0, h.streak - 1) };
      }
      return {
        ...h,
        lastDone: today,
        streak:
          h.lastDone === undefined
            ? h.streak + 1
            : h.lastDone.slice(0, 10) === today
            ? h.streak
            : h.streak + 1,
      };
    });
    setHabits(next);
    saveHabits(next);
  };

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const status =
    totalStreak > 20 ? 'Excellent Progress!' : totalStreak > 10 ? 'Good Momentum' : 'Building Habits';

  return (
    <div className={styles.card}>
      <Zap size={24} className={styles.cardIcon} />
      <h3 className={styles.heading}>Habit Tracker</h3>
      <p className={styles.description}>Track your consistency in recurring activities.</p>
      <div className={styles.statDisplay}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalStreak} days</span>
          <span className={styles.statLabel}>Total Streak</span>
        </div>
      </div>
      <div className={`${styles.statusBadge} ${styles.statusOnTrack}`}>{status}</div>
      <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
        <input
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New habit (e.g. Morning pages)"
        />
        <button className={styles.button} onClick={add}>
          Add
        </button>
      </div>
      <div className={styles.habitGrid}>
        {habits.length === 0 && <div className={styles.emptyState}>No habits yet</div>}
        {habits.map((h) => (
          <div key={h.id} className={styles.habitItem}>
            <div>
              <div className={styles.habitTitle}>{h.title}</div>
              <div className={styles.habitStreak}>
                Streak: {h.streak} {h.lastDone ? `(last: ${h.lastDone.slice(0, 10)})` : ''}
              </div>
            </div>
            <div>
              <button className={styles.button} onClick={() => toggleDone(h.id)}>
                {h.lastDone && h.lastDone.slice(0, 10) === new Date().toISOString().slice(0, 10)
                  ? 'Done ✓'
                  : 'Mark Done'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
