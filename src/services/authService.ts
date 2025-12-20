import { loginApi, signupApi, profileApi } from "../api/authApi";
export const loginService = (d: any) => loginApi(d).then(r => r.data);
export const signupService = (d: any) => signupApi(d).then(r => r.data);
export const profileService = () => profileApi().then(r => r.data);
