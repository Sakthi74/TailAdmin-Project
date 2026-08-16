import { Calendar } from "lucide-react";
import { useDrag } from "react-dnd";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const ITEM_TYPE = "TASK";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: string;
  tag: string;
  assignee: string;
  description: string;
}

interface TaskKanbanCardProps {
  task: Task;
}

const TAG_STYLES: Record<string, string> = {
  Marketing:
    "bg-[#F1F4FF] text-[#6366F1] dark:bg-[#6366F1]/15 dark:text-[#A5B4FC]",
  Design:
    "bg-[#FDF2FA] text-[#EC4899] dark:bg-[#EC4899]/15 dark:text-[#F9A8D4]",
  Engineering:
    "bg-[#ECFDF3] text-[#12B76A] dark:bg-[#12B76A]/15 dark:text-[#6EE7B7]",
  Sales:
    "bg-[#FFFAEB] text-[#F79009] dark:bg-[#F79009]/15 dark:text-[#FCD34D]",
};

// Swap these for your real user avatars once you have them per-assignee
const ASSIGNEE_AVATARS: Record<string, string> = {
  "Mayad Ahmed": "https://i.pravatar.cc/150?img=12",
  "Sarah Lee": "https://i.pravatar.cc/150?img=47",
  "John Doe": "https://i.pravatar.cc/150?img=33",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TaskKanbanCard = ({ task }: TaskKanbanCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-grab space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* TITLE + ASSIGNEE */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium leading-6 text-foreground">
          {task.title}
        </p>

        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage
            src={ASSIGNEE_AVATARS[task.assignee]}
            alt={task.assignee}
          />
          <AvatarFallback className="text-[10px]">
            {getInitials(task.assignee)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* DESCRIPTION (only renders when a task has one, like the "Product Update" card in your reference) */}
      {task.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {task.description}
        </p>
      )}

      {/* DUE DATE */}
      {task.dueDate && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={14} />
          <span>{task.dueDate}</span>
        </div>
      )}

      {/* TAG */}
      {task.tag && (
        <Badge
          className={TAG_STYLES[task.tag] ?? "bg-muted text-muted-foreground"}
        >
          {task.tag}
        </Badge>
      )}
    </div>
  );
};

export default TaskKanbanCard;