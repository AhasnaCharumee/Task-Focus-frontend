import React, { useEffect } from 'react';
import styles from '../pages/user/Tasks.module.css';

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  timeoutMs?: number;
};

export default function VoiceConfirmToast({ message, onConfirm, onCancel, timeoutMs = 8000 }: Props) {
  useEffect(() => {
    if (!timeoutMs) return;
    const id = setTimeout(() => onCancel?.(), timeoutMs);
    return () => clearTimeout(id);
  }, [message, timeoutMs, onCancel]);

  return (
    <div className={styles.voiceToastModal} aria-live="polite" role="status">
      <div className={styles.voiceToastContent}>
        <p className={styles.voiceMessage}>{message}</p>
        <div className={styles.voiceActions}>
          <button onClick={onCancel} className={styles.btnCancel}>Cancel</button>
          <button onClick={onConfirm} className={styles.btnConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
