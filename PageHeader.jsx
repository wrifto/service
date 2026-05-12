import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Undo2 } from "lucide-react";

export default function PageHeader({ title, subtitle, action, showBackBar = true }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 opacity-0 animate-fade-up">
      {showBackBar && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-bank-blue shadow-sm hover:bg-slate-50 hover:border-slate-300 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <Undo2 className="h-3.5 w-3.5" aria-hidden />
            Go back
          </button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-bank-blue">{title}</h2>
          {subtitle && <p className="text-slate-600 text-sm mt-1 max-w-2xl">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}
