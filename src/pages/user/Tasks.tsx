import React, { useEffect, useMemo, useState } from "react";
import useSpeechToText from "../../hooks/useSpeechToText";
import TaskItem from "../../components/TaskItem";
import type { Task } from "../../types/Task";
import { getTasks, createTaskAndNotify, updateTaskAndNotify, deleteTaskAndNotify } from "../../services/taskService";
import ExportCSVClient from "../../components/ExportCSVClient";
import ExportPDFClient from "../../components/ExportPDFClient";
import ImportCSVClient from "../../components/ImportCSVClient";
import VoiceConfirmToast from "../../components/VoiceConfirmToast";
import styles from "./Tasks.module.css";

// Helper function to convert ISO date string to yyyy-MM-dd format for date inputs
const formatDateForInput = (isoString: string | null | undefined): string => {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    // Format as yyyy-MM-dd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return "";
  }
};

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [labelsInput, setLabelsInput] = useState("");
  const [remindersInput, setRemindersInput] = useState("");
  const [dueDate, setDueDate] = useState<string | "">("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  // Edit modal state
  const [editModalTask, setEditModalTask] = useState<Task | null>(null);
  const [editRecurrenceEnabled, setEditRecurrenceEnabled] = useState<boolean>(false);
  const [editRecurrenceFrequency, setEditRecurrenceFrequency] = useState<"daily" | "weekly" | "monthly">("daily");
  const [editRecurrenceInterval, setEditRecurrenceInterval] = useState<number>(1);
  const [editRecurrenceDaysOfWeek, setEditRecurrenceDaysOfWeek] = useState<number[]>([]);
  const [editRecurrenceStartDate, setEditRecurrenceStartDate] = useState<string | "">("");
  const [editRecurrenceEndDate, setEditRecurrenceEndDate] = useState<string | "">("");
  const [editRemindersInput, setEditRemindersInput] = useState<string>("");
  const [editDueDate, setEditDueDate] = useState<string | "">("");
  const [editTitle, setEditTitle] = useState<string>("");
  // Recurrence form state
  const [recurrenceEnabled, setRecurrenceEnabled] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<"daily" | "weekly" | "monthly">("daily");
  const [recurrenceInterval, setRecurrenceInterval] = useState<number>(1);
  const [recurrenceDaysOfWeek, setRecurrenceDaysOfWeek] = useState<number[]>([]);
  const [recurrenceStartDate, setRecurrenceStartDate] = useState<string | "">("");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<string | "">("");

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      console.log('Tasks loaded:', data);
      if (data && data.length > 0) {
        console.log('First task completed field:', data[0].completed);
        console.log('First task full object:', JSON.stringify(data[0], null, 2));
      }
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  // Speech hooks (create + edit)
  const [selectedLang, setSelectedLang] = useState<'si-LK' | 'en-US'>('si-LK');

  const { text: createText, startListening: startCreateListeningRaw, stopListening: stopCreateListening, listening: createListening, setText: setCreateText } = useSpeechToText();
  const { text: editText, startListening: startEditListeningRaw, stopListening: stopEditListening, listening: editListening, setText: setEditText } = useSpeechToText();

  // wrappers to pass current selected language
  const startCreateListening = () => startCreateListeningRaw(selectedLang);
  const startEditListening = () => startEditListeningRaw(selectedLang);

  const addTask = async () => {
    if (!title.trim()) return;

    // parse labels input as comma-separated tags
    const labels = labelsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // parse reminders input as comma-separated minutes
    const reminders = remindersInput
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean)
      .map((s: string) => Number(s))
      .filter((n: number) => !Number.isNaN(n) && n > -1);

    // build recurrence object if enabled
    const recurrence = recurrenceEnabled
      ? {
          enabled: true,
          frequency: recurrenceFrequency,
          interval: recurrenceInterval || 1,
          daysOfWeek: recurrenceFrequency === "weekly" ? recurrenceDaysOfWeek : undefined,
          startDate: recurrenceStartDate || undefined,
          endDate: recurrenceEndDate || undefined,
        }
      : undefined;

    await createTaskAndNotify({ title, labels: labels.length ? labels : undefined, recurrence, reminders: reminders.length ? reminders : undefined });
    // include dueDate if provided
    // (note: backend calendar returns one-off tasks that have dueDate set)
    setTitle("");
    setLabelsInput("");
    setRemindersInput("");
    setDueDate("");
    // reset recurrence inputs
    setRecurrenceEnabled(false);
    setRecurrenceFrequency("daily");
    setRecurrenceInterval(1);
    setRecurrenceDaysOfWeek([]);
    setRecurrenceStartDate("");
    setRecurrenceEndDate("");
    loadTasks();
  };

  // update title from speech recognition for create
  // parsed voice fields and confirmation flow
  const [showCreateConfirm, setShowCreateConfirm] = useState<string | null>(null);
  const [parsedCreate, setParsedCreate] = useState<any>(null);
  const [showEditConfirm, setShowEditConfirm] = useState<string | null>(null);
  const [parsedEdit, setParsedEdit] = useState<any>(null);

  function parseFieldsFromText(text: string) {
    if (!text) return { title: text };
    let t = text;
    let dueDateISO: string | undefined;
    let labels: string[] = [];

    // labels: "labels: work;urgent" or "labels work and urgent"
    const labelsMatch = t.match(/labels?[:\s-]+([^,;]+)/i);
    if (labelsMatch) {
      let labs = labelsMatch[1];
      labs = labs.replace(/ and /gi, ';');
      labs = labs.replace(/,/g, ';');
      labels = labs.split(';').map((s) => s.trim()).filter(Boolean);
      t = t.replace(labelsMatch[0], '');
    }

    // due date patterns (simple): "due <date...>" or "due on <date...>"
    const dueMatch = t.match(/due\s+(?:date\s+|on\s+)?(.+?)(?:$|,|;|labels|reminder|reminders)/i);
    if (dueMatch) {
      const raw = dueMatch[1].trim();
      const parsed = Date.parse(raw);
      if (!isNaN(parsed)) {
        dueDateISO = new Date(parsed).toISOString();
        t = t.replace(dueMatch[0], '');
      }
    }

    t = t.replace(/\b(add|create|update)\b/ig, '').trim();
    return { title: t.trim(), dueDate: dueDateISO, labels };
  }

  useEffect(() => {
    if (!createText) return;
    const parsed = parseFieldsFromText(createText);
    setParsedCreate(parsed);
    setShowCreateConfirm(createText);
  }, [createText]);

  // sync editText from speech into the editTitle field
  useEffect(() => {
    if (!editText) return;
    const parsed = parseFieldsFromText(editText);
    setParsedEdit(parsed);
    setShowEditConfirm(editText);
  }, [editText]);

  // keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!(e.altKey && e.shiftKey)) return;
      const k = e.key.toLowerCase();
      if (k === 'v') {
        // toggle create listening
        if (createListening) stopCreateListening(); else startCreateListening();
      }
      if (k === 'e') {
        // toggle edit listening if modal open
        if (!editModalTask) return;
        if (editListening) stopEditListening(); else startEditListening();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [createListening, editListening, editModalTask, selectedLang]);

  const removeTask = async (id: string) => {
    await deleteTaskAndNotify(id);
    loadTasks();
  };

  const toggleTaskComplete = async (task: Task) => {
    const currentState = Boolean(task.completed);
    const newState = !currentState;
    console.log('toggleTaskComplete called for:', task.title, 'ID:', task._id, 'Current:', currentState, '→ New:', newState);
    try {
      const result = await updateTaskAndNotify(task._id, { completed: newState });
      console.log('Update result:', result);
      await loadTasks();
      console.log('Tasks reloaded successfully');
    } catch (err) {
      console.error('Failed to toggle task completion', err);
      alert(`Failed to update task: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const editTask = (task: Task) => {
    // Open modal and populate recurrence states from the task
    setEditModalTask(task);
    setEditTitle(task.title || '');
    try { setEditText(task.title || ''); } catch (e) { /* ignore if hook not ready */ }
    const r = task.recurrence || {};
    setEditRecurrenceEnabled(Boolean(r.enabled));
    setEditRecurrenceFrequency((r.frequency as any) || "daily");
    setEditRecurrenceInterval(r.interval || 1);
    setEditRecurrenceDaysOfWeek(Array.isArray(r.daysOfWeek) ? r.daysOfWeek : []);
    setEditRecurrenceStartDate(formatDateForInput(r.startDate));
    setEditRecurrenceEndDate(formatDateForInput(r.endDate));
    setEditRemindersInput((task.reminders || []).join(','));
    setEditDueDate(formatDateForInput((task as any).dueDate));
  };

  const saveEditRecurrence = async () => {
    if (!editModalTask) return;
    const recurrence = editRecurrenceEnabled
      ? {
          enabled: true,
          frequency: editRecurrenceFrequency,
          interval: editRecurrenceInterval || 1,
          daysOfWeek: editRecurrenceFrequency === 'weekly' ? editRecurrenceDaysOfWeek : undefined,
          startDate: editRecurrenceStartDate || undefined,
          endDate: editRecurrenceEndDate || undefined,
        }
      : { enabled: false };

    try {
      // include reminders if editing
      const editPayload: any = { recurrence };
      // include title change if provided
      if (editTitle && editModalTask && editTitle !== editModalTask.title) editPayload.title = editTitle;
      if (editDueDate) editPayload.dueDate = editDueDate;
      if (typeof editRemindersInput !== 'undefined') {
        const r = editRemindersInput
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
          .map((s: string) => Number(s))
          .filter((n: number) => !Number.isNaN(n) && n > -1);
        editPayload.reminders = r.length ? r : [];
      }
      await updateTaskAndNotify(editModalTask._id, editPayload);
      setEditModalTask(null);
      loadTasks();
    } catch (err) {
      console.error('Failed to save recurrence', err);
      alert('Failed to save recurrence');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // derive all unique labels from tasks
  const allLabels = useMemo(() => {
    const set = new Set<string>();
    tasks.forEach((t) => (t.labels || []).forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [tasks]);

  const visibleTasks = selectedLabel ? tasks.filter((t) => (t.labels || []).includes(selectedLabel)) : tasks;
  // Recurrence filter state
  const [showOnlyRecurring, setShowOnlyRecurring] = useState<boolean>(false);
  const [recurrenceFilterFrequencies, setRecurrenceFilterFrequencies] = useState<string[]>([]); // ['daily','weekly','monthly']

  const filteredByRecurrence = visibleTasks.filter((t) => {
    if (showOnlyRecurring && !t.recurrence?.enabled) return false;
    if (recurrenceFilterFrequencies.length > 0) {
      if (!t.recurrence?.enabled) return false;
      return recurrenceFilterFrequencies.includes(t.recurrence.frequency || '');
    }
    return true;
  });

  return (
<div className="task-page">
        <h2>Your Tasks</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
        <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          Language
          <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value as any)} style={{ marginLeft: 6 }}>
            <option value="si-LK">සිංහල (si-LK)</option>
            <option value="en-US">English (en-US)</option>
          </select>
        </label>
        <div style={{ color: '#666', fontSize: 13 }}>Voice shortcuts: Alt+Shift+V (create), Alt+Shift+E (edit)</div>
      </div>

      <div className={styles.taskForm}>
        <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={title}
            placeholder="Enter task title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="button"
            onClick={() => startCreateListening()}
            title="Start voice input"
            aria-pressed={createListening}
            aria-label="Start voice input for new task (Alt+Shift+V)"
            accessKey="v"
          >🎤</button>
          <button
            type="button"
            onClick={() => stopCreateListening()}
            title="Stop"
            aria-label="Stop voice input"
          >⏹</button>
          {createListening && <span style={{ marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, background: 'crimson', borderRadius: 10, display: 'inline-block' }} aria-hidden></span><span style={{ fontSize: 12, color: '#c00' }}>Listening...</span></span>}
        </div>
        <input
          type="text"
          value={labelsInput}
          placeholder="Labels (comma separated)"
          onChange={(e) => setLabelsInput(e.target.value)}
          style={{ marginLeft: 8 }}
        />
        <input
          type="text"
          value={remindersInput}
          placeholder="Reminders (minutes, comma separated)"
          onChange={(e) => setRemindersInput(e.target.value)}
          style={{ marginLeft: 8 }}
        />
        <input
          type="date"
          value={dueDate}
          placeholder="Due date"
          onChange={(e) => setDueDate(e.target.value)}
          style={{ marginLeft: 8 }}
        />
        <button onClick={addTask}>Add</button>

        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={recurrenceEnabled} onChange={(e) => setRecurrenceEnabled(e.target.checked)} />
            <span style={{ fontWeight: 600 }}>Recurring</span>
          </label>

          {recurrenceEnabled && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <label>
                Frequency
                <select value={recurrenceFrequency} onChange={(e) => setRecurrenceFrequency(e.target.value as any)} style={{ marginLeft: 6 }}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>

              <label>
                Every
                <input type="number" min={1} value={recurrenceInterval} onChange={(e) => setRecurrenceInterval(Number(e.target.value))} style={{ width: 64, marginLeft: 6 }} />
              </label>

              {recurrenceFrequency === 'weekly' && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, idx) => (
                    <label key={d} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <input
                        type="checkbox"
                        checked={recurrenceDaysOfWeek.includes(idx)}
                        onChange={(e) => {
                          if (e.target.checked) setRecurrenceDaysOfWeek((s) => Array.from(new Set([...s, idx])));
                          else setRecurrenceDaysOfWeek((s) => s.filter((x) => x !== idx));
                        }}
                      />
                      <span style={{ fontSize: 12 }}>{d}</span>
                    </label>
                  ))}
                </div>
              )}

              <label>
                Start
                <input type="date" value={recurrenceStartDate} onChange={(e) => setRecurrenceStartDate(e.target.value)} style={{ marginLeft: 6 }} />
              </label>
              <label>
                End
                <input type="date" value={recurrenceEndDate} onChange={(e) => setRecurrenceEndDate(e.target.value)} style={{ marginLeft: 6 }} />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Header Section */}
      <div className={styles.tasksHeader}>
        <div className={styles.tasksHeaderTop}>
          <h3 className={styles.tasksHeaderTitle}>📋 Your Tasks</h3>
          <div className={styles.tasksStats}>
            <div className={styles.taskStatItem}>
              Total: <span className={styles.taskStatValue}>{tasks.length}</span>
            </div>
            <div className={styles.taskStatItem}>
              Completed: <span className={styles.taskStatValue}>{tasks.filter(t => t.completed).length}</span>
            </div>
            <div className={styles.taskStatItem}>
              Recurring: <span className={styles.taskStatValue}>{tasks.filter(t => t.recurrence?.enabled).length}</span>
            </div>
          </div>
        </div>
        <div className={styles.tasksHeaderDescription}>
          {selectedLabel && (
            <div className={styles.descriptionTag + ' ' + styles.filter}>
              🏷️ Filter: <strong>{selectedLabel}</strong>
            </div>
          )}
          {showOnlyRecurring && (
            <div className={styles.descriptionTag}>
              🔄 Recurring only
            </div>
          )}
          {recurrenceFilterFrequencies.length > 0 && (
            <div className={styles.descriptionTag}>
              📅 {recurrenceFilterFrequencies.join(', ')}
            </div>
          )}
          {!selectedLabel && !showOnlyRecurring && recurrenceFilterFrequencies.length === 0 && (
            <div className={styles.descriptionTag}>
              ✨ Showing all tasks
            </div>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by label:</label>
          <select
            className={styles.filterSelect}
            value={selectedLabel ?? ""}
            onChange={(e) => setSelectedLabel(e.target.value || null)}
          >
            <option value="">All</option>
            {allLabels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          {selectedLabel && (
            <button className={styles.clearFilterBtn} onClick={() => setSelectedLabel(null)}>✕ Clear</button>
          )}
        </div>

        <div className={styles.filterGroup}>
          <label>
            <input type="checkbox" checked={showOnlyRecurring} onChange={(e) => setShowOnlyRecurring(e.target.checked)} />
            <span className={styles.filterLabel}>Show only recurring</span>
          </label>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Frequencies:</span>
          <div className={styles.frequencyChips}>
            {['daily','weekly','monthly'].map((f) => (
              <label key={f} className={styles.frequencyChip}>
                <input
                  type="checkbox"
                  checked={recurrenceFilterFrequencies.includes(f)}
                  onChange={(e) => {
                    if (e.target.checked) setRecurrenceFilterFrequencies((s) => Array.from(new Set([...s, f])));
                    else setRecurrenceFilterFrequencies((s) => s.filter((x) => x !== f));
                  }}
                />
                <span className={styles.chipLabel}>{f}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.taskList}>
          {filteredByRecurrence.length > 0 ? (
            filteredByRecurrence.map((t) => (
            <TaskItem key={t._id} task={t} onDelete={removeTask} onEdit={editTask} onToggleComplete={toggleTaskComplete} />
          ))
          ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📭</div>
            <h3 className={styles.emptyStateTitle}>No tasks found</h3>
            <p className={styles.emptyStateText}>
              {selectedLabel || showOnlyRecurring || recurrenceFilterFrequencies.length > 0
                ? "Try adjusting your filters to see more tasks"
                : "Create your first task to get started"}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
        <ExportCSVClient tasks={filteredByRecurrence} />
        <ExportPDFClient tasks={filteredByRecurrence} />
        <button onClick={async () => {
          // fallback: trigger server-side CSV download
          try {
            const resp = await fetch('/api/export/csv', { credentials: 'include' });
            if (!resp.ok) throw new Error('Export failed');
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tasks_export_${Date.now()}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          } catch (err) {
            console.error(err);
            alert('Server export failed');
          }
        }}>Export CSV (server)</button>

        <div style={{ marginLeft: 6 }}>
          <ImportCSVClient onUploaded={() => loadTasks()} />
        </div>
      </div>

      {/* voice confirmation toasts */}
      {showCreateConfirm && parsedCreate && (
        <VoiceConfirmToast
          message={`Detected: "${showCreateConfirm}"`}
          onCancel={() => { setShowCreateConfirm(null); setParsedCreate(null); setCreateText(''); }}
          onConfirm={async () => {
            setShowCreateConfirm(null);
            setParsedCreate(null);
            setCreateText('');
            try {
              await createTaskAndNotify({ title: parsedCreate.title, labels: parsedCreate.labels, dueDate: parsedCreate.dueDate });
              // Clear form fields after successful creation
              setTitle('');
              setLabelsInput('');
              setDueDate('');
              loadTasks();
            } catch (e) {
              console.error(e);
              alert('Failed to create from voice');
            }
          }}
          timeoutMs={9000}
        />
      )}

      {showEditConfirm && parsedEdit && (
        <VoiceConfirmToast
          message={`Detected (edit): "${showEditConfirm}"`}
          onCancel={() => { setShowEditConfirm(null); setParsedEdit(null); setEditText(''); }}
          onConfirm={async () => {
            if (!editModalTask) return;
            const payload: any = {};
            if (parsedEdit.title) payload.title = parsedEdit.title;
            if (parsedEdit.dueDate) payload.dueDate = parsedEdit.dueDate;
            if (parsedEdit.labels) payload.labels = parsedEdit.labels;
            try {
              await updateTaskAndNotify(editModalTask._id, payload);
              setShowEditConfirm(null);
              setParsedEdit(null);
              setEditModalTask(null);
              loadTasks();
            } catch (e) {
              console.error(e);
              alert('Failed to update from voice');
            }
          }}
          timeoutMs={9000}
        />
      )}

      {/* Edit Modal - Modern Popup */}
      {editModalTask && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>✏️ Edit Task</h3>
              <button 
                className={styles.modalClose}
                onClick={() => setEditModalTask(null)}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Task Title Input */}
            <div className={styles.modalSection}>
              <label className={styles.modalLabel}>Task Title</label>
              <div className={styles.titleInputGroup}>
                <input 
                  className={styles.modalInput}
                  type="text"
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Enter task title..."
                />
                <button 
                  className={styles.voiceBtn}
                  type="button" 
                  onClick={() => startEditListening()} 
                  title="Start voice input"
                  aria-label="Record task title"
                >
                  🎤
                </button>
                <button 
                  className={styles.stopBtn}
                  type="button" 
                  onClick={() => stopEditListening()} 
                  title="Stop recording"
                  aria-label="Stop recording"
                >
                  ⏹
                </button>
              </div>
            </div>

            {/* Recurrence Settings */}
            <div className={styles.modalSection}>
              <label className={styles.modalLabel}>
                <input 
                  type="checkbox" 
                  checked={editRecurrenceEnabled} 
                  onChange={(e) => setEditRecurrenceEnabled(e.target.checked)} 
                />
                <span>Enable Recurrence</span>
              </label>

              {editRecurrenceEnabled && (
                <div className={styles.recurrenceSettings}>
                  <div className={styles.settingsRow}>
                    <div className={styles.settingsCol}>
                      <label className={styles.inputLabel}>Frequency</label>
                      <select 
                        className={styles.modalSelect}
                        value={editRecurrenceFrequency} 
                        onChange={(e) => setEditRecurrenceFrequency(e.target.value as any)}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div className={styles.settingsCol}>
                      <label className={styles.inputLabel}>Interval</label>
                      <input 
                        className={styles.modalInputNumber}
                        type="number" 
                        min={1} 
                        value={editRecurrenceInterval} 
                        onChange={(e) => setEditRecurrenceInterval(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {editRecurrenceFrequency === 'weekly' && (
                    <div className={styles.daysOfWeek}>
                      <label className={styles.inputLabel}>Days of Week</label>
                      <div className={styles.daysGrid}>
                        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, idx) => (
                          <label key={d} className={styles.dayCheckbox}>
                            <input
                              type="checkbox"
                              checked={editRecurrenceDaysOfWeek.includes(idx)}
                              onChange={(e) => {
                                if (e.target.checked) setEditRecurrenceDaysOfWeek((s) => Array.from(new Set([...s, idx])));
                                else setEditRecurrenceDaysOfWeek((s) => s.filter((x) => x !== idx));
                              }}
                            />
                            <span>{d}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.settingsRow}>
                    <div className={styles.settingsCol}>
                      <label className={styles.inputLabel}>Start Date</label>
                      <input 
                        className={styles.modalInput}
                        type="date" 
                        value={editRecurrenceStartDate} 
                        onChange={(e) => setEditRecurrenceStartDate(e.target.value)}
                      />
                    </div>

                    <div className={styles.settingsCol}>
                      <label className={styles.inputLabel}>End Date</label>
                      <input 
                        className={styles.modalInput}
                        type="date" 
                        value={editRecurrenceEndDate} 
                        onChange={(e) => setEditRecurrenceEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reminders */}
            <div className={styles.modalSection}>
              <label className={styles.modalLabel}>Reminders (minutes before)</label>
              <input 
                className={styles.modalInput}
                type="text" 
                placeholder="e.g. 10,30,60"
                value={editRemindersInput} 
                onChange={(e) => setEditRemindersInput(e.target.value)}
              />
              <p className={styles.helperText}>Enter comma-separated values</p>
            </div>

            {/* Action Buttons */}
            <div className={styles.modalActions}>
              <button 
                className={styles.btnCancel}
                onClick={() => setEditModalTask(null)}
              >
                Cancel
              </button>
              <button 
                className={styles.btnSave}
                onClick={saveEditRecurrence}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
