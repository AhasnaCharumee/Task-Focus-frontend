import { useEffect, useState } from "react";
import { getAllUsersService, deleteUserService } from "../../services/adminService";
import UserTable from "../../components/admin/UserTable";

export default function ManageUsers(){
  const [users,setUsers]=useState<any[]>([]);
  useEffect(()=>{ getAllUsersService().then(d=>setUsers(d)).catch(()=>{}); },[]);
  const remove = async (id:string) => { if(!confirm("Delete user?")) return; await deleteUserService(id); setUsers(users.filter(u=>u._id!==id)); };
  return <div><h3>Manage Users</h3><UserTable users={users} onDelete={remove} /></div>;
}
