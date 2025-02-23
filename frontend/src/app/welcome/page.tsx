"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import styles from "@/styles/Home.module.css";

const Home = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");  // Si no hay usuario, redirigir al login
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h2>Bienvenido {user?.name || "Usuario"} 🎉</h2>
      <button className={styles.button} onClick={logout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Home;
