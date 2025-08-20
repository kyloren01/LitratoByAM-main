"use client";
import { useState } from "react";
import LitratoSidebar from "./sidebar";

export default function CustomerLayoutShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full z-20">
        <LitratoSidebar isOpen={open} onToggle={setOpen} />
      </div>

      {/* Main content: animate margin-left as sidebar width changes */}
      <main
        className={`flex-1 pl-4 overflow-y-auto transition-[margin] duration-500 ease-in-out`}
        style={{ marginLeft: open ? 256 : 64 }}
      >
        {children}
      </main>
    </div>
  );
}
