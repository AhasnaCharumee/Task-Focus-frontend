export const saveToken = (t:string) => localStorage.setItem("token", t);
export const getToken = () => localStorage.getItem("token");
export const saveUser = (u:any) => localStorage.setItem("user", JSON.stringify(u));
export const getUser = () => JSON.parse(localStorage.getItem("user")||"null");
