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
          <a className="block mb-1 hover:bg-slate-500 transition-all p-3 bg-slate-700">
            PROJECT MANAGER
          </a>
        </Link>
      </div>

      <nav className="list-none text-white text-xl card">
        <li
          className={
            router.pathname === "/People"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm"
          }
        >
          <Link href="/People">
            <a className="p-5 block">People</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/Teams"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm"
          }
        >
          <Link href="/Teams">
            <a className="p-5 block">Teams</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/Projects"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm"
          }
        >
          <Link href="/Projects">
            <a className="p-5 block">Projects</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/Reviews"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm"
          }
        >
          <Link href="/Reviews">
            <a className="p-5 block">Reviews</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/Appendix"
              ? "block mb-1 bg-slate-500 m-2 p-2 transition-all text-sm"
              : "block mb-1 hover:bg-slate-200 hover:text-black m-2 p-2 transition-all text-sm"
          }
        >
          <Link href="/Appendix">
            <a className="p-5 block">Appendix</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
