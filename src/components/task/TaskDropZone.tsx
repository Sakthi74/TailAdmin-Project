import { useRef } from "react";
import { useDrop } from "react-dnd";

const ITEM_TYPE = "TASK";

type TaskStatus = "To Do" | "In Progress" | "Completed";

interface TaskDropZoneProps {
  status: TaskStatus;
  onDropTask: (draggedId: number, status: TaskStatus) => void;
  children: React.ReactNode;
}

const TaskDropZone = ({ status, onDropTask, children }: TaskDropZoneProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { id: number }, monitor) => {
      if (monitor.didDrop()) return;
      onDropTask(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  drop(ref);

  return (
    <div
      ref={ref}
      className={`space-y-3 rounded-lg transition-colors min-h-[60px] ${
        isOver ? "bg-muted/50" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default TaskDropZone;
export type { TaskStatus };
