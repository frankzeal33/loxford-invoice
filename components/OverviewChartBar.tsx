"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"

interface OverviewChartBarProps {
  title: string
  description: string
  data: Record<string, string | number>[]
  dateKey: string
  series: {
    key: string
    label: string
    color?: string
  }[]
}

export function OverviewChartBar({
  title,
  description,
  data,
  dateKey,
  series,
}: OverviewChartBarProps) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = { views: { label: "Invoices" } }
    for (const s of series) {
      config[s.key] = {
        label: s.label,
        color: s.color ?? "var(--color-primary)",
      }
    }
    return config
  }, [series])

  const [activeChart, setActiveChart] = React.useState(series[0]?.key ?? "")

  const total = React.useMemo(() => {
    const result: Record<string, number> = {}
    for (const s of series) {
      result[s.key] = data.reduce((acc, row) => acc + (Number(row[s.key]) || 0), 0)
    }
    return result
  }, [data, series])

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex">
          {series.map((s) => (
            <button
              key={s.key}
              data-active={activeChart === s.key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              onClick={() => setActiveChart(s.key)}
            >
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                {total[s.key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
          <BarChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dateKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-37.5"
                  nameKey="views"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={
                series.find((s) => s.key === activeChart)?.color ??
                "var(--color-primary)"
              }
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}