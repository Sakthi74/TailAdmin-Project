import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookUser,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const [openSection, setOpenSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const dashboardItems = [
    { id: "ecom", label: "Ecommerce", path: "/ecommerce" },
    { id: "crm", label: "CRM", path: "/crm" },
  ];

  const Ecom = [
    { id: "products", label: "Products", path: "/products" },
    { id: "addproducts", label: "AddProducts", path: "/add-products" },
    { id: "billing", label: "Billing", path: "/billing" },
    { id: "invoice", label: "Invoies", path: "/invoices" },
  ];

  const Task = [
    { id: "list", label: "Product", path: "/list" },
    { id: "kanban", label: "Kanban", path: "/kanban" },
  ];

  const sections = [
    { key: "dashboard", items: dashboardItems },
    { key: "contact", items: Ecom },
    { key: "invoices", items: Task },
  ];

  // auto-open the section containing the current route
  useEffect(() => {
    const active = sections.find((section) =>
      section.items.some((item) => item.path === location.pathname),
    );
    if (active) setOpenSection(active.key);
  }, [location.pathname]);

  // shared className builders — declared once, reused by every section/item
  const sectionHeaderClass = (key: string) =>
    `group flex h-11 w-64 ml-2 cursor-pointer list-none items-center justify-between rounded-lg px-6 text-sm font-medium transition-colors [&::-webkit-details-marker]:hidden ${
      openSection === key
        ? "bg-[#ECF3FF] text-[#465FFF] dark:bg-[#1D2939] dark:text-[#7592FF]"
        : "text-[#344054] hover:bg-[#F2F4F7] dark:text-[#D0D5DD] dark:hover:bg-[#1D2939]"
    }`;

  const subItemClass = (path: string) =>
    `flex h-10 w-[220px] ml-2 cursor-pointer items-center rounded-md px-4 text-sm font-medium transition-colors ${
      location.pathname === path
        ? "bg-[#ECF3FF] text-[#465FFF] dark:bg-[#1D2939] dark:text-[#7592FF]"
        : "text-[#667085] hover:bg-[#F9FAFB] dark:text-[#98A2B3] dark:hover:bg-[#1D2939]"
    }`;

  const handleToggle = (
    e: React.SyntheticEvent<HTMLDetailsElement>,
    key: string,
  ) => {
    setOpenSection(e.currentTarget.open ? key : "");
  };

  return (
    <aside
      className={`fixed left-0 top-12 md:top-12 z-50 h-screen w-72 border-r border-border bg-background transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* LOGO */}
      <div className="h-12 shrink-0 items-center py-7 px-4 lg:block md:hidden hidden">
        <img src={logo} alt="TailAdmin" className="h-8 w-auto object-contain" />
      </div>

      {/* MENU TITLE */}
      <div className="px-5 pb-3 pt-7">
        <span className="text-[11px] font-medium uppercase text-[#98A2B3] dark:text-foreground">
          Menu
        </span>
      </div>

      {/* DASHBOARD */}
      <details
        open={openSection === "dashboard"}
        onToggle={(e) => handleToggle(e, "dashboard")}
        className="group"
      >
        <summary className={sectionHeaderClass("dashboard")}>
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} strokeWidth={1.8} />
            <span>Dashboard</span>
          </div>
          {openSection === "dashboard" ? (
            <ChevronUp size={17} strokeWidth={1.8} />
          ) : (
            <ChevronDown size={17} strokeWidth={1.8} />
          )}
        </summary>

        <div className="mt-1 space-y-1 pl-9 pr-0">
          {dashboardItems.map((item) => (
            <div
              key={item.id}
              className={subItemClass(item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </details>

      {/* CONTACT */}
      <details
        open={openSection === "contact"}
        onToggle={(e) => handleToggle(e, "contact")}
        className="group mt-1"
      >
        <summary className={sectionHeaderClass("contact")}>
          <div className="flex items-center gap-3">
            <BookUser size={20} strokeWidth={1.8} />
            <span>Contact</span>
          </div>
          {openSection === "contact" ? (
            <ChevronUp size={17} strokeWidth={1.8} />
          ) : (
            <ChevronDown size={17} strokeWidth={1.8} />
          )}
        </summary>

        <div className="mt-1 space-y-1 pl-9">
          {Ecom.map((item) => (
            <div
              key={item.id}
              className={subItemClass(item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </details>

      {/* INVOICES */}
      <details
        open={openSection === "invoices"}
        onToggle={(e) => handleToggle(e, "invoices")}
        className="group mt-1"
      >
        <summary className={sectionHeaderClass("invoices")}>
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} strokeWidth={1.8} />
            <span>Invoices</span>
          </div>
          {openSection === "invoices" ? (
            <ChevronUp size={17} strokeWidth={1.8} />
          ) : (
            <ChevronDown size={17} strokeWidth={1.8} />
          )}
        </summary>

        <div className="mt-1 space-y-1 pl-9">
          {Task.map((item) => (
            <div
              key={item.id}
              className={subItemClass(item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </details>
    </aside>
  );
};

export default Sidebar;
