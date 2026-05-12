import { Link } from "react-router-dom";
import { ArrowRight, Shield, LineChart } from "lucide-react";
import WriftoLogo from "../components/WriftoLogo.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 lg:px-12">
        <Link
          to="/"
          className="flex items-center gap-2 text-white rounded-lg outline-none ring-offset-2 ring-offset-transparent focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label="WRIFTO home"
        >
          <WriftoLogo theme="onDark" markSize={40} />
        </Link>
        <Link
          to="/app/dashboard"
          className="text-sm font-medium text-white/90 hover:text-white border border-white/30 rounded-lg px-4 py-2 backdrop-blur-sm bg-white/5 transition"
        >
          Sign in to console
        </Link>
      </header>

      <section className="relative flex-1 hero-grid flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl animate-float" />
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl stagger-2 animate-float" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 lg:py-36 lg:px-12 text-center lg:text-left lg:flex lg:gap-16 lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm opacity-0 animate-fade-up">
              <Shield className="h-3.5 w-3.5 text-sky-300" />
              Enterprise-grade AI fraud analytics
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight opacity-0 animate-fade-up stagger-1">
              WRIFTO — financial data analysis & fraud detection
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-up stagger-2">
              Monitor transactions in real time, surface anomalies with machine learning, and trace fund flows
              across accounts and counterparties—built for modern banking operations teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start opacity-0 animate-fade-up stagger-3">
              <Link
                to="/app/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-bank-blue px-6 py-3.5 text-sm font-semibold shadow-lg hover:bg-slate-100 transition transform hover:scale-[1.02]"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/app/upload"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 text-white px-6 py-3.5 text-sm font-semibold bg-white/5 hover:bg-white/10 backdrop-blur transition"
              >
                Upload statement
                <LineChart className="h-4 w-4" />
              </Link>
            </div>
            <div className="pt-4 flex flex-wrap gap-6 justify-center lg:justify-start text-slate-400 text-sm opacity-0 animate-fade-up stagger-4">
              <div>
                <p className="font-display text-2xl font-semibold text-white">40+</p>
                <p>Sample transactions</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-white">ML</p>
                <p>Ensemble risk scoring</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-white">Graph</p>
                <p>Flow & entity mapping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} WRIFTO — demonstration environment.
      </footer>
    </div>
  );
}
