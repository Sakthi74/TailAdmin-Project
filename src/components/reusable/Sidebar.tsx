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
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
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

  const sections = [
    { key: "dashboard", items: dashboardItems },
    { key: "contact", items: Ecom },
    { key: "invoices", items: Task },
  ];

  // Automatically open the section containing the current route
  useEffect(() => {
    const active = sections.find((section) =>
      section.items.some((item) => item.path === location.pathname),
    );

    if (active) {
      setOpenSection(active.key);
    }
  }, [location.pathname]);

  // Main section heading
  const sectionHeaderClass = (isOpen: boolean) => `
    group
    flex
    h-11
    w-64
    ml-2
    cursor-pointer
    list-none
    items-center
    justify-between
    rounded-lg
    px-6
    text-sm
    font-medium
    transition-colors

    ${
      isOpen
        ? "bg-[#ECF3FF] text-[#465FFF] dark:bg-[#1D2939] dark:text-[#7592FF]"
        : "text-[#344054] hover:bg-[#F2F4F7] dark:text-[#D0D5DD] dark:hover:bg-[#1D2939]"
    }

    [&::-webkit-details-marker]:hidden
  `;

  // Submenu item
  const subItemClass = (isActive: boolean) => `
    flex
    h-10
     w-[220px]
    ml-2
    cursor-pointer
    items-center
    rounded-md
    px-4
    text-sm
    font-medium
    transition-colors

    ${
      isActive
        ? "bg-[#ECF3FF] text-[#465FFF] dark:bg-[#1D2939] dark:text-[#7592FF]"
        : "text-[#667085] hover:bg-[#F9FAFB] dark:text-[#98A2B3] dark:hover:bg-[#1D2939]"
    }
  `;

  const SectionChevron = ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? (
      <ChevronUp size={17} strokeWidth={1.8} />
    ) : (
      <ChevronDown size={17} strokeWidth={1.8} />
    );

  const handleToggle = (
    e: React.SyntheticEvent<HTMLDetailsElement>,
    key: string,
  ) => {
    const details = e.currentTarget;

    if (details.open) {
      setOpenSection(key);
    } else if (openSection === key) {
      setOpenSection("");
    }
  };

  return (
    <aside
      className={`
    fixed
    left-0
    top-12
    md:top-7
    z-50
    h-screen
    w-72
    border-r
    border-border
    bg-background
    transition-transform
    duration-300

    lg:static
    lg:translate-x-0

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      {/* 
          LOGO
       */}

      <div className=" h-12 shrink-0 items-center py-7 px-4 lg:block md:hidden hidden">
        <img src={logo} alt="TailAdmin" className="h-8 w-auto object-contain" />
      </div>

      {/* 
          MENU TITLE
       */}

      <div className="px-5 pb-3 pt-7">
        <span className="text-[11px] font-medium uppercase  text-[#98A2B3] dark:text-foreground">
          Menu
        </span>
      </div>

      {/* 
          DASHBOARD
       */}

      <details
        open={openSection === "dashboard"}
        onToggle={(e) => handleToggle(e, "dashboard")}
        className="group"
      >
        <summary className={sectionHeaderClass(openSection === "dashboard")}>
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} strokeWidth={1.8} />

            <span>Dashboard</span>
          </div>

          <SectionChevron isOpen={openSection === "dashboard"} />
        </summary>

        <div className="mt-1 space-y-1 pl-9 pr-0">
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

      {/* 
          Contact
       */}

      <details
        open={openSection === "contact"}
        onToggle={(e) => handleToggle(e, "contact")}
        className="group mt-1"
      >
        <summary className={sectionHeaderClass(openSection === "contact")}>
          <div className="flex items-center gap-3">
            <BookUser size={20} strokeWidth={1.8} />

            <span>Contact</span>
          </div>

          <SectionChevron isOpen={openSection === "contact"} />
        </summary>

        <div className="mt-1 space-y-1 pl-9">
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

      {/* 
          Invoices
       */}

      <details
        open={openSection === "invoices"}
        onToggle={(e) => handleToggle(e, "invoices")}
        className="group mt-1"
      >
        <summary className={sectionHeaderClass(openSection === "invoices")}>
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} strokeWidth={1.8} />

            <span>Invoices</span>
          </div>

          <SectionChevron isOpen={openSection === "invoices"} />
        </summary>

        <div className="mt-1 space-y-1 pl-9">
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
    </aside>
  );
};

export default Sidebar;
