"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/ResetPasswordForm.module.css";
import { resetPassword } from "@/services/auth";

type NewPasswordFormData = {
  token: string;
  newPassword: string;
};

export default function NewPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormData>();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: NewPasswordFormData) => {
    setLoading(true);
    try {
      const response = await resetPassword(data.token, data.newPassword);
      setMessage(response.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.leftPanel}>
      <div className={styles.titleContainer}>
        <h1>Reset Your Password</h1>
        <h5>Copy the token from your email and paste it below to reset your password.</h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Input para pegar el Token */}
        <div className={styles.inputContainer}>
          <label htmlFor="token" className={styles.label}>Token</label>
          <input
            id="token"
            type="text"
            className={styles.input}
            {...register("token", { required: "Token is required" })}
          />
          {errors.token && <p className={styles.error}>{errors.token.message}</p>}
        </div>

        {/* Input para la nueva contraseña */}
        <div className={styles.inputContainer}>
          <label htmlFor="newPassword" className={styles.label}>New Password</label>
          <input
            id="newPassword"
            type="password"
            className={styles.input}
            {...register("newPassword", { required: "Password is required" })}
          />
          {errors.newPassword && <p className={styles.error}>{errors.newPassword.message}</p>}
        </div>

        {/* Mensaje de éxito o error */}
        {message && <p className={styles.successMessage}>{message}</p>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
