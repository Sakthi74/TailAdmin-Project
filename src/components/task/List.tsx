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
import TaskItem from "./TaskItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskDropZone from "./TaskDropZone";

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
const List = () => {
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

  //task creation
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
      console.log("Task created:", updatedTasks);
      localStorage.setItem("tasklist", JSON.stringify(updatedTasks) || "[]");
      return updatedTasks;
    });

    const tasks = JSON.parse(localStorage.getItem("tasklist") || "[]");
    console.log(tasks);

    resetForm();
    setDialogOpen(false);
  };

  //to load data
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasklist") || "[]");

    setTaskList(storedTasks);
    console.log(tasklist);
  }, []);

  const handleCancel = () => {
    resetForm();
    setDialogOpen(false);
  };

  //filters
  const todoTasks = tasklist.filter((task) => task.status === "To Do");

  const inProgressTasks = tasklist.filter(
    (task) => task.status === "In Progress",
  );

  const completedTasks = tasklist.filter((task) => task.status === "Completed");

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

  //styles
  const inputClass =
    "h-12 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-[#465FFF]";

  const labelClass = "text-sm font-semibold text-foreground";

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Card className=" p-5">
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
                {/* task title */}
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

                {/* due data + status */}
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

                {/* TAGS + ASSIGNEES */}
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

                {/* DESCRIPTION */}
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

              {/* FOOTER */}
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
          <div className="mt-6 space-y-8">
            {/* TODO */}

            <section>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-lg font-semibold">To Do</h2>
                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                  {todoTasks.length}
                </span>
              </div>
              <TaskDropZone status="To Do" onDropTask={handleDropOnSection}>
                {todoTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TaskDropZone>
            </section>

            {/* IN PROGRESS */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-lg font-semibold">In Progress</h2>
                <span className="rounded-full text-[#BC5A2D] font-bold bg-[#FFFAEB] px-2 py-1 text-xs">
                  {inProgressTasks.length}
                </span>
              </div>

              {/* IN PROGRESS */}
              <TaskDropZone
                status="In Progress"
                onDropTask={handleDropOnSection}
              >
                {inProgressTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TaskDropZone>
            </section>

            {/* COMPLETED */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-lg font-semibold">Completed</h2>
                <span className="rounded-full bg-[#EDFDF3] text-[#2C8D65] font-bold px-2 py-1 text-xs">
                  {completedTasks.length}
                </span>
              </div>

              {/* COMPLETED */}
              <TaskDropZone status="Completed" onDropTask={handleDropOnSection}>
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TaskDropZone>
            </section>
          </div>
        </Card>
      </div>
    </DndProvider>
  );
};

export default List;
