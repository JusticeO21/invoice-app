import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Hooks/useRedux";
import styles from "../App.module.css";
import { ToastContainer, Zoom } from "react-toastify";
import Dialog from "../pages/DeleteDialog/DeleteDialog";
import Navbar from "../components/Navbar/Navbar";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.app}>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Outlet />
        <ToastContainer transition={Zoom} />
      </main>
      <Dialog />
    </div>
  );
};

export default ProtectedRoute;
