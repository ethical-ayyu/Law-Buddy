import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EventType = "deadline" | "court" | "appointment";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
  caseId?: string;
  caseName?: string;
}

interface CalendarViewProps {
  events?: CalendarEvent[];
  onEventClick?: (eventId: string) => void;
  onDateSelect?: (date: Date) => void;
}

// Sample data for demonstration
const SAMPLE_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Filing Deadline",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    type: "deadline",
    caseId: "1",
    caseName: "Smith v. Johnson",
  },
  {
    id: "2",
    title: "Client Meeting",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    type: "appointment",
    caseId: "2",
    caseName: "Williams Estate Planning",
  },
  {
    id: "3",
    title: "Court Hearing",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    type: "court",
    caseId: "3",
    caseName: "Tech Innovations v. DataCorp",
  },
  {
    id: "4",
    title: "Document Submission",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    type: "deadline",
    caseId: "1",
    caseName: "Smith v. Johnson",
  },
  {
    id: "5",
    title: "Settlement Conference",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    type: "court",
    caseId: "6",
    caseName: "Rodriguez Immigration Case",
  },
];

const eventTypeColors = {
  deadline: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  court:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  appointment: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};

export default function CalendarView({
  events = SAMPLE_EVENTS,
  onEventClick,
  onDateSelect,
}: CalendarViewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [typeFilter, setTypeFilter] = useState<EventType | "all">("all");

  const filteredEvents = events.filter((event) => {
    return typeFilter === "all" || event.type === typeFilter;
  });

  // Group events by date for the selected day
  const selectedDateEvents = date
    ? filteredEvents.filter(
        (event) => event.date.toDateString() === date.toDateString(),
      )
    : [];

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && onDateSelect) {
      onDateSelect(selectedDate);
    }
  };

  const handleEventClick = (eventId: string) => {
    if (onEventClick) {
      onEventClick(eventId);
    }
  };

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return filteredEvents.some(
      (event) => event.date.toDateString() === day.toDateString(),
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="lg:w-1/2">
        <div className="mb-4">
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value as EventType | "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
              <SelectItem value="court">Court Dates</SelectItem>
              <SelectItem value="appointment">Appointments</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
              modifiers={{
                hasEvent: (date) => isDayWithEvent(date),
              }}
              modifiersClassNames={{
                hasEvent: "bg-primary/20 font-bold",
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:w-1/2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              {date
                ? date.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">
                No events scheduled for this day.
              </p>
            ) : (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleEventClick(event.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge className={eventTypeColors[event.type]}>
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </Badge>
                    </div>
                    {event.caseName && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Case: {event.caseName}
                      </p>
                    )}
                    <p className="text-sm mt-1">
                      {event.date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
