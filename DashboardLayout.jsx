import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  ShieldAlert,
  GitBranch,
  Share2,
  FileText,
  Menu,
  X,
  ArrowLeft,
  Undo2,
  Home,
} from "lucide-react";
import { useState } from "react";
import WriftoLogo from "../components/WriftoLogo.jsx";

const nav = [
  { to: "/app/dashboard", label: "Analysis", icon: LayoutDashboard },
  { to: "/app/upload", label: "Upload", icon: Upload },
  { to: "/app/fraud", label: "Fraud ML", icon: ShieldAlert },
  { to: "/app/fund-flow", label: "Fund flow", icon: GitBranch },
  { to: "/app/entities", label: "Entities", icon: Share2 },
  { to: "/app/reports", label: "Reports", icon: FileText },
];

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-bank-navy text-slate-100 border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col min-h-screen ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center gap-2 px-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 rounded-lg outline-none ring-offset-2 ring-offset-bank-navy focus-visible:ring-2 focus-visible:ring-sky-400" title="WRIFTO — back to home">
            <WriftoLogo theme="onDark" markSize={38} />
          </Link>
        </div>
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/10 text-white shadow-inner border border-white/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0 opacity-90" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 text-xs text-slate-500 shrink-0 space-y-2">
          <div className="flex flex-col gap-1.5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-200 hover:bg-white/10 hover:text-white transition font-medium"
            >
              <Home className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Back to home
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-slate-300 hover:bg-white/10 hover:text-white transition font-medium w-full"
            >
              <Undo2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Go back
            </button>
          </div>
          <p className="truncate opacity-70 border-t border-white/10 pt-2">{loc.pathname}</p>
        </div>
      </aside>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <header className="h-14 lg:h-16 bg-white border-b border-slate-200 flex items-center justify-between gap-2 px-4 lg:px-8 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-bank-blue shrink-0"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                to="/"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 sm:px-2.5 text-[11px] sm:text-xs font-semibold text-bank-blue hover:bg-white transition"
                title="Marketing home"
              >
                <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 sm:px-2.5 text-[11px] sm:text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Undo2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 border-l border-slate-200 pl-2 sm:pl-3">
              <Link to="/app/dashboard" className="shrink-0" title="Console home">
                <WriftoLogo theme="onLight" markSize={36} />
              </Link>
              <div className="hidden md:block min-w-0">
                <p className="text-xs text-slate-500 leading-snug">AI-assisted fraud detection and fund flow intelligence</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live monitoring (demo)
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
