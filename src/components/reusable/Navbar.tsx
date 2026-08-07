import { Field } from "../../ui/field";
import { useTheme } from "next-themes";
import { Sun, Moon, Table2, Bell, Search, House } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="flex h-20 w-full items-center justify-between bg-[#F6FAFE] px-6 dark:bg-[#1C2130]  dark:text-white">
      {" "}
      <Field className="relative flex h-10 w-[350px] dark:bg-[#1C2130] items-center rounded-xl border bg-white px-4">
        <Search
          size={16}
          className="absolute right-36 top-1/2 -translate-y-1/2 text-gray-400 "
        />

        <input
          type="text"
          placeholder="Search"
          className="w-full dark:bg-[#1C2130] h-full py-0 pl-6 pr-16 outline-none text-sm placeholder:dark:text-gray-800"
        />
        {/* <img
          src={inputk}
          alt="Input icon"
          className="absolute right-8 top-1 h-6.5 w-12 translate-x-1/2 object-contain shrink-0"
        /> */}
      </Field>
      <div className="flex items-center gap-4 dark:bg-[#1C2130]  dark:text-white">
        {location.pathname === "profile-settings" ||
        location.pathname === "/change-password" ||
        location.pathname === "/edit-profile" ||
        location.pathname === "/profile" ||
        location.pathname === "/update-profile" ? (
          <div
            className="bg-white rounded-full p-2.5 border dark:bg-[#1C2130] cursor-pointer dark:text-white"
            onClick={() => navigate("/overview")}
          >
            <House className="cursor-pointer" />
          </div>
        ) : null}
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-white rounded-full p-2.5 border cursor-pointer dark:bg-[#1C2130]  dark:text-white"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </div>
        <div className="bg-white rounded-full p-2.5 border dark:bg-[#1C2130]  dark:text-white">
          <Table2 className="cursor-pointer" />
        </div>
        <div className="bg-white rounded-full p-2.5 border dark:bg-[#1C2130]  dark:text-white">
          <Bell className="cursor-pointer" />
        </div>
        {/* <img
          src={avatar}
          alt=""
          className="h-10 w-10 cursor-pointer dark:bg-[#1C2130]  dark:text-white"
          onClick={() => {
            navigate("/profile");
          }}
        /> */}
      </div>
    </nav>
  );
};

export default Navbar;
