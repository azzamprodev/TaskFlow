"use client";
import Link from "next/link";
import { useAuth } from "@/app/auth/authContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function NavBar() {
  const { checkSession, isLogged } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  const logOutFunction = async () => {
    const url = "http://localhost:4000/api/auth/sign-out";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status == 200) {
      await checkSession();
      router.push("/");
    } else {
      router.push("/auth/sign-in");
    }
  };

  return (
    <>
      <div className="p-4 h-[10vh] flex justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <div className="text-3xl text-Black font-bold">
            Task<span className="text-primary">Flow</span>
          </div>
        </Link>
        {/* Auth */}
        {pathName === "/auth/sign-in" || pathName === "/auth/sign-up" ? (
          <Link href={"/dashboard"}>
            <div className="flex gap-2"></div>
          </Link>
        ) : pathName === "/" ? (
          <Link href={"/dashboard"}>
            <div className="flex gap-2">
              <button className="rounded-md py-1 px-8 md:px-8 lg:px-14 bg-primary text-white hover:bg-orange-600 transition-all duration-150">
                {isLogged ? "Dashboard" : "Sign In"}
              </button>
            </div>
          </Link>
        ) : (
          <Link href={"/dashboard"}>
            <div className="flex gap-2">
              <button
                onClick={logOutFunction}
                className="rounded-md py-1 px-8 md:px-8 lg:px-14 bg-primary text-white hover:bg-orange-600 transition-all duration-150"
              >
                {isLogged && pathName === "/dashboard" ? "Log Out" : "Sign In"}
              </button>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}

export default NavBar;
