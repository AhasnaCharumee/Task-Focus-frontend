import API from "./axiosConfig";
export const getTasksApi = (page=1, limit=10) => API.get(`/tasks?page=${page}&limit=${limit}`);
export const createTaskApi = (body: any) => API.post("/tasks", body);
export const updateTaskApi = (id: string, body: any) => API.put(`/tasks/${id}`, body);
export const deleteTaskApi = (id: string) => API.delete(`/tasks/${id}`);
