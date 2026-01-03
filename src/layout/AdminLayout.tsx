import { Outlet } from "react-router-dom";

export default function AdminLayout(){
  return (
    <div className="admin-layout">
      <div className="admin-content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
