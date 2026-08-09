import { Field } from "../../ui/field";
import { useTheme } from "next-themes";
import { Sun, Moon,  Bell, Search, TextAlignStart, ChevronDown  } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  AvatarImage,
} from "../../ui/avatar"

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  // const navigate = useNavigate();
  // const location = useLocation();
  return (
    <nav className="flex h-20 w-full items-center justify-between bg-white border px-6 dark:bg-[#1C2130]  dark:text-white">
      {" "}
      <div className="flex gap-4 ">
        <div className="  w-12 rounded-md h-12 flex justify-center items-center  border text-gray-500"><TextAlignStart size={20} /></div>
      <Field className="relative flex h-12 w-[550px] dark:bg-[#1C2130] items-center rounded-xl border bg-white px-4  focus:border-blue-400 focus:shadow-blue-400 focus:border-2">
        <Search
          size={24}
          className="absolute right-[250px] top-1/2 -translate-y-1/2 text-gray-500 "
        />

        <input
          type="text"
          placeholder="Search or Type Command..."
          className="w-full dark:bg-[#1C2130] h-full py-0 pl-6 pr-16 outline-none text-sm placeholder:dark:text-gray-800 placeholder:text-[#98A2B3]"
        />
        
        {/* <img
          src={inputk}
          alt="Input icon"
          className="absolute right-8 top-1 h-6.5 w-12 translate-x-1/2 object-contain shrink-0"
        /> */}
      </Field>
      </div>
      <div className=" items-center gap-4 dark:bg-[#1C2130]  dark:text-white md:hidden hidden  lg:flex">
        {/* {location.pathname === "profile-settings" ||
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
        ) : null} */}
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-white rounded-full p-2.5 border cursor-pointer dark:bg-[#1C2130]  dark:text-white"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </div>
        
        <div className="bg-white rounded-full p-2.5 border dark:bg-[#1C2130]  dark:text-white">
          <Bell className="cursor-pointer" />
        </div>
        <Avatar className="h-12 w-12  ">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="grayscale  object-cover "
        />
        </Avatar>
<h1 className="text-black dark:text-white">Mushraf</h1>
<ChevronDown/>
      </div>
    </nav>
  );
};

export default Navbar;

// import { Field } from "../../ui/field";
// import { useTheme } from "next-themes";
// import { Sun, Moon, Bell, Search, TextAlignStart, ChevronDown, Menu, House } from "lucide-react";
// import {
//   Avatar,
//   AvatarImage,
// } from "../../ui/avatar"

// const Navbar = () => {
//   const { theme, setTheme } = useTheme();
//   // const navigate = useNavigate();
//   // const location = useLocation();
//   return (
//     <nav className="flex h-20 w-full items-center justify-between bg-white border px-4 sm:px-6 dark:bg-[#1C2130]  dark:text-white">
//       <div className="flex items-center gap-4">
//         {/* Hamburger Menu - Visible on mobile */}
//         <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
//           <Menu size={24} className="text-gray-600 dark:text-gray-300" />
//         </button>
        
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <TextAlignStart size={20} className="text-white" />
//           </div>
//           <span className="text-xl font-bold hidden sm:block">TailAdmin</span>
//         </div>
//       </div>

//       {/* Search Bar - Hidden on mobile, visible on larger screens */}
//       <div className="hidden lg:flex flex-1 max-w-[550px] mx-6">
//         <Field className="relative flex h-12 w-full items-center rounded-xl border bg-white px-4 dark:bg-[#1C2130] focus:border-blue-400 focus:shadow-blue-400 focus:border-2">
//           <Search
//             size={20}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search or Type Command..."
//             className="w-full h-full py-0 pl-12 pr-16 outline-none text-sm bg-transparent dark:bg-[#1C2130] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
//           />
          
//           <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
//             <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
//               ⌘K
//             </kbd>
//           </div>
//         </Field>
//       </div>

//       {/* Right Side Actions */}
//       <div className="flex items-center gap-2 sm:gap-4">
//         {/* Theme Toggle */}
//         <button
//           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           className="p-2.5 rounded-full border bg-white hover:bg-gray-50 dark:bg-[#1C2130] dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer transition-colors"
//           aria-label="Toggle theme"
//         >
//           {theme === "dark" ? <Sun size={18} className="text-gray-300" /> : <Moon size={18} className="text-gray-600" />}
//         </button>
        
//         {/* Notifications */}
//         <button className="relative p-2.5 rounded-full border bg-white hover:bg-gray-50 dark:bg-[#1C2130] dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer transition-colors">
//           <Bell size={18} className="text-gray-600 dark:text-gray-300" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>
        
//         {/* User Profile - Hidden on mobile */}
//         <div className="hidden md:flex items-center gap-3 pl-4 border-l dark:border-gray-700">
//           <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-700 shadow-sm">
//             <AvatarImage
//               src="https://github.com/shadcn.png"
//               alt="@shadcn"
//               className="object-cover"
//             />
//           </Avatar>
//           <div className="hidden lg:block text-left">
//             <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Mushraf</p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
//           </div>
//           <ChevronDown size={16} className="text-gray-400 hidden lg:block" />
//         </div>
        
//         {/* Mobile Profile Icon */}
//         <button className="md:hidden p-1 rounded-full border bg-white dark:bg-[#1C2130] dark:border-gray-700">
//           <Avatar className="h-8 w-8">
//             <AvatarImage
//               src="https://github.com/shadcn.png"
//               alt="@shadcn"
//               className="object-cover"
//             />
//           </Avatar>
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;