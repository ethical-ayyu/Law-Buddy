import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FileTextIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CaseStatus = "active" | "pending" | "closed" | "archived";

export interface CaseCardProps {
  id: string;
  caseNumber: string;
  clientName: string;
  title: string;
  status: CaseStatus;
  nextDeadline?: Date;
  description?: string;
  onClick?: () => void;
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  archived: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};

export default function CaseCard({
  id,
  caseNumber,
  clientName,
  title,
  status,
  nextDeadline,
  description,
  onClick,
}: CaseCardProps) {
  return (
    <Card
      className="w-full max-w-md bg-card hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={cn("ml-2", statusColors[status])}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Case #{caseNumber}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{clientName}</span>
          </div>
          {nextDeadline && (
            <div className="flex items-center text-sm">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Next deadline: {nextDeadline.toLocaleDateString()}</span>
            </div>
          )}
          {description && (
            <div className="flex items-start text-sm mt-2">
              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <p className="line-clamp-2">{description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
