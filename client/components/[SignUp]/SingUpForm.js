"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/auth/authContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";

export default function SingUpForm() {
  const { checkSession } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChangeForUserData = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      if (res.status === 200) {
        await checkSession();
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      } else {
        toast({
          variant: "destructive",
          title: "username already exist",
        });
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error[0].msg || "Failed to sign up";
        toast({
          variant: "destructive",
          title: errorMessage,
        });
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="h-[85vh] flex flex-col items-center justify-center">
        <div className="w-5/6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center justify-center mb-10">
            <h1 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up To Task<span className="text-primary">Flow</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name:
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChangeForUserData}
                required
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Username:
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChangeForUserData}
                required
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password:
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChangeForUserData}
                required
              />
            </div>
            <button
              className="mt-8 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600"
              type="submit"
            >
              Sign Up
            </button>
            <Link href="/auth/sign-in">
              <div className="text-sm text-gray-900 mt-4 text-center underline">
                Don't have an account ? Sign Up
              </div>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
