import React, { useState } from 'react';
import { generateMotivationService } from '../../services/aiService';
import styles from './AICard.module.css';

// Target Icon
const Target: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
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
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default function AIGoalBreaker() {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [subtasks, setSubtasks] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const localBreakdown = (text: string) => {
    // very simple heuristic: split sentences and produce 3 steps
    const parts = text.split(/[\.\n\-\—]/).map(p => p.trim()).filter(Boolean);
    if (parts.length >= 3) return parts.slice(0, 5);
    const words = text.split(/\s+/).filter(Boolean);
    const per = Math.max(1, Math.floor(words.length / 6));
    const out: string[] = [];
    for (let i = 0; i < Math.min(3, Math.ceil(words.length / per)); i++) {
      out.push(words.slice(i * per, (i + 1) * per).join(' '));
    }
    return out;
  };

  const generate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setError(null);
    setSubtasks(null);
    try {
      // try backend AI for richer result; fall back to local heuristic
      try {
        const res: any = await generateMotivationService([goal]);
        if (res && (res.suggestions || res.data || res.message)) {
          const text = res.suggestions || res.data?.suggestions || res.message || JSON.stringify(res);
          setSubtasks(text.split(/\n+/).map((s:string)=>s.trim()).filter(Boolean));
          return;
        }
      } catch (e) {
        // ignore backend failure, use local
      }

      const local = localBreakdown(goal);
      setSubtasks(local as string[]);
    } catch (err:any) {
      setError(err?.message || 'Failed to generate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <Target size={24} className={styles.cardIcon} />
      <h3 className={styles.heading}>AI Goal Breaker</h3>
      <p className={styles.description}>Turn a large goal into manageable steps.</p>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.inputField}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter large goal (e.g. Ship release v1.2)"
        />
        <button className={styles.button} onClick={generate} disabled={loading}>
          {loading ? 'Generating...' : 'Break Down'}
        </button>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          setGoal('');
          setSubtasks(null);
          setError(null);
        }}
        style={{ width: '100%', marginTop: '0.5rem' }}
      >
        Clear
      </button>
      {error && <div style={{ color: '#b91c1c', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</div>}
      {subtasks && (
        <div className={styles.planOutput} style={{ marginTop: '0.75rem' }}>
          {subtasks.map((s, i) => (
            <div key={i} style={{ marginBottom: '0.25rem' }}>
              {i + 1}. {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
