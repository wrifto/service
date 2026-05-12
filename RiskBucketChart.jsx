import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function RiskBucketChart({ data }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
            formatter={(value) => [value, "Transactions"]}
          />
          <Bar dataKey="value" fill="#1e4a7a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
