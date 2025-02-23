"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/auth.module.css";

interface Props {
    isRegister?: boolean;
  }
  
  const AuthForm = ({ isRegister = false }: Props) => {
    const { loginUser, registerUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isRegister) {
        await registerUser(name, email, password);
      } else {
        await loginUser(email, password);
      }
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <h2>{isRegister ? "Crea tu cuenta" : "Inicia Sesión"}</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {isRegister && (
              <input
                type="text"
                className={styles.input}
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              className={styles.input}
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>
              {isRegister ? "Registrarse" : "Ingresar"}
            </button>
          </form>
        </div>
        <div className={styles.rightPanel}>
          <p>
            {isRegister
              ? "Si la oportunidad no toca, construye una puerta."
              : "Cierra el pasado, inicia sesión en lo nuevo."}
          </p>
        </div>
      </div>
    );
  };
  
  export default AuthForm;



