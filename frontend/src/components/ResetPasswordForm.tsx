"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/ResetPasswordForm.module.css";
import { requestPasswordReset } from "@/services/auth";

type ResetForm = { email: string };
type Props = { onTokenRequested: () => void };

export default function ResetPasswordForm({ onTokenRequested }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetForm>();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ResetForm) => {
    setLoading(true);
    try {
      const response = await requestPasswordReset(data.email);
      setMessage(response.message);
      setTimeout(() => {
        onTokenRequested(); // Muestra el formulario para ingresar el token
      }, 2000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.leftPanel}>
      <div className={styles.titleContainer}>
        <h1>Forgot your password?</h1>
        <h5>Enter your email to receive a reset token.</h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        {message && <p className={styles.successMessage}>{message}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Token"}
        </button>
      </form>
    </div>
  );
}
