import React from "react";

type UserRow = { _id:string; name:string; email:string; role?:string };
export default function UserTable({users, onDelete}:{users:UserRow[]; onDelete:(id:string)=>void}){
  return (
    <table className="table">
      <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
      <tbody>
        {users.map(u=>(
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role||"user"}</td>
            <td><button onClick={()=>onDelete(u._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
