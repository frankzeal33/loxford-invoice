"use client";
import {
  FileText,
  TrendingUp,
  CreditCard,
  Clock,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
  Navigation,
  Beef,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { OverviewChartBar } from "@/components/OverviewChartBar";
import { StatCard } from "@/components/StatCard";
import Title from "@/components/Title";

type Product = "TRADING" | "FOODING" | "LOXPAY" | "NAVO" | "MEATNG";

interface ProductMeta {
  label: string;
  icon: React.ElementType;
  color: string;
  textColor: string;
  badgeCls: string;
}

interface StatCard {
  title: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
}

interface RecentReceipt {
  id: string;
  customer: string;
  initials: string;
  product: Product;
  amount: string;
  time: string;
  status: "Paid" | "Pending" | "Processing";
}

const PRODUCTS: Record<Product, ProductMeta> = {
  TRADING: {
    label: "Trading",
    icon: TrendingUp,
    color: "bg-violet-100 text-violet-700",
    textColor: "text-violet-700",
    badgeCls: "bg-violet-100 text-violet-700 border-violet-200",
  },
  FOODING: {
    label: "Fooding",
    icon: Utensils,
    color: "bg-emerald-100 text-emerald-700",
    textColor: "text-emerald-700",
    badgeCls: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  LOXPAY: {
    label: "LoxPay",
    icon: CreditCard,
    color: "bg-blue-100 text-blue-700",
    textColor: "text-blue-700",
    badgeCls: "bg-blue-100 text-blue-700 border-blue-200",
  },
  NAVO: {
    label: "Navo",
    icon: Navigation,
    color: "bg-slate-100 text-slate-700",
    textColor: "text-slate-600",
    badgeCls: "bg-slate-100 text-slate-700 border-slate-200",
  },
  MEATNG: {
    label: "Meatng",
    icon: Beef,
    color: "bg-amber-100 text-amber-700",
    textColor: "text-amber-700",
    badgeCls: "bg-amber-100 text-amber-700 border-amber-200",
  },
};

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

const PRODUCT_BREAKDOWN: { product: Product; count: number; pct: number }[] = [
  { product: "FOODING", count: 34, pct: 72 },
  { product: "LOXPAY", count: 26, pct: 55 },
  { product: "TRADING", count: 19, pct: 40 },
  { product: "MEATNG", count: 13, pct: 28 },
  { product: "NAVO", count: 7, pct: 15 },
];

const RECENT_RECEIPTS: RecentReceipt[] = [
  {
    id: "RCP-0071",
    customer: "Ade Okonkwo",
    initials: "AO",
    product: "FOODING",
    amount: "₦12,500",
    time: "2 min ago",
    status: "Paid",
  },
  {
    id: "RCP-0070",
    customer: "Tolu Martins",
    initials: "TM",
    product: "LOXPAY",
    amount: "₦8,200",
    time: "14 min ago",
    status: "Processing",
  },
  {
    id: "RCP-0069",
    customer: "Jide Eze",
    initials: "JE",
    product: "TRADING",
    amount: "₦45,000",
    time: "31 min ago",
    status: "Pending",
  },
  {
    id: "RCP-0068",
    customer: "Ngozi Kalu",
    initials: "NK",
    product: "MEATNG",
    amount: "₦6,750",
    time: "45 min ago",
    status: "Paid",
  },
  {
    id: "RCP-0067",
    customer: "Emeka Obi",
    initials: "EO",
    product: "NAVO",
    amount: "₦3,300",
    time: "1 hr ago",
    status: "Paid",
  },
];

const WEEK_DATA = [
  { day: "Mon", value: 31 },
  { day: "Tue", value: 28 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 39 },
  { day: "Fri", value: 47 },
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

function StatusBadge({ status }: { status: RecentReceipt["status"] }) {
  const cls =
    status === "Paid"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : status === "Processing"
      ? "bg-blue-100 text-blue-700 border-blue-200"
      : "bg-amber-100 text-amber-700 border-amber-200";
  return (
    <Badge variant="outline" className={`text-xs font-medium ${cls}`}>
      {status}
    </Badge>
  );
}

function WeeklyChart() {
  const max = Math.max(...WEEK_DATA.map((d) => d.value));
  return (
    <div className="flex h-40 items-end gap-3">
      {WEEK_DATA.map(({ day, value }) => (
        <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {value}
          </span>
          <div
            className="w-full rounded-t-md bg-primary/20 dark:bg-primary/30"
            style={{ height: "100%" }}
          >
            <div
              className="w-full rounded-t-md bg-primary transition-all duration-500"
              style={{ height: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{day}</span>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-6">

       <Title title='General Statistics'/>

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

      {/* Middle row: breakdown + recent */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

        {/* Receipts by product */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Receipts by product</CardTitle>
            <CardDescription>compare the distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {PRODUCT_BREAKDOWN.map(({ product, count, pct }) => {
              const meta = PRODUCTS[product];
              const Icon = meta.icon;
              return (
                <div key={product} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-md ${meta.color}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {meta.label}
                    </span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent receipts */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Recent receipts</CardTitle>
            <CardDescription>Last 5 transactions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_RECEIPTS.map((r) => {
                  const meta = PRODUCTS[r.product];
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback
                              className={`text-xs font-medium ${meta.color}`}
                            >
                              {r.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="leading-tight">
                            <p className="text-sm font-medium">{r.customer}</p>
                            <p className="text-xs text-muted-foreground">
                              {r.time}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${meta.badgeCls}`}
                        >
                          {meta.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{r.amount}</TableCell>
                      <TableCell className="pr-6 text-right">
                        <StatusBadge status={r.status} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

        <OverviewChartBar
            title="Invoices"
            description="Paid & Unpaid Invoices"
            dateKey="date"
            data={chartData}
            series={overviewChartSeries}
        />
        
    </div>
  );
}