import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="lg:flex-0">
        <Sidebar sidebarOpen={sidebarOpen} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
