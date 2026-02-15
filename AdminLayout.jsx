import React from "react";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <main>
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
