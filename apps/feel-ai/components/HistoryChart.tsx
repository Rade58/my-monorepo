"use client";
import type { FeelAnalysis } from "db_two";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

export default function HistoryChart({
  analyses,
}: {
  analyses: FeelAnalysis[];
}) {
  return (
    // @ts-expect-error RSC
    <ResponsiveContainer width="60%" height="60%">
      {/* @ts-expect-error RSC */}
      <LineChart width={200} height={50} data={analyses}>
        {/* @ts-expect-error RSC */}
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="crimson"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="updatedAt" />
        {/* @ts-ignore */}
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  payload,
  label,
  active,
}: {
  active: boolean;
  label: string;
  payload: { payload: FeelAnalysis }[];
}) {
  const dateLabel = new Date(label).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  if (active) {
    const analysis = payload[0].payload;

    return (
      <div className="p-8 custom-tooltip bg-info/60 shadow-md text-base-content border-secondary/20 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full bg-primary"
          // style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    );
  }

  return null;
}
