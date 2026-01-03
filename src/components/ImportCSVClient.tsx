import { useState } from 'react';
import styles from '../pages/user/Tasks.module.css';

type Props = {
  onUploaded?: () => void;
};

export default function ImportCSVClient({ onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file, file.name);
      const resp = await fetch('/api/export/import', {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || `Import failed (${resp.status})`);
      }
      setUploading(false);
      onUploaded?.();
      alert('Import successful');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Import failed');
      setUploading(false);
    }
  };

  return (
    <div>
      <label className={styles.btnImportLabel}>
        Import CSV
        <input
          type="file"
          accept="text/csv"
          disabled={uploading}
          onChange={(e) => handleFile(e.target.files?.[0])}
          style={{ display: 'none' }}
        />
      </label>
      {uploading && <span style={{ marginLeft: 8 }}>Uploading...</span>}
      {error && <div style={{ color: 'crimson', marginTop: 6 }}>{error}</div>}
    </div>
  );
}
