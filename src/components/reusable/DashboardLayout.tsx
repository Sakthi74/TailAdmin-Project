import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <div className="lg:flex-0">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex-5 flex flex-col  ">
          <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          <div className="overflow-y-auto">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
