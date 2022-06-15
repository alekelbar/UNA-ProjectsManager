import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  // Hook user Router
  const router = useRouter();

  return (
    <aside className="bg-gray-800 sm:min-h-screen sm:w-1/5 xl:w-12/2">
      <div className="text-xl font-bold text-center text-white p-5">
        <Link href="/">
          <a className="block mb-1 hover:bg-slate-500 transition-all p-3 bg-slate-700 rounded">
            PROJECT MANAGER
          </a>
        </Link>
      </div>

      <nav className="list-none text-white font-bold text-xl card">
        <li
          className={
            router.pathname === "/people"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm rounded"
          }
        >
          <Link href="/people">
            <a className="p-5 block">People</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/teams"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm rounded"
          }
        >
          <Link href="/teams">
            <a className="p-5 block">Teams</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/projects"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm rounded"
          }
        >
          <Link href="/projects">
            <a className="p-5 block">Projects</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/reviews"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm rounded"
          }
        >
          <Link href="/reviews">
            <a className="p-5 block">Reviews</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/appendix"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm rounded"
          }
        >
          <Link href="/appendix">
            <a className="p-5 block">Appendix</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
