import { LayoutDashboard, BookUser } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
import vite from "../../assets/vite.svg";

const Sidebar = () => {
  //   const navigate = useNavigate();
  //   const location = useLocation();

  const dashboardItems = [
    { id: "ecom", label: "Ecommerce", path: "/ecommerce" },
    { id: "crm", label: "CRM", path: "/crm" },
  ];

  const Ecom = [
    { id: "product", label: "Product", path: "/product" },
    { id: "Invoice", label: "Invocie", path: "/invoice" },
  ];

  const Task = [
    { id: "list", label: "Product", path: "/list" },
    { id: "kanban", label: "Kanban", path: "/kanban" },
  ];

  const calendar = [{ id: "calendar", label: "Calander", path: "/Calendar" }];

  //   const itemClass = (path: string) =>
  //     location.pathname === path
  //       ? "w-56 h-11 px-7.5 cursor-pointer border-l-2 border-[#166684] flex items-center text-[#166684] font-medium"
  //       : "w-56 h-11 px-7.5 cursor-pointer border-l-2 border-gray-200 dark:text-white flex items-center ";
  const itemClass = (path: string) =>
    "w-56 h-11 px-7.5 cursor-pointer border-l-2 border-[#166684] flex items-center text-[#166684] font-medium";
  return (
    <div className="w-72 h-screen pt-2.5 pb-7 px-2.5 border-r bg-[#F6FAFE] dark:bg-[#1C2130]  dark:text-white">
      {/* Logo */}
      <div className="h-16 w-72 flex justify-between p-5 ">
        <div className="flex items-center">
          <img src={vite} alt="logo" className="h-8 w-8" />
          <h1 className="font-bold text-sm p-2">MatAble</h1>
        </div>

        <div className="bg-[#EDF1F5] p-3 text-[#166684] font-semibold rounded-md w-7 h-7 flex justify-center items-center dark:text-white  dark:bg-[#1C2130] dark:border dark:border-white">
          =
        </div>
      </div>

      {/* Dashboard */}
      <details className="pl-3 text-[#166684]" open>
        <summary className="flex rounded-2xl appearance-none list-none [&::-webkit-details-marker]:hidden [&::marker]:hidden px-5 py-4 cursor-pointer bg-[#C0E8FF]">
          <div className="flex items-center gap-2 font-medium">
            <LayoutDashboard />
            <span>Dashboard</span>
          </div>
        </summary>

        <div className="p-4 w-[256px]">
          {dashboardItems.map((item) => (
            <div
              key={item.id}
              className={itemClass(item.path)}
              //   onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </details>

      {/* Contact */}
      <details className="pl-3 pt-3 text-[#166684] " open>
        <summary className="flex rounded-2xl list-none [&::-webkit-details-marker]:hidden [&::marker]:hidden px-5 py-4 cursor-pointer bg-[#C0E8FF]">
          <div className="flex items-center gap-2 font-medium ">
            <BookUser />
            <span>Contact</span>
          </div>
        </summary>

        <div className="p-4 w-[256px] ">
          {Ecom.map((item) => (
            <div
              key={item.id}
              className={itemClass(item.path)}
              //   onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </details>

      {/* Invoices */}
      <details className="pl-3 text-[#166684]" open>
        <summary className="flex rounded-2xl appearance-none list-none [&::-webkit-details-marker]:hidden [&::marker]:hidden px-5 py-4 cursor-pointer bg-[#C0E8FF]">
          <div className="flex items-center gap-2 font-medium">
            <LayoutDashboard />
            <span>Invoices</span>
          </div>
        </summary>

        <div className="p-4 w-[256px]">
          {Task.map((item) => (
            <div
              key={item.id}
              className={itemClass(item.path)}
              //   onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default Sidebar;
