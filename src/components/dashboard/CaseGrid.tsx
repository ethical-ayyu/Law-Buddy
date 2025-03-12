import { useState } from "react";
import CaseCard, { CaseCardProps, CaseStatus } from "./CaseCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CaseGridProps {
  cases?: CaseCardProps[];
  onCaseClick?: (caseId: string) => void;
}

// Sample data for demonstration
const SAMPLE_CASES: CaseCardProps[] = [
  {
    id: "1",
    caseNumber: "2023-001",
    clientName: "John Smith",
    title: "Smith v. Johnson",
    status: "active",
    nextDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    description:
      "Personal injury case involving a car accident on Highway 101.",
  },
  {
    id: "2",
    caseNumber: "2023-002",
    clientName: "Sarah Williams",
    title: "Williams Estate Planning",
    status: "pending",
    nextDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    description:
      "Estate planning and will preparation for client with substantial assets.",
  },
  {
    id: "3",
    caseNumber: "2022-045",
    clientName: "Tech Innovations Inc.",
    title: "Tech Innovations v. DataCorp",
    status: "active",
    nextDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    description: "Intellectual property dispute regarding patent infringement.",
  },
  {
    id: "4",
    caseNumber: "2022-032",
    clientName: "Robert Chen",
    title: "Chen Divorce Proceedings",
    status: "closed",
    description: "Divorce case with custody arrangements and asset division.",
  },
  {
    id: "5",
    caseNumber: "2023-010",
    clientName: "Greenfield Properties",
    title: "Greenfield v. City Council",
    status: "archived",
    description: "Zoning dispute for commercial property development.",
  },
  {
    id: "6",
    caseNumber: "2023-015",
    clientName: "Maria Rodriguez",
    title: "Rodriguez Immigration Case",
    status: "active",
    nextDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    description: "Visa application and permanent residency process.",
  },
];

export default function CaseGrid({
  cases = SAMPLE_CASES,
  onCaseClick,
}: CaseGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CaseStatus | "all">("all");

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      searchTerm === "" ||
      caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || caseItem.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCaseClick = (caseId: string) => {
    if (onCaseClick) {
      onCaseClick(caseId);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by case number, client name, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as CaseStatus | "all")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredCases.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No cases found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              {...caseItem}
              onClick={() => handleCaseClick(caseItem.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
