import api from "../api/axiosConfig";
import type { AxiosResponse } from "axios";

export interface Notification {
  _id: string;
  user: string;
  task?: string;
  type?: string;
  message?: string;
  viaEmail?: boolean;
  viaInApp?: boolean;
  reminderMinutes?: number;
  sentAt?: string;
  read?: boolean;
  createdAt?: string;
}

export const listNotifications = (): Promise<Notification[]> =>
  api.get('/notifications').then((res: AxiosResponse<{ notifications: Notification[] }>) => res.data.notifications || []);

export const markNotificationRead = (id: string): Promise<Notification> =>
  api.put(`/notifications/${id}/read`).then((res: AxiosResponse<Notification>) => res.data);

export default { listNotifications, markNotificationRead };
