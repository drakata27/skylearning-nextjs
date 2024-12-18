"use client";

import { Bar, BarChart, CartesianGrid, LabelList } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface SectionSummaryProps {
  notesCount: number;
  decksCount: number;
}

export function SectionSummary({
  notesCount,
  decksCount,
}: SectionSummaryProps) {
  const chartData = [
    { item: "Notes", count: notesCount },
    { item: "Decks", count: decksCount },
  ];

  const chartConfig = {
    item: {
      label: "Item",
      color: "#2563eb",
    },
    count: {
      label: "Count",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        data={chartData}
        barSize={30}
        margin={{ top: 20, right: 30, bottom: 40, left: 20 }}
      >
        <CartesianGrid vertical={false} />
        <Bar dataKey="count" fill={chartConfig.count.color} radius={3}>
          <LabelList dataKey="count" position="top" fontSize={20} />
        </Bar>

        <Bar dataKey="item" fill={chartConfig.item.color} radius={4}>
          <LabelList
            dataKey="item"
            position="inside"
            content={(props) => {
              const { x, y, value } = props;

              // Guard against undefined values
              if (typeof x !== "number" || typeof y !== "number" || !value) {
                return null;
              }
              return (
                <text
                  x={x}
                  y={y + 22}
                  fill="#ffffff"
                  textAnchor="middle"
                  fontSize={20}
                >
                  {value}
                </text>
              );
            }}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
