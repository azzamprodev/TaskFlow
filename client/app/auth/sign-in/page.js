"use client";
import SingInForm from "@/components/[SignIn]/SignInForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);
  useEffect(() => {
    if (sessionChecked) return;
    const checkSession = async () => {
      const url = "http://localhost:4000/api/auth/status";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        return;
      }
      setSessionChecked(true);
    };
    checkSession();
  }, [router]);

  return (
    <>
      <SingInForm />
    </>
  );
}
