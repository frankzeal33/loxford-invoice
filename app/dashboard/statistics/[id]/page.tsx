"use client";
import {
  Clock,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { OverviewChartBar } from "@/components/OverviewChartBar";
import { StatCard } from "@/components/StatCard";

interface StatCard {
  title: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
}

const STATS: StatCard[] = [
  {
    title: "Total Revenue",
    value: "₦284,500",
    sub: "+8% vs yesterday",
    trend: "up",
    icon: BarChart3,
  },
  {
    title: "Total Receipt",
    value: "1,204",
    sub: "Total receipts generated",
    trend: "neutral",
    icon: Clock,
  },
  {
    title: "Paid",
    value: "300",
    sub: "Paid",
    trend: "up",
    icon: AlertCircle,
  },
  {
    title: "Pending",
    value: "9",
    sub: "unpaid / unfulfilled",
    trend: "down",
    icon: AlertCircle,
  },
];

const chartData = [
  { date: "2024-04-01", paid: 222, unpaid: 150 },
  { date: "2024-04-02", paid: 97, unpaid: 180 },
  { date: "2024-04-03", paid: 167, unpaid: 120 },
  { date: "2024-04-04", paid: 242, unpaid: 260 },
  { date: "2024-04-05", paid: 373, unpaid: 290 },
  { date: "2024-04-06", paid: 301, unpaid: 340 },
  { date: "2024-04-07", paid: 245, unpaid: 180 },
  { date: "2024-04-08", paid: 409, unpaid: 320 },
  { date: "2024-04-09", paid: 59, unpaid: 110 },
  { date: "2024-04-10", paid: 261, unpaid: 190 },
  { date: "2024-04-11", paid: 327, unpaid: 350 },
  { date: "2024-04-12", paid: 292, unpaid: 210 },
  { date: "2024-04-13", paid: 342, unpaid: 380 },
  { date: "2024-04-14", paid: 137, unpaid: 220 },
  { date: "2024-04-15", paid: 120, unpaid: 170 },
  { date: "2024-04-16", paid: 138, unpaid: 190 },
  { date: "2024-04-17", paid: 446, unpaid: 360 },
  { date: "2024-04-18", paid: 364, unpaid: 410 },
  { date: "2024-04-19", paid: 243, unpaid: 180 },
  { date: "2024-04-20", paid: 89, unpaid: 150 },
  { date: "2024-04-21", paid: 137, unpaid: 200 },
  { date: "2024-04-22", paid: 224, unpaid: 170 },
  { date: "2024-04-23", paid: 138, unpaid: 230 },
  { date: "2024-04-24", paid: 387, unpaid: 290 },
  { date: "2024-04-25", paid: 215, unpaid: 250 },
  { date: "2024-04-26", paid: 75, unpaid: 130 },
  { date: "2024-04-27", paid: 383, unpaid: 420 },
  { date: "2024-04-28", paid: 122, unpaid: 180 },
  { date: "2024-04-29", paid: 315, unpaid: 240 },
  { date: "2024-04-30", paid: 454, unpaid: 380 },
  { date: "2024-05-01", paid: 165, unpaid: 220 },
  { date: "2024-05-02", paid: 293, unpaid: 310 },
  { date: "2024-05-03", paid: 247, unpaid: 190 },
  { date: "2024-05-04", paid: 385, unpaid: 420 },
  { date: "2024-05-05", paid: 481, unpaid: 390 },
  { date: "2024-05-06", paid: 498, unpaid: 520 },
  { date: "2024-05-07", paid: 388, unpaid: 300 },
  { date: "2024-05-08", paid: 149, unpaid: 210 },
  { date: "2024-05-09", paid: 227, unpaid: 180 },
  { date: "2024-05-10", paid: 293, unpaid: 330 },
  { date: "2024-05-11", paid: 335, unpaid: 270 },
  { date: "2024-05-12", paid: 197, unpaid: 240 },
  { date: "2024-05-13", paid: 197, unpaid: 160 },
  { date: "2024-05-14", paid: 448, unpaid: 490 },
  { date: "2024-05-15", paid: 473, unpaid: 380 },
  { date: "2024-05-16", paid: 338, unpaid: 400 },
  { date: "2024-05-17", paid: 499, unpaid: 420 },
  { date: "2024-05-18", paid: 315, unpaid: 350 },
  { date: "2024-05-19", paid: 235, unpaid: 180 },
  { date: "2024-05-20", paid: 177, unpaid: 230 },
  { date: "2024-05-21", paid: 82, unpaid: 140 },
  { date: "2024-05-22", paid: 81, unpaid: 120 },
  { date: "2024-05-23", paid: 252, unpaid: 290 },
  { date: "2024-05-24", paid: 294, unpaid: 220 },
  { date: "2024-05-25", paid: 201, unpaid: 250 },
  { date: "2024-05-26", paid: 213, unpaid: 170 },
  { date: "2024-05-27", paid: 420, unpaid: 460 },
  { date: "2024-05-28", paid: 233, unpaid: 190 },
  { date: "2024-05-29", paid: 78, unpaid: 130 },
  { date: "2024-05-30", paid: 340, unpaid: 280 },
  { date: "2024-05-31", paid: 178, unpaid: 230 },
  { date: "2024-06-01", paid: 178, unpaid: 200 },
  { date: "2024-06-02", paid: 470, unpaid: 410 },
  { date: "2024-06-03", paid: 103, unpaid: 160 },
  { date: "2024-06-04", paid: 439, unpaid: 380 },
  { date: "2024-06-05", paid: 88, unpaid: 140 },
  { date: "2024-06-06", paid: 294, unpaid: 250 },
  { date: "2024-06-07", paid: 323, unpaid: 370 },
  { date: "2024-06-08", paid: 385, unpaid: 320 },
  { date: "2024-06-09", paid: 438, unpaid: 480 },
  { date: "2024-06-10", paid: 155, unpaid: 200 },
  { date: "2024-06-11", paid: 92, unpaid: 150 },
  { date: "2024-06-12", paid: 492, unpaid: 420 },
  { date: "2024-06-13", paid: 81, unpaid: 130 },
  { date: "2024-06-14", paid: 426, unpaid: 380 },
  { date: "2024-06-15", paid: 307, unpaid: 350 },
  { date: "2024-06-16", paid: 371, unpaid: 310 },
  { date: "2024-06-17", paid: 475, unpaid: 520 },
  { date: "2024-06-18", paid: 107, unpaid: 170 },
  { date: "2024-06-19", paid: 341, unpaid: 290 },
  { date: "2024-06-20", paid: 408, unpaid: 450 },
  { date: "2024-06-21", paid: 169, unpaid: 210 },
  { date: "2024-06-22", paid: 317, unpaid: 270 },
  { date: "2024-06-23", paid: 480, unpaid: 530 },
  { date: "2024-06-24", paid: 132, unpaid: 180 },
  { date: "2024-06-25", paid: 141, unpaid: 190 },
  { date: "2024-06-26", paid: 434, unpaid: 380 },
  { date: "2024-06-27", paid: 448, unpaid: 490 },
  { date: "2024-06-28", paid: 149, unpaid: 200 },
  { date: "2024-06-29", paid: 103, unpaid: 160 },
  { date: "2024-06-30", paid: 446, unpaid: 400 },
]

export const overviewChartSeries = [
  { key: "paid",   label: "Paid",   color: "var(--color-primary)" },
  { key: "unpaid", label: "Unpaid", color: "var(--color-primary)" },
]


export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-NG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard
              key={s.title}
              title={s.title}
              value={s.value}
              sub={s.sub}
              trend={s.trend}
              icon={s.icon}
          />
        ))}
        </div>

        <OverviewChartBar
          title="Invoices Data"
          description="Paid & Unpaid Invoices"
          dateKey="date"
          data={chartData}
          series={overviewChartSeries}
        />
        
    </div>
  );
}