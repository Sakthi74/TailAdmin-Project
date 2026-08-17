import { useState, useEffect } from "react";
import TaskListHeader from "./TaskListHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../src/ui/dialog";
import ActionButton from "../reusable/ActionButton";
import { Card } from "../../ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../src/ui/avatar";
import TaskKanbanCard from "./TaskKanbanCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskDropZone from "./TaskDropZone";
import { MoreHorizontal } from "lucide-react";

const STATUS_OPTIONS = ["To Do", "In Progress", "Completed"] as const;
const TAG_OPTIONS = ["Marketing", "Design", "Engineering", "Sales"] as const;
const ASSIGNEE_OPTIONS = ["Mayad Ahmed", "Sarah Lee", "John Doe"] as const;

interface TaskFormData {
  title: string;
  dueDate: string;
  status: (typeof STATUS_OPTIONS)[number];
  tag: (typeof TAG_OPTIONS)[number];
  assignee: (typeof ASSIGNEE_OPTIONS)[number];
  description: string;
}

interface Task extends TaskFormData {
  id: number;
}

const COLUMNS: {
  status: (typeof STATUS_OPTIONS)[number];
  badgeClass: string;
}[] = [
  {
    status: "To Do",
    badgeClass:
      "bg-[#EEF2FF] text-[#6366F1] dark:bg-[#6366F1]/15 dark:text-[#A5B4FC]",
  },
  {
    status: "In Progress",
    badgeClass:
      "bg-[#FFF7ED] text-[#F97316] dark:bg-[#F97316]/15 dark:text-[#FDBA74]",
  },
  {
    status: "Completed",
    badgeClass:
      "bg-[#ECFDF5] text-[#10B981] dark:bg-[#10B981]/15 dark:text-[#6EE7B7]",
  },
];

const Kanban = () => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    dueDate: "",
    status: "To Do",
    tag: "Marketing",
    assignee: "Mayad Ahmed",
    description: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tasklist, setTaskList] = useState<Task[]>([]);

  const handleAddTask = () => {
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      dueDate: "",
      status: "To Do",
      tag: "Marketing",
      assignee: "Mayad Ahmed",
      description: "",
    });
  };

  const handleCreateTask = () => {
    if (!formData.title.trim() || !formData.dueDate) {
      return;
    }

    const newTask = {
      id: Date.now(),
      ...formData,
    };
    setTaskList((prev) => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem("tasklist", JSON.stringify(updatedTasks) || "[]");
      return updatedTasks;
    });

    resetForm();
    setDialogOpen(false);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasklist") || "[]");
    setTaskList(storedTasks);
  }, []);

  const handleCancel = () => {
    resetForm();
    setDialogOpen(false);
  };

  const handleDropOnSection = (
    draggedId: number,
    newStatus: TaskFormData["status"],
  ) => {
    setTaskList((prev) => {
      const updated = prev.map((task) =>
        task.id === draggedId ? { ...task, status: newStatus } : task,
      );
      localStorage.setItem("tasklist", JSON.stringify(updated));
      return updated;
    });
  };

  const inputClass =
    "h-12 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-[#465FFF]";

  const labelClass = "text-sm font-semibold text-foreground";

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Card className="p-5">
          <TaskListHeader onAddTask={handleAddTask} />

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="w-[90vw] max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  Add a new task
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Effortlessly manage your to-do list: add a new task
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <label className={labelClass}>Task Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter task title"
                    className={inputClass}
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Due Date</label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as TaskFormData["status"],
                        }))
                      }
                      className={`${inputClass} cursor-pointer`}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Tags</label>
                    <select
                      value={formData.tag}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tag: e.target.value as TaskFormData["tag"],
                        }))
                      }
                      className={`${inputClass} cursor-pointer`}
                    >
                      {TAG_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>Assignees</label>
                    <select
                      value={formData.assignee}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          assignee: e.target.value as TaskFormData["assignee"],
                        }))
                      }
                      className={`${inputClass} cursor-pointer`}
                    >
                      {ASSIGNEE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Type your message here..."
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#465FFF] resize-y"
                  />
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Viewers:
                  </span>
                  <div className="flex -space-x-2">
                    <AvatarGroup className="grayscale">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/maxleiter.png"
                          alt="@maxleiter"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/evilrabbit.png"
                          alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      <AvatarGroupCount>+3</AvatarGroupCount>
                    </AvatarGroup>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <ActionButton
                    variant="outline"
                    onClick={handleCancel}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </ActionButton>

                  <ActionButton
                    onClick={handleCreateTask}
                    disabled={!formData.title.trim() || !formData.dueDate}
                    className="w-full sm:w-auto"
                  >
                    Create Task
                  </ActionButton>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* BOARD */}
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:gap-5 md:overflow-x-auto md:pb-2">
            {COLUMNS.map((column) => {
              const columnTasks = tasklist.filter(
                (task) => task.status === column.status,
              );

              return (
                <div key={column.status} className="md:min-w-[300px] md:flex-1">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold text-foreground">
                        {column.status}
                      </h2>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${column.badgeClass}`}
                      >
                        {columnTasks.length}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  <div className="border-r h-full border-r-gray-300" />
                  <TaskDropZone
                    status={column.status}
                    onDropTask={handleDropOnSection}
                  >
                    {columnTasks.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                        No tasks yet
                      </div>
                    ) : (
                      columnTasks.map((task) => (
                        <TaskKanbanCard key={task.id} task={task} />
                      ))
                    )}
                  </TaskDropZone>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DndProvider>
  );
};

export default Kanban;
