import API from "./axiosConfig";

// Auth
export const adminLoginApi = (data: any) => API.post("/admin/login", data);

// Users Management
export const getAllUsersApi = (search?: string, page?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  return API.get(`/admin/users?${params.toString()}`);
};

export const getUserByIdApi = (userId: string) => API.get(`/admin/users/${userId}`);
export const updateUserApi = (userId: string, data: any) => API.put(`/admin/users/${userId}`, data);
export const deleteUserApi = (id: string) => API.delete(`/admin/users/${id}`);
export const getUserActivityApi = (userId: string, page?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  return API.get(`/admin/users/${userId}/activity?${params.toString()}`);
};

// Dashboard & Analytics
export const getDashboardStatsApi = () => API.get("/admin/dashboard");
export const getAnalyticsApi = () => API.get("/analytics");

// Login History
export const getLoginHistoryApi = (page?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  return API.get(`/admin/login-history?${params.toString()}`);
};

// Settings
export const getSettingsApi = () => API.get("/admin/settings");
export const updateSettingApi = (key: string, value: any) => API.put(`/admin/settings/${key}`, { value });
export const getPublicSettingApi = (key: string) => API.get(`/settings/${key}`);

// Feedback
export const getFeedbackApi = (page?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  return API.get(`/feedback?${params.toString()}`);
};
export const updateFeedbackApi = (feedbackId: string, status: string) => API.put(`/feedback/${feedbackId}`, { status });
export const submitFeedbackApi = (message: string, type: string) => API.post("/feedback", { message, type });

// Announcements
export const getAnnouncementsApi = () => API.get("/admin/announcements");
export const createAnnouncementApi = (data: any) => API.post("/admin/announcements", data);
export const updateAnnouncementApi = (id: string, data: any) => API.put(`/admin/announcements/${id}`, data);
export const deleteAnnouncementApi = (id: string) => API.delete(`/admin/announcements/${id}`);
export const sendAnnouncementApi = (id: string) => API.post(`/admin/announcements/${id}/send`);
