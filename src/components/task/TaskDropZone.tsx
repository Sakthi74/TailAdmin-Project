import { useDrop } from "react-dnd";

const ITEM_TYPE = "TASK";

interface TaskDropZoneProps {
  status: string;
  onDropTask: (draggedId: number, status: string) => void;
  children: React.ReactNode;
}

const TaskDropZone = ({ status, onDropTask, children }: TaskDropZoneProps) => {
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

  return (
    <div
      ref={drop}
      className={`space-y-3 rounded-lg transition-colors min-h-[60px] ${
        isOver ? "bg-muted/50" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default TaskDropZone;
