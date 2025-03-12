import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import UserMenu from "./UserMenu";

interface DashboardHeaderProps {
  onAddCase?: () => void;
  onViewCalendar?: () => void;
  onViewDashboard?: () => void;
  currentView?: "dashboard" | "calendar";
}

export default function DashboardHeader({
  onAddCase,
  onViewCalendar,
  onViewDashboard,
  currentView = "dashboard",
}: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center py-6 px-4 border-b">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl font-bold">Legal Task Manager</h1>
        <p className="text-muted-foreground">Manage your cases efficiently</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex mr-2 border rounded-md overflow-hidden">
          <Button
            variant={currentView === "dashboard" ? "default" : "ghost"}
            size="sm"
            onClick={onViewDashboard}
            className="rounded-none"
          >
            <LayoutDashboardIcon className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={currentView === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={onViewCalendar}
            className="rounded-none"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar
          </Button>
        </div>

        <Button onClick={onAddCase} size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Case
        </Button>

        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}
