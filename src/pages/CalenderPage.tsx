import { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  type Event,
  type View,
} from "react-big-calendar";

import { format, parse, startOfWeek, getDay } from "date-fns";

import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

import DashboardLayout from "@/components/reusable/DashboardLayout";
import { Button } from "./../ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../src/ui/dialog";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: "danger" | "success" | "primary" | "warning";
}

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Event Conf.",
    start: new Date(2026, 7, 13),
    end: new Date(2026, 7, 13),
    type: "danger",
  },
  {
    id: 2,
    title: "Meeting",
    start: new Date(2026, 7, 14),
    end: new Date(2026, 7, 14),
    type: "success",
  },
  {
    id: 3,
    title: "Workshop",
    start: new Date(2026, 7, 15),
    end: new Date(2026, 7, 15),
    type: "primary",
  },
];

const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 13));

  const [view, setView] = useState<View>("month");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventColor, setEventColor] = useState<
    "danger" | "success" | "primary" | "warning"
  >("primary");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const handlePrevious = () => {
    const date = new Date(currentDate);

    if (view === "month") {
      date.setMonth(date.getMonth() - 1);
    } else if (view === "week") {
      date.setDate(date.getDate() - 7);
    } else {
      date.setDate(date.getDate() - 1);
    }

    setCurrentDate(date);
  };

  const handleNext = () => {
    const date = new Date(currentDate);

    if (view === "month") {
      date.setMonth(date.getMonth() + 1);
    } else if (view === "week") {
      date.setDate(date.getDate() + 7);
    } else {
      date.setDate(date.getDate() + 1);
    }

    setCurrentDate(date);
  };

  //slot selection
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });

    setEventTitle("");
    setEventColor("primary");

    setStartDate(format(start, "yyyy-MM-dd"));
    setEndDate(format(end, "yyyy-MM-dd"));

    setDialogOpen(true);
  };

  // saving events
  const handleSaveEvent = () => {
    if (!eventTitle.trim() || !startDate || !endDate) {
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now(),
      title: eventTitle.trim(),
      start: new Date(`${startDate}T00:00:00`),
      end: new Date(`${endDate}T23:59:59`),
      type: eventColor,
    };

    setEvents((prev) => [...prev, newEvent]);

    // reset
    setEventTitle("");
    setEventColor("primary");
    setStartDate("");
    setEndDate("");
    setSelectedSlot(null);
    setDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[90vw] max-w-md sm:max-w-lg md:max-w-xl rounded-2xl p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
              Add Event
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Plan your next big moment: schedule or edit an event to stay on
              track
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* EVENT TITLE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Event Title
              </label>

              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter event title"
                className="h-12 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition focus:border-[#465FFF]"
                autoFocus
              />
            </div>

            {/* EVENT COLOR */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">
                Event Color
              </label>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {/* DANGER */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="eventColor"
                    value="danger"
                    checked={eventColor === "danger"}
                    onChange={() => setEventColor("danger")}
                    className="h-4 w-4 accent-red-500"
                  />
                  Danger
                </label>

                {/* SUCCESS */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="eventColor"
                    value="success"
                    checked={eventColor === "success"}
                    onChange={() => setEventColor("success")}
                    className="h-4 w-4 accent-green-500"
                  />
                  Success
                </label>

                {/* PRIMARY */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="eventColor"
                    value="primary"
                    checked={eventColor === "primary"}
                    onChange={() => setEventColor("primary")}
                    className="h-4 w-4 accent-[#465FFF]"
                  />
                  Primary
                </label>

                {/* WARNING */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="eventColor"
                    value="warning"
                    checked={eventColor === "warning"}
                    onChange={() => setEventColor("warning")}
                    className="h-4 w-4 accent-orange-500"
                  />
                  Warning
                </label>
              </div>
            </div>

            {/* START DATE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Enter Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-12 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition focus:border-[#465FFF]"
              />
            </div>

            {/* END DATE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Enter End Date
              </label>

              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-12 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition focus:border-[#465FFF]"
              />
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="w-full sm:w-auto h-11 rounded-lg px-6"
            >
              Close
            </Button>

            <Button
              type="button"
              onClick={handleSaveEvent}
              disabled={!eventTitle.trim() || !startDate || !endDate}
              className="w-full sm:w-auto h-11 rounded-lg px-6 bg-[#465FFF] text-white hover:bg-[#3648d8]"
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1600px]">
          {/* Calendar Card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Left */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                >
                  <ChevronRight size={18} />
                </button>

                <Button
                  type="button"
                  onClick={() => setCurrentDate(new Date())}
                  variant="outline"
                  className="ml-1 h-11"
                >
                  Today
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    setSelectedSlot({
                      start: currentDate,
                      end: currentDate,
                    });

                    setEventTitle("");
                    setEventColor("primary");

                    setStartDate(format(currentDate, "yyyy-MM-dd"));
                    setEndDate(format(currentDate, "yyyy-MM-dd"));

                    setDialogOpen(true);
                  }}
                  className="bg-[#475FFF] cursor-pointer hover:bg-indigo-700 text-white px-4 h-11 rounded-lg text-sm font-medium transition-colors"
                >
                  <Plus size={16} className="mr-2" />
                  Add Event
                </Button>
              </div>

              {/* Center */}
              <h2 className="text-center text-lg font-semibold text-foreground">
                {format(currentDate, "MMMM yyyy")}
              </h2>

              {/* View Switch */}
              <div className="flex w-full overflow-hidden rounded-lg border border-border sm:w-auto">
                <button
                  type="button"
                  onClick={() => setView("month")}
                  className={`flex-1 px-5 py-2 text-sm sm:flex-none ${
                    view === "month"
                      ? "bg-muted font-semibold text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  month
                </button>

                <button
                  type="button"
                  onClick={() => setView("week")}
                  className={`flex-1 px-5 py-2 text-sm sm:flex-none ${
                    view === "week"
                      ? "bg-muted font-semibold text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  week
                </button>

                <button
                  type="button"
                  onClick={() => setView("day")}
                  className={`flex-1 px-5 py-2 text-sm sm:flex-none ${
                    view === "day"
                      ? "bg-muted font-semibold text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  day
                </button>
              </div>
            </div>

            {/* Calendar */}
            <div className="calendar-wrapper h-[600px] min-h-[500px] sm:h-[700px] lg:h-[calc(100vh-180px)]">
              <Calendar<CalendarEvent>
                localizer={localizer}
                events={events}
                date={currentDate}
                view={view}
                onNavigate={setCurrentDate}
                onView={(newView) => setView(newView)}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                popup
                toolbar={false}
                eventPropGetter={(event) => {
                  let className = "";

                  if (event.type === "danger") {
                    className = "event-danger";
                  }

                  if (event.type === "success") {
                    className = "event-success";
                  }

                  if (event.type === "primary") {
                    className = "event-primary";
                  }

                  if (event.type === "warning") {
                    className = "event-warning";
                  }

                  return {
                    className,
                  };
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
