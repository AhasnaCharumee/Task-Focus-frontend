import { useEffect, useRef } from 'react';
import api from '../api/axiosConfig';

type EventCallback = (event: { type: string; data: any }) => void;

// Lightweight SSE via fetch so we can send Authorization header
export function useSSE(url: string, onEvent: EventCallback) {
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const controller = new AbortController();
    abortRef.current = controller;

    // Resolve the full URL against axios baseURL (fallback to VITE_API_URL or window.location.origin)
    const base = (api && (api.defaults as any)?.baseURL) || import.meta.env.VITE_API_URL || window.location.origin;
    let fullUrl: string;
    try {
      fullUrl = url.startsWith('http') ? url : new URL(url, base).toString();
    } catch (e) {
      // Fallback: if URL construction fails, try simple concatenation
      fullUrl = base.replace(/\/$/, '') + '/' + url.replace(/^\//, '');
    }

    (async () => {
      try {
        const res = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            Accept: 'text/event-stream',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          console.warn('SSE connection failed', res.status, res.statusText, fullUrl);
          return;
        }

        if (!res.body) return;

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          let index;
          while ((index = buf.indexOf('\n\n')) !== -1) {
            const chunk = buf.slice(0, index).trim();
            buf = buf.slice(index + 2);
            // parse event chunk
            const lines = chunk.split(/\r?\n/);
            let eventType = 'message';
            let data = '';
            for (const line of lines) {
              if (line.startsWith('event:')) eventType = line.replace(/^event:\s?/, '').trim();
              if (line.startsWith('data:')) data += line.replace(/^data:\s?/, '') + '\n';
            }
            if (data) {
              try {
                const parsed = JSON.parse(data.trim());
                onEvent({ type: eventType, data: parsed });
              } catch (e) {
                // non-json data
                onEvent({ type: eventType, data: data.trim() });
              }
            }
          }
        }
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return;
        console.error('SSE connection error', err);
      }
    })();

    return () => {
      controller.abort();
      abortRef.current = null;
    };
  }, [url, onEvent]);
}

export default useSSE;
