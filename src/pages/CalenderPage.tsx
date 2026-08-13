import { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  type Event,
  type Views,
} from "react-big-calendar";

import { format, parse, startOfWeek, getDay } from "date-fns";

import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

import DashboardLayout from "@/components/reusable/DashboardLayout";
import { Button } from "./../ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

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
  type: "conference" | "meeting" | "workshop";
}

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Event Conf.",
    start: new Date(2026, 7, 13),
    end: new Date(2026, 7, 13),
    type: "conference",
  },
  {
    id: 2,
    title: "Meeting",
    start: new Date(2026, 7, 14),
    end: new Date(2026, 7, 14),
    type: "meeting",
  },
  {
    id: 3,
    title: "Workshop",
    start: new Date(2026, 7, 15),
    end: new Date(2026, 7, 15),
    type: "workshop",
  },
];

const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 13));

  const [view, setView] = useState<Views>("month");

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

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("Enter event name");

    if (!title) return;

    const newEvent: CalendarEvent = {
      id: Date.now(),
      title,
      start,
      end,
      type: "meeting",
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <DashboardLayout>
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
                  className="ml-1"
                >
                  Today
                </Button>

                <Button
                  type="button"
                  className="bg-[#465FFF] hover:bg-[#3648d8]"
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
                onView={setView}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                popup
                toolbar={false}
                eventPropGetter={(event) => {
                  let className = "";

                  if (event.type === "conference") {
                    className = "event-conference";
                  }

                  if (event.type === "meeting") {
                    className = "event-meeting";
                  }

                  if (event.type === "workshop") {
                    className = "event-workshop";
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
