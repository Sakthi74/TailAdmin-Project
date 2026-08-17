import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Bell,
  Search,
  ChevronDown,
  TextAlignStart,
  MoreHorizontal,
  X,
} from "lucide-react";
import logo from "../../assets/logo.svg";
import { Avatar, AvatarImage } from "../../ui/avatar";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar = ({ setSidebarOpen, sidebarOpen }: NavbarProps) => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav className="flex h-18 shrink-0 w-full items-center border-b border-border bg-background px-4 lg:px-6">
        {" "}
        {/* MOBILE / TABLET */}
        <div className="relative flex w-full items-center justify-between lg:hidden">
          <div className="relative flex w-full items-center justify-between lg:hidden">
            {sidebarOpen ? (
              <button
                type="button"
                className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close menu"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            ) : (
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <TextAlignStart size={20} />
              </button>
            )}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
            {/* Logo */}

            <img src={logo} alt="logo" className="h-6 w-80  " />
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="More options"
            aria-expanded={mobileActionsOpen}
            onClick={() => setMobileActionsOpen((prev) => !prev)}
          >
            <MoreHorizontal size={22} />
          </button>
        </div>
        {/* DESKTOP */}
        <div className="hidden w-full items-center lg:flex">
          {/* Hamburger */}
          <button
            type="button"
            className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            <TextAlignStart size={20} />
          </button>

          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search or type command..."
              className="
              h-10
              w-full
              rounded-lg
              border
              border-border
              bg-background
              pl-11
              pr-14
              text-sm
              text-foreground
              outline-none
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-1
              focus:ring-blue-300
            "
            />

            {/* Command shortcut */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <span className="flex h-6 items-center rounded border border-border bg-muted px-2 text-xs text-muted-foreground">
                ⌘ K
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-background
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
              cursor-pointer
            "
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* Notification */}
            <button
              type="button"
              className="
              relative
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-background
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
              aria-label="Notifications"
            >
              <Bell size={18} />

              {/* Notification dot */}
              <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-orange-500" />
            </button>

            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
                className="object-cover"
              />
            </Avatar>
            {/* User name */}
            <span className="text-sm font-medium text-foreground">Mushraf</span>

            <ChevronDown size={17} className="text-muted-foreground" />
          </div>
        </div>
      </nav>

      {/* MOBILE / TABLET  */}
      {mobileActionsOpen && (
        <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3 lg:hidden">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* Notification */}
          <button
            type="button"
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          {/* Avatar + name */}
          <div className="ml-auto flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
                className="object-cover"
              />
            </Avatar>
            <span className="text-sm font-medium text-foreground">Mushraf</span>
            <ChevronDown size={17} className="text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
