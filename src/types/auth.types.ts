export type UserRole = "admin" | "user" | string;

export interface User {
	id: string;
	name: string;
	email: string;
	role?: UserRole;
}
