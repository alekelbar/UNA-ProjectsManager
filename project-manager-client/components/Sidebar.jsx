import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  // Hook user Router
  const router = useRouter();

  return (
    <aside className="bg-[#06283D] sm:min-h-screen w-1/6 fixed top-0 left-0 right-0">
      <h2 className="text-xl font-bold text-center text-white p-3 sm:hidden lg:block">
        <p className="block transition-all p-3 rounded">
          Projects Manager
        </p>
      </h2>

      <nav className="list-none text-white card flex flex-col items-center">
        <li
          className={
            router.pathname === "/"
              ? "block lg:mt-2 bg-slate-500 transition-all text-xs font-thin animate-pulse w-4/5 sm:mt-7"
              : "block lg:mt-2 hover:bg-slate-200 bg-cyan-900 rounded hover:text-black w-4/5 sm:mt-7 hover:text-center ease-in duration-200 transition-all text-xs font-thin rounded my-1"
          }
        >
          <Link href="/">
            <a className="p-3 block lg:mt-2 font-semibold text-center">People</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/teams"
              ? "block lg:mt-2 bg-slate-500 transition-all text-xs font-thin animate-pulse w-4/5 "
              : "block lg:mt-2 hover:bg-slate-200 bg-cyan-900 rounded hover:text-black w-4/5 hover:text-center ease-in duration-500 transition-all text-xs font-thin rounded my-1"
          }
        >
          <Link href="/teams">
            <a className="p-3 block lg:mt-2 font-semibold text-center">Teams</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/projects"
              ? "block lg:mt-2 bg-slate-500 transition-all text-xs font-thin animate-pulse w-4/5 "
              : "block lg:mt-2 hover:bg-slate-200 bg-cyan-900 rounded hover:text-black w-4/5 hover:text-center ease-in duration-500 transition-all text-xs font-thin rounded my-1"
          }
        >
          <Link href="/projects">
            <a className="p-3 block lg:mt-2 font-semibold text-center">Projects</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/reviews"
              ? "block lg:mt-2 bg-slate-500 transition-all text-xs font-thin animate-pulse w-4/5 "
              : "block lg:mt-2 hover:bg-slate-200 bg-cyan-900 rounded hover:text-black w-4/5 hover:text-center ease-in duration-500 transition-all text-xs font-thin rounded my-1"
          }
        >
          <Link href="/reviews">
            <a className="p-3 block lg:mt-2 font-semibold text-center">Reviews</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/appendix"
              ? "block lg:mt-2 bg-slate-500 transition-all text-xs font-thin animate-pulse w-4/5 "
              : "block lg:mt-2 hover:bg-slate-200 bg-cyan-900 rounded hover:text-black w-4/5 hover:text-center ease-in duration-500 transition-all text-xs font-thin rounded my-1"
          }
        >
          <Link href="/appendix">
            <a className="p-3 block lg:mt-2 font-semibold text-center">Appendix</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
