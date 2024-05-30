"use client";
import LoginForm from "@/components/login/loginForm";
import { verifyJwt } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  // if user is already logged in, redirect to home
  // if user is not logged in, show login form
  const router = useRouter();
  useEffect(() => {
    let findUser = false;
    document.cookie.split(";").forEach((cookie) => {
      const [key, value] = cookie.split("=");
      if (key === "access_token") {
        const user = verifyJwt(value);
        if (user) {
          findUser = true;
        }
      }
    });
    if (findUser) {
      router.push("/");
    }
  }, []);

  return (
    <main className="flex h-[100vh] w-full items-center justify-center">
      <LoginForm />
    </main>
  );
}
