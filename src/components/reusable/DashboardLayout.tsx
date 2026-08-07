import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
