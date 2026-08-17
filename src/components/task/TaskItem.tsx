import { useState, useRef } from "react";
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

  const ref = useRef<HTMLSpanElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,

    item: {
      id: task.id,
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div
      className={`flex lg:items-center md:items-baseline items-baseline lg:justify-between lg:flex-row md:flex-col flex-col rounded-lg border border-border bg-card p-4 transition ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* Drag handle */}
        <span
          ref={ref}
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
      <div className="flex lg:flex-row md:flex-col sm:flex-col items-center gap-4 text-sm text-muted-foreground ">
        {/* Tag */}
        <Badge className="bg-[#F1F4FF] text-[#98A6FF] hidden md:hidden lg:block">
          {task.tag}
        </Badge>

        <div className="flex flex-col">
          <div className="flex  md:justify-between justify-between lg:flex-row gap-2 w-82 md:w-[600px] lg:w-full  lg:justify-center items-center">
            {/*Due date + Comments */}
            <div className="flex items-center gap-3">
              {/* Due date */}
              <span>{task.dueDate}</span>

              {/* Comments */}
              <span className="flex items-center justify-center gap-2">
                <MessageCircle size={16} />1
              </span>
            </div>

            {/* Assignee */}
            <Avatar className="flex md:justify-end lg:ml-0 justify-end">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <Badge className="bg-[#F1F4FF] text-[#98A6FF] block md:block lg:hidden">
            {task.tag}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
