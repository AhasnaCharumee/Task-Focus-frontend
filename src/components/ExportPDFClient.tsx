import React from 'react';
import styles from '../pages/user/Tasks.module.css';

type Props = { tasks?: any[] };

// Dependency-free PDF export: creates a printable document without popups
export default function ExportPDFClient({ tasks = [] }: Props) {
  const downloadPDF = () => {
    // Create an iframe for printing (avoids popup blockers)
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      alert('Failed to create print document. Please try again.');
      document.body.removeChild(iframe);
      return;
    }

    const styles = `
      <style>
        body { font-family: Arial, Helvetica, sans-serif; padding: 20px; }
        h1 { font-size: 18px; margin-bottom: 20px; }
        .task { margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #e0e0e0; }
        .meta { color: #666; font-size: 12px; margin-top: 5px; }
        @media print {
          body { padding: 10px; }
        }
      </style>
    `;
    
    const rows = tasks.map((t, idx) => {
      const due = t.dueDate ? new Date(t.dueDate).toLocaleString() : 'n/a';
      const labels = (t.labels || []).join(';');
      return `<div class="task"><div><strong>${idx + 1}. ${escapeHtml(String(t.title || ''))}</strong></div><div class="meta">status: ${escapeHtml(String(t.status ?? ''))} • due: ${escapeHtml(due)} • labels: ${escapeHtml(labels)}</div></div>`;
    }).join('\n');
    
    iframeDoc.open();
    iframeDoc.write(`<!doctype html><html><head><title>Tasks Export</title>${styles}</head><body><h1>Tasks Export</h1>${rows}</body></html>`);
    iframeDoc.close();
    
    // Wait for content to load, then trigger print dialog
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        
        // Clean up after printing or if user cancels
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 100);
      } catch (err) {
        console.error('Print failed:', err);
        document.body.removeChild(iframe);
        alert('Failed to open print dialog. Please try again.');
      }
    }, 300);
  };

  function escapeHtml(s: string) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
  }

  return <button className={styles.btnExport} onClick={downloadPDF}>Export PDF (client)</button>;
}
