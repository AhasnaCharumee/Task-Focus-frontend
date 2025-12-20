import API from "./axiosConfig";
export const loginApi = (data: any) => API.post("/auth/login", data);
export const signupApi = (data: any) => API.post("/auth/signup", data);
export const profileApi = () => API.get("/user/profile");
