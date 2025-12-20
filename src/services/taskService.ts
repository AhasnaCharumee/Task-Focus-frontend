import api from "../api/axiosConfig"; // ✅ default import
import type { Task } from "../types/Task";

export const getTasks = () => api.get("/tasks").then(res => {
	console.log('getTasks raw response:', res.data);
	return res.data as Task[];
});
export const createTask = (data: Partial<Task>) => api.post("/tasks", data).then(res => res.data as Task);
export const updateTask = (id: string, data: Partial<Task>) => api.put(`/tasks/${id}`, data).then(res => {
	console.log('updateTask response:', res.data);
	return res.data as Task;
});
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`).then(res => res.data);

export type CalendarEvent = {
	id: string;
	title: string;
	start: string;
	end?: string;
	allDay?: boolean;
	labels?: string[];
	isTemplate?: boolean;
};

export const getCalendarEvents = (startIso: string, endIso: string) =>
	api
		.get(`/tasks/calendar?start=${encodeURIComponent(startIso)}&end=${encodeURIComponent(endIso)}`)
		.then((res) => res.data as CalendarEvent[]);

// Emit a global event when tasks change so other parts of the UI (like the calendar) can refresh
const emitTasksChanged = () => {
	try {
		window.dispatchEvent(new CustomEvent('tasks:changed'));
	} catch (e) {
		// ignore in non-browser environments
	}
};

// Wrap mutating helpers to emit change events after success
export const createTaskAndNotify = (data: Partial<Task>) =>
	createTask(data).then((t) => { emitTasksChanged(); return t; });

export const updateTaskAndNotify = (id: string, data: Partial<Task>) =>
	updateTask(id, data).then((t) => { emitTasksChanged(); return t; });

export const deleteTaskAndNotify = (id: string) =>
	deleteTask(id).then((r) => { emitTasksChanged(); return r; });
