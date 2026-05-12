import { useEffect, useState } from "react";
import { Brain, Gauge, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { api } from "../api/client.js";

function rowClass(score, fraud) {
  if (fraud || score >= 76) return "bg-rose-50 text-rose-950 border-l-4 border-rose-600";
  if (score >= 51) return "bg-amber-50/80 border-l-4 border-amber-500";
  return "hover:bg-slate-50/80";
}

export default function FraudPage() {
  const [preds, setPreds] = useState([]);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .fraudPredictions()
      .then((r) => {
        setPreds(r.predictions || []);
        setModel(r.mlModel || null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Fraud detection (ML)"
        subtitle="Ensemble model scores each transaction. High-risk rows are highlighted in red for operator review. Outputs are deterministic sample data for this demo."
      />

      {model && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-bank-blue to-bank-navy text-white p-5 shadow-lg border border-white/10">
            <div className="flex items-center gap-2 text-sky-200 text-xs uppercase tracking-wide">
              <Brain className="h-4 w-4" /> Model
            </div>
            <p className="mt-2 font-display font-semibold text-lg leading-snug">{model.name}</p>
            <p className="text-xs text-slate-300 mt-1">v{model.version}</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
            <p className="text-xs text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5" /> Precision
            </p>
            <p className="mt-2 font-display text-2xl text-bank-blue">{(model.precision * 100).toFixed(1)}%</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Recall</p>
            <p className="mt-2 font-display text-2xl text-bank-blue">{(model.recall * 100).toFixed(1)}%</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
            <p className="text-xs text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> F1 score
            </p>
            <p className="mt-2 font-display text-2xl text-bank-blue">{(model.f1Score * 100).toFixed(1)}%</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display font-semibold text-bank-blue">Anomaly detection results</h3>
          {loading ? <span className="text-xs text-slate-500">Loading…</span> : null}
        </div>
        <div className="overflow-x-auto max-h-[620px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-slate-100 text-left text-xs uppercase text-slate-600 shadow-sm">
              <tr>
                <th className="px-3 py-2">Txn ID</th>
                <th className="px-3 py-2">Risk score</th>
                <th className="px-3 py-2">Fraud prob.</th>
                <th className="px-3 py-2">Predicted</th>
                <th className="px-3 py-2">Confidence</th>
                <th className="px-3 py-2">Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {preds.map((p) => (
                <tr key={p.transactionId} className={`${rowClass(p.riskScore, p.predictedFraud)} transition-colors`}>
                  <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">{p.transactionId}</td>
                  <td className="px-3 py-2 tabular-nums font-semibold">{p.riskScore}</td>
                  <td className="px-3 py-2 tabular-nums">{(p.fraudProbability * 100).toFixed(1)}%</td>
                  <td className="px-3 py-2">
                    {p.predictedFraud ? (
                      <span className="text-rose-700 font-semibold text-xs">Fraud</span>
                    ) : (
                      <span className="text-slate-600 text-xs">Clean</span>
                    )}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-slate-700">{(p.modelConfidence * 100).toFixed(1)}%</td>
                  <td className="px-3 py-2 text-xs text-slate-600 max-w-xs">
                    {(p.anomalyFlags || []).join(", ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
