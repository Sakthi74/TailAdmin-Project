import { useEffect, useState } from "react";
import { LayoutDashboard, BookUser, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Sidebar = () => {
  const [openSection, setOpenSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  // Central registry of sections — add new ones here only
  const sections = [
    { key: "dashboard", items: dashboardItems },
    { key: "contact", items: Ecom },
    { key: "invoices", items: Task },
  ];

  // Keep whichever section contains the active route open automatically
  useEffect(() => {
    const active = sections.find((s) =>
      s.items.some((item) => item.path === location.pathname)
    );
    if (active) setOpenSection(active.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const sectionHeaderClass = (isOpen: boolean) =>
    `flex items-center justify-between rounded-2xl px-5 py-4 cursor-pointer font-medium transition-colors
     ${isOpen
        ? "bg-[#ECF3FF] text-[#465FFF]"
        : "bg-white text-[#344054] dark:text-white"
     }`;

  const subItemClass = (isActive: boolean) =>
    `w-56 h-11 px-7.5 flex items-center justify-start cursor-pointer rounded-lg font-medium transition-colors
     ${isActive
        ? "bg-[#ECF3FF] text-[#465FFF] text-end"
        : "text-[#667085] hover:bg-gray-50 dark:text-white justify-end "
     }`;

  const SectionChevron = ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <ChevronUp /> : <ChevronDown />;

  const handleToggle = (
    e: React.SyntheticEvent<HTMLDetailsElement>,
    key: string
  ) => {
    const isOpen = (e.target as HTMLDetailsElement).open;
    setOpenSection(isOpen ? key : "");
  };

  return (
    <div className="w-[19%] h-screen pt-5 pb-7 px-2.5 border-r bg-white lg:block md:block hidden">
      {/* Logo */}
      <div className="p-3 flex justify-start items-baseline sm:hidden md:hidden lg:block">
        <img src={logo} alt="logo" className="h-9 w-80 mr-36 " />
      </div>

      <div className="p-3 text-[#98A2B3] font-extralight flex dark:text-white dark:bg-[#1C2130] dark:border dark:border-white">
        Menu
      </div>

      {/* Dashboard */}
      <details
        open={openSection === "dashboard"}
        onToggle={(e) => handleToggle(e, "dashboard")}
      >
        <summary className={sectionHeaderClass(openSection === "dashboard")}>
          <div className="items-center gap-2 font-medium flex w-full justify-between">
            <div className="flex gap-3">
              <LayoutDashboard />
              <span>Dashboard</span>
            </div>
            <SectionChevron isOpen={openSection === "dashboard"} />
          </div>
        </summary>

        <div className="p-4">
          {dashboardItems.map((item) => (
            <div
              key={item.id}
              className={subItemClass(location.pathname === item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </details>

      {/* Contact */}
      <details
      
        open={openSection === "contact"}
        onToggle={(e) => handleToggle(e, "contact")}
      >
        <summary className={sectionHeaderClass(openSection === "contact")}>
          <div className="items-center gap-2 font-medium flex w-full justify-between">
            <div className="flex gap-3">
              <BookUser />
              <span>Contact</span>
            </div>
            <SectionChevron isOpen={openSection === "contact"} />
          </div>
        </summary>

        <div className="p-4 w-[256px]">
          {Ecom.map((item) => (
            <div
              key={item.id}
              className={subItemClass(location.pathname === item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </details>

      {/* Invoices */}
      <details
       
        open={openSection === "invoices"}
        onToggle={(e) => handleToggle(e, "invoices")}
      >
        <summary className={sectionHeaderClass(openSection === "invoices")}>
          <div className="items-center gap-2 font-medium flex w-full justify-between">
            <div className="flex gap-3">
              <LayoutDashboard />
              <span>Invoices</span>
            </div>
            <SectionChevron isOpen={openSection === "invoices"} />
          </div>
        </summary>

        <div className="p-4 w-[256px]">
          {Task.map((item) => (
            <div
              key={item.id}
              className={subItemClass(location.pathname === item.path)}
              onClick={() => navigate(item.path)}
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