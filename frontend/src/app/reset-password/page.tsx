"use client";
import { useState } from "react";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import NewPasswordForm from "@/components/NewPasswordForm";


export default function ResetPasswordPage() {
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {showNewPasswordForm ? (
        <NewPasswordForm />
      ) : (
        <ResetPasswordForm onTokenRequested={() => setShowNewPasswordForm(true)} />
      )}
      
    </div>
  );
}

