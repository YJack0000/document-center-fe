"use client";
import LoginForm from "@/components/login/loginForm";
import UserContext from "@/context/userContext";
import { useContext } from "react";

export default function Login() {
  const user = useContext(UserContext);
  return (
    <main className="flex h-[100vh] w-full items-center justify-center">
      <LoginForm />
    </main>
  );
}
