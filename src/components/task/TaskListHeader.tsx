import { useState } from "react";
import { SlidersHorizontal, Plus } from "lucide-react";
import ActionButton from "../reusable/ActionButton";

const TABS = [
  { value: "all", label: "All Tasks", count: 14 },
  { value: "todo", label: "To do", count: 3 },
  { value: "inProgress", label: "In Progress", count: 4 },
  { value: "completed", label: "Completed", count: 4 },
] as const;

type TaskTab = (typeof TABS)[number]["value"];

interface TaskListHeaderProps {
  onAddTask?: () => void;
  onFilter?: () => void;
}

const TaskListHeader = ({ onAddTask, onFilter }: TaskListHeaderProps) => {
  const [activeTab, setActiveTab] = useState<TaskTab>("completed");

  return (
    <div className="flex flex-col md:flex-col sm:flex-row sm:items-center md:items-start sm:justify-between gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-1 bg-[#F2F4F7] dark:bg-[#2A3040] rounded-lg p-1 w-fit overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
                isActive
                  ? "bg-white dark:bg-[#1C2130] text-slate-900 dark:text-white font-semibold shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {tab.label}
              <span
                className={`flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-xs font-medium ${
                  isActive
                    ? "bg-[#EEF2FF] text-[#465FFF] dark:bg-[#1C2130] dark:text-[#7592FF]"
                    : "bg-white dark:bg-[#1C2130]/60 text-slate-500 dark:text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto ">
        <ActionButton
          variant="outline"
          onClick={onFilter}
          className="flex-1 sm:flex-none"
        >
          <SlidersHorizontal size={16} />
          Filter & Sort
        </ActionButton>

        <ActionButton onClick={onAddTask} className="flex-1 sm:flex-none">
          Add New Task
          <Plus size={16} />
        </ActionButton>
      </div>
    </div>
  );
};

export default TaskListHeader;
