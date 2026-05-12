import { useCallback, useState } from "react";
import { FileSpreadsheet, FileText, UploadCloud, X } from "lucide-react";
import { api } from "../api/client.js";

const ACCEPT = ".pdf,.csv,.xlsx,.xls,application/pdf,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";

export default function UploadDropzone({ onUploaded }) {
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const upload = useCallback(
    async (fileList) => {
      const files = Array.from(fileList || []).filter(Boolean);
      if (!files.length) return;
      setBusy(true);
      setError(null);
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      try {
        const res = await api.uploadFiles(fd);
        onUploaded?.(res.all || []);
      } catch (e) {
        setError(e.message || "Upload failed");
      } finally {
        setBusy(false);
      }
    },
    [onUploaded]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        upload(e.dataTransfer.files);
      }}
      className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
        drag
          ? "border-sky-500 bg-sky-50 scale-[1.01] shadow-glow"
          : "border-slate-300 bg-slate-50/80 hover:border-bank-accent/50"
      }`}
    >
      <input
        type="file"
        multiple
        accept={ACCEPT}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={busy}
        onChange={(e) => upload(e.target.files)}
      />
      <div className="pointer-events-none flex flex-col items-center gap-3">
        <div className="h-14 w-14 rounded-2xl bg-bank-blue text-white flex items-center justify-center shadow-lg animate-float">
          <UploadCloud className="h-7 w-7" />
        </div>
        <div>
          <p className="font-display font-semibold text-bank-blue">Drag & drop bank statements</p>
          <p className="text-sm text-slate-600 mt-1">
            PDF, Excel (.xlsx, .xls), or CSV — files are validated and queued for analysis (demo).
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 border border-slate-200">
            <FileText className="h-3.5 w-3.5" /> PDF
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 border border-slate-200">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 border border-slate-200">
            <FileSpreadsheet className="h-3.5 w-3.5" /> CSV
          </span>
        </div>
        {busy && <p className="text-sm text-bank-accent font-medium">Uploading…</p>}
        {error && (
          <p className="text-sm text-rose-600 inline-flex items-center gap-1">
            <X className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
