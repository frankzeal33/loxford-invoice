import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ElementType } from "react";

type Trend = "up" | "down" | "neutral";

interface StatCardProps {
  title: string;
  value: string | number;
  sub?: string;
  trend?: Trend;
  icon: ElementType
}

export function StatCard({ title, value, sub, trend = "neutral", icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
        {sub && (
          <p
            className={`mt-1 flex items-center gap-1 text-xs ${
              trend === "up"
                ? "text-emerald-600"
                : trend === "down"
                ? "text-red-500"
                : "text-muted-foreground"
            }`}
          >
            {trend === "up" && <ArrowUpRight className="h-3 w-3" />}
            {trend === "down" && <ArrowDownRight className="h-3 w-3" />}
            {sub}
          </p>
        )}
      </CardContent>
    </Card>
  );
}