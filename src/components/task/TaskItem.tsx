import { useState } from "react";
import { useDrag } from "react-dnd";
import { MessageCircle } from "lucide-react";

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

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const [checked, setChecked] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,

    item: {
      id: task.id,
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-border bg-card p-4 transition ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* Drag handle */}
        <span
          ref={drag}
          className="cursor-grab text-muted-foreground active:cursor-grabbing"
        >
          ☰
        </span>

        {/* Checkbox */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="h-4 w-4 cursor-pointer"
        />

        {/* Task title */}
        <div>
          <p
            className={`font-medium text-[#798089] dark:text-foreground transition-all ${
              checked ? "text-muted-foreground line-through" : ""
            }`}
          >
            {task.title}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {/* Tag */}
        <Badge className="bg-[#F1F4FF] text-[#98A6FF]">{task.tag}</Badge>

        {/* Due date */}
        <span>{task.dueDate}</span>

        {/* Comments */}
        <span className="flex items-center justify-center gap-2">
          <MessageCircle size={16} />1
        </span>

        {/* Assignee */}
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TaskItem;
