import React from 'react';
import styles from '../pages/user/Tasks.module.css';

type Props = { tasks?: any[] };

export default function ExportCSVClient({ tasks = [] }: Props) {
  const downloadCSV = () => {
    const headers = ['id', 'title', 'status', 'dueDate', 'labels'];
    const rows = tasks.map((t) =>
      [
        t._id ?? t.id ?? '',
        (t.title ?? '').toString().replace(/"/g, '""'),
        (t.status ?? '').toString(),
        t.dueDate ? new Date(t.dueDate).toISOString() : '',
        (t.labels || []).join(';'),
      ]
        .map((v: any) => {
          const s = String(v ?? '');
          return s.includes(',') || s.includes('\n') ? `"${s}"` : s;
        })
        .join(','),
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task_history_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button className={styles.btnExport} onClick={downloadCSV}>Export CSV (client)</button>;
}
