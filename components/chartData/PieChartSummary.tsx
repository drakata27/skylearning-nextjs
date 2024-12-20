"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartSummaryProps {
  sectionsCount: number;
  notesCount: number;
  decksCount: number;
}

export function PieChartSummary({
  sectionsCount,
  notesCount,
  decksCount,
}: PieChartSummaryProps) {
  const chartData = [
    { item: "sections", count: sectionsCount, fill: "var(--color-chrome)" },
    { item: "notes", count: notesCount, fill: "var(--color-safari)" },
    { item: "decks", count: decksCount, fill: "var(--color-firefox)" },
    { item: "cards", count: 0, fill: "var(--color-edge)" },
  ];

  const chartConfig = {
    visitors: {
      label: "count",
    },
    chrome: {
      label: "Sections",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Notes",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Decks",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Cards",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Items</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="item"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {" "}
                          {sectionsCount + notesCount + decksCount}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
