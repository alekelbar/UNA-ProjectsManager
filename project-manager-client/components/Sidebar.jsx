import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  // Hook user Router
  const router = useRouter();

  return (
    <aside className="bg-[#06283D] sm:min-h-screen w-1/6">
      <h2 className="text-xl font-bold text-center text-white p-5">
        <p className="block transition-all p-3 rounded">
          Projects Manager
        </p>
      </h2>

      <nav className="list-none text-white font-bold text-xl card">
        <li
          className={
            router.pathname === "/"
              ? "block bg-slate-500 mx-5 transition-all text-sm font-thin animate-pulse"
              : "block hover:bg-slate-200 hover:text-black text-start hover:text-center ease-in duration-200 transition-all text-sm font-thin rounded my-4"
          }
        >
          <Link href="/">
            <a className="p-5 block font-semibold text-center">People</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/teams"
              ? "block bg-slate-500 mx-5 transition-all text-sm font-thin animate-pulse"
              : "block hover:bg-slate-200 hover:text-black text-start hover:text-center ease-in duration-500 transition-all text-sm font-thin rounded my-4"
          }
        >
          <Link href="/teams">
            <a className="p-5 block font-semibold text-center">Teams</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/projects"
              ? "block bg-slate-500 mx-5 transition-all text-sm font-thin animate-pulse"
              : "block hover:bg-slate-200 hover:text-black text-start hover:text-center ease-in duration-500 transition-all text-sm font-thin rounded my-4"
          }
        >
          <Link href="/projects">
            <a className="p-5 block font-semibold text-center">Projects</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/reviews"
              ? "block bg-slate-500 mx-5 transition-all text-sm font-thin animate-pulse"
              : "block hover:bg-slate-200 hover:text-black text-start hover:text-center ease-in duration-500 transition-all text-sm font-thin rounded my-4"
          }
        >
          <Link href="/reviews">
            <a className="p-5 block font-semibold text-center">Reviews</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/appendix"
              ? "block bg-slate-500 mx-5 transition-all text-sm font-thin animate-pulse"
              : "block hover:bg-slate-200 hover:text-black text-start hover:text-center ease-in duration-500 transition-all text-sm font-thin rounded my-4"
          }
        >
          <Link href="/appendix">
            <a className="p-5 block font-semibold text-center">Appendix</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
