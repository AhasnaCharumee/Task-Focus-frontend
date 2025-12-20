import API from "./axiosConfig";
export const generateFocusPlanApi = (tasks: any[]) => API.post("/ai/focus-plan", { tasks });
export const generateMotivationApi = (goals: string[]) => API.post("/ai/motivation", { goals });
