import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({ label, value, hint, trend, delayClass = "" }) {
  const up = trend === "up";
  return (
    <div
      className={`rounded-xl bg-white border border-slate-200/80 p-5 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 opacity-0 animate-fade-up ${delayClass}`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-bank-blue tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {trend && (
        <p
          className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${
            up ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {up ? "Within expected band" : "Elevated vs baseline"}
        </p>
      )}
    </div>
  );
}
