"use client";
import TaskManager from "@/components/[DashBoard]/TaskManager";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
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
        setLoading(false);
        const data = await response.json();
        setUsername(data.username.name);
      } else {
        router.push("/auth/sign-in");
      }
    };
    checkSession();
  }, [router]);

  if (loading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <div>Loading....</div>
        </div>
      </>
    );
  }

  return (
    <>
      <TaskManager username={username} />
    </>
  );
}
