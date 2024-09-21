import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <div className="absolute inset-0 z-40 w-screen h-screen bg-black/50" />
      <Navbar />
      <Sidebar />
      <section className="flex items-center justify-center w-full z-50 h-[90vh]  absolute">
        {children}
      </section>
    </main>
  );
};

export default Layout;
