import { useEffect, useState } from "react";
import { Activity, PieChart as PieIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import VolumeAreaChart from "../components/charts/VolumeAreaChart.jsx";
import RiskBucketChart from "../components/charts/RiskBucketChart.jsx";
import { api } from "../api/client.js";

const PIE_COLORS = ["#0f2744", "#dc2626"];

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [volume, setVolume] = useState([]);
  const [riskBuckets, setRiskBuckets] = useState([]);
  const [recent, setRecent] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.summary(), api.volumeByDay(), api.riskDistribution(), api.transactions(8)])
      .then(([s, v, r, t]) => {
        if (cancelled) return;
        setSummary(s);
        setVolume(v.series || []);
        setRiskBuckets(r.buckets || []);
        setRecent(t.transactions || []);
      })
      .catch((e) => {
        if (!cancelled) setErr(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const pieData =
    summary != null
      ? [
          { name: "Legitimate", value: summary.totalTransactions - summary.fraudulentCount },
          { name: "Flagged", value: summary.fraudulentCount },
        ]
      : [];

  return (
    <div>
      <PageHeader
        title="Transaction analysis"
        subtitle="Portfolio-level metrics powered by the demo API. Charts refresh from the same sample ledger used across the platform."
        action={
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Activity className="h-4 w-4 text-emerald-500" />
            Model v{summary?.mlModel?.version ?? "—"}
          </div>
        }
      />
      {err && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Could not reach API ({err}). Start the Flask server on port 5000, or charts will stay empty after retry.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard
          label="Total transactions"
          value={summary ? summary.totalTransactions.toLocaleString() : "—"}
          hint="Sample dataset window"
          trend="up"
        />
        <StatCard
          label="Fraudulent (ML flag)"
          value={summary ? summary.fraudulentCount.toLocaleString() : "—"}
          hint="Ground-truth labels for demo"
          trend={summary && summary.fraudulentCount > 5 ? "down" : "up"}
          delayClass="stagger-1"
        />
        <StatCard
          label="Total volume"
          value={summary ? `$${summary.totalMoneyTransferred.toLocaleString()}` : "—"}
          hint="Sum of absolute transaction amounts"
          delayClass="stagger-2"
        />
        <StatCard
          label="Risk score (avg)"
          value={summary ? `${summary.riskScorePercent}%` : "—"}
          hint="Normalized mean model output"
          delayClass="stagger-3"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-bank-blue">Daily payment volume</h3>
            <span className="text-xs text-slate-500">Recharts area</span>
          </div>
          <VolumeAreaChart data={volume} />
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <PieIcon className="h-4 w-4 text-bank-accent" />
            <h3 className="font-display font-semibold text-bank-blue">Fraud mix</h3>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={52} outerRadius={78} paddingAngle={3}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => v} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-bank-blue" /> Legitimate
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-600" /> Flagged
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
          <h3 className="font-display font-semibold text-bank-blue mb-4">Risk score distribution</h3>
          <RiskBucketChart data={riskBuckets} />
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-display font-semibold text-bank-blue">Recent transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Risk</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      row.isFraudulent ? "bg-rose-50/80" : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="px-4 py-2 font-mono text-xs">{row.id}</td>
                    <td className="px-4 py-2 tabular-nums">${Number(row.amount).toLocaleString()}</td>
                    <td className="px-4 py-2 tabular-nums">{row.riskScore}</td>
                    <td className="px-4 py-2">
                      {row.isFraudulent ? (
                        <span className="text-rose-700 font-medium text-xs">High risk</span>
                      ) : (
                        <span className="text-emerald-700 text-xs">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
