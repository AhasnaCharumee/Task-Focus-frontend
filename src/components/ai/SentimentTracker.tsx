import React, { useMemo } from 'react';
import type { Task } from '../../types/Task';
import styles from './AICard.module.css';

// Smile Icon
const Smile: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
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
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const POS = [
  'good',
  'great',
  'done',
  'completed',
  'happy',
  'love',
  'awesome',
  'positive',
  'progress',
  'win',
  'success',
];
const NEG = [
  'bad',
  'stuck',
  'delay',
  'delayed',
  'fail',
  'failure',
  'problem',
  'blocked',
  'angry',
  'sad',
  'frustrat',
  'stress',
  'overwhelm',
];

function scoreText(s: string) {
  const lower = (s || '').toLowerCase();
  let score = 0;
  POS.forEach((p) => {
    if (lower.includes(p)) score += 1;
  });
  NEG.forEach((p) => {
    if (lower.includes(p)) score -= 1;
  });
  return score;
}

export default function SentimentTracker({ tasks }: { tasks: Task[] }) {
  const result = useMemo(() => {
    if (!tasks || tasks.length === 0) return { score: 0, avg: 0, total: 0, sentimentRate: 0 };
    const scores = tasks.map((t) => scoreText((t.title || '') + ' ' + (t.description || '')));
    const sum = scores.reduce((a, b) => a + b, 0);
    const positiveCount = scores.filter((s) => s > 0).length;
    const sentimentRate = tasks.length > 0 ? (positiveCount / tasks.length) * 100 : 0;
    return { score: sum, avg: sum / tasks.length, total: tasks.length, sentimentRate };
  }, [tasks]);

  const sentimentStatus =
    result.sentimentRate > 70 ? 'Positive' : result.sentimentRate > 40 ? 'Neutral' : 'Needs Attention';

  return (
    <div className={styles.card}>
      <Smile size={24} className={styles.cardIcon} />
      <h3 className={styles.heading}>Sentiment Tracker</h3>
      <p className={styles.description}>Analyzes the emotional tone of your tasks.</p>
      <div className={styles.statDisplay}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{result.total}</span>
          <span className={styles.statLabel}>Total Tasks</span>
        </div>
        <div className={styles.statItem}>
          <span
            className={styles.statValue}
            style={{
              color:
                sentimentStatus === 'Positive'
                  ? '#059669'
                  : sentimentStatus === 'Needs Attention'
                  ? '#dc2626'
                  : '#f59e0b',
            }}
          >
            {result.sentimentRate.toFixed(1)}%
          </span>
          <span className={styles.statLabel}>Positive Rate</span>
        </div>
      </div>
      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
        Status: <strong style={{ color: '#4f46e5' }}>{sentimentStatus}</strong>
      </p>
    </div>
  );
}
