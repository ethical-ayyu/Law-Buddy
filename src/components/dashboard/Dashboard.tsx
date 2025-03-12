import { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import CaseGrid from "./CaseGrid";
import CalendarView from "./CalendarView";
import AIAssistant from "./AIAssistant";
import NewCaseDialog from "./NewCaseDialog";
import { supabase } from "@/lib/supabase";
import { CaseCardProps } from "./CaseCard";

type DashboardView = "dashboard" | "calendar";

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>("dashboard");
  const [aiAssistantExpanded, setAiAssistantExpanded] = useState(false);
  const [newCaseDialogOpen, setNewCaseDialogOpen] = useState(false);
  const [cases, setCases] = useState<CaseCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedCases: CaseCardProps[] = data.map((item) => ({
          id: item.id,
          caseNumber: item.case_number,
          clientName: item.client_name,
          title: item.title,
          status: item.status,
          nextDeadline: item.next_deadline
            ? new Date(item.next_deadline)
            : undefined,
          description: item.description,
        }));
        setCases(formattedCases);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCase = () => {
    setNewCaseDialogOpen(true);
  };

  const handleCaseAdded = () => {
    fetchCases();
  };

  const handleCaseClick = (caseId: string) => {
    // This would navigate to case details or open a modal
    console.log("Case clicked:", caseId);
  };

  const handleEventClick = (eventId: string) => {
    // This would show event details or open a modal
    console.log("Event clicked:", eventId);
  };

  const toggleAiAssistant = () => {
    setAiAssistantExpanded(!aiAssistantExpanded);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onAddCase={handleAddCase}
        onViewCalendar={() => setCurrentView("calendar")}
        onViewDashboard={() => setCurrentView("dashboard")}
        currentView={currentView}
      />

      <main className="container mx-auto py-6 px-4">
        {currentView === "dashboard" ? (
          <CaseGrid
            cases={cases.length > 0 ? cases : undefined}
            onCaseClick={handleCaseClick}
          />
        ) : (
          <CalendarView onEventClick={handleEventClick} />
        )}
      </main>

      <AIAssistant
        expanded={aiAssistantExpanded}
        onToggle={toggleAiAssistant}
      />

      <NewCaseDialog
        open={newCaseDialogOpen}
        onOpenChange={setNewCaseDialogOpen}
        onCaseAdded={handleCaseAdded}
      />
    </div>
  );
}
