import React, { useEffect, useState } from 'react';
import AIGoalBreaker from '../../components/ai/AIGoalBreaker';
import SentimentTracker from '../../components/ai/SentimentTracker';
import HabitTracker from '../../components/ai/HabitTracker';
import ContextSuggestions from '../../components/ai/ContextSuggestions';
import { getTasks } from '../../services/taskService';

export default function AIDashboard(){
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(()=>{ (async()=>{ const data = await getTasks(); setTasks(Array.isArray(data)?data:[]); })(); }, []);

  return (
    <div style={{ padding: 16, maxWidth: 900 }}>
      <h2>AI Dashboard</h2>
      <p style={{ color:'#666' }}>Quick AI tools: break goals, sentiment, habit tracker, and context suggestions.</p>

      <AIGoalBreaker />
      <SentimentTracker tasks={tasks} />
      <ContextSuggestions tasks={tasks} />
      <HabitTracker />
    </div>
  );
}
