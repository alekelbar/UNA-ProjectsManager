import React from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";


const Layout = ({ children }) => {

  const router = useRouter();
  return (
    <>
      <Head>
        <title>UNA - project manager</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
          integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {
        router.pathname === '/login' || router.pathname === '/addUser' ?
          (
            <div
              className="bg-gray-800 min-h-screen flex flex-col justify-center"
              style={{ fontFamily: "Lato" }}
            >
              {children}
            </div>
          ) :
          (<div
            className="flex space-x-2 bg-slate-400 min-h-screen w-screen"
            style={{ fontFamily: "Lato" }}
          >
            <Sidebar />
            {children}
          </div>)

      }

    </>
  );
};

export default Layout;