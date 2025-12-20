import api from "../api/axiosConfig";

export const adminLoginService = (data: any) => api.post("/admin/login", data).then(res => res.data);
export const getAllUsersService = () => api.get("/admin/users").then(res => res.data.users);
export const makeAdminService = (userId: string) => api.post("/admin/promote", { userId }).then(res => res.data);
export const getAnalyticsService = () => api.get("/admin/dashboard").then(res => res.data);
export const deleteUserService = (userId: string) => {
  return api.delete(`/admin/users/${userId}`);
};
