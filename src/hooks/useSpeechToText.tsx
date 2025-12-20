import { useState, useRef } from 'react';

type UseSpeechReturn = {
  text: string;
  listening: boolean;
  startListening: (lang?: string) => void;
  stopListening: () => void;
  setText: (t: string) => void;
};

export default function useSpeechToText(defaultLang = 'si-LK'): UseSpeechReturn {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = (lang?: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support the Web Speech API');
      return;
    }

    try {
      // re-create each start to ensure fresh event handlers
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = lang || defaultLang || 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (ev: any) => {
        const t = ev.results && ev.results[0] && ev.results[0][0] && ev.results[0][0].transcript;
        if (t) setText(t);
      };

      recognitionRef.current.onerror = (err: any) => {
        console.error('Speech recognition error', err);
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };

      recognitionRef.current.start();
      setListening(true);
    } catch (err) {
      console.error('failed to start recognition', err);
      setListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setListening(false);
  };

  return { text, listening, startListening, stopListening, setText };
}
