import { Download, FileBadge } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { api } from "../api/client.js";

export default function ReportsPage() {
  const pdfHref = api.fraudReportPdfUrl();

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Export a concise fraud analysis PDF generated server-side with ReportLab. Includes summary metrics and the highest-risk transactions from the sample ledger."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-card flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-bank-blue text-white flex items-center justify-center">
              <FileBadge className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-bank-blue">Fraud analysis pack</h3>
              <p className="text-sm text-slate-600">PDF · one-click download from Flask</p>
            </div>
          </div>
          <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
            <li>Executive summary and model version</li>
            <li>Flagged transaction table with anomaly tags</li>
            <li>Bank-branded table styling for distribution</li>
          </ul>
          <a
            href={pdfHref}
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-bank-blue text-white px-5 py-3 text-sm font-semibold shadow hover:bg-bank-accent transition w-fit"
          >
            <Download className="h-4 w-4" />
            Download PDF report
          </a>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 flex flex-col justify-center text-sm text-slate-600">
          <p className="font-medium text-bank-blue mb-2">Integration notes</p>
          <p>
            In production, wire this endpoint to your document service, add authentication, and stream signed URLs.
            The demo builds the PDF in memory from <code className="text-xs bg-white px-1 rounded border">sample_transactions.json</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
