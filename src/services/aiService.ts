import { generateFocusPlanApi, generateMotivationApi } from "../api/aiApi";
export const generateFocusPlanService = (tasks:any[]) => generateFocusPlanApi(tasks).then(r=>r.data);
export const generateMotivationService = (goals:string[]) => generateMotivationApi(goals).then(r=>r.data);
