import { useEffect, useState } from "react";
import { Trash2, FileStack, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import UploadDropzone from "../components/UploadDropzone.jsx";
import { api } from "../api/client.js";

export default function UploadPage() {
  const [files, setFiles] = useState([]);

  const refresh = () => {
    api
      .uploads()
      .then((r) => setFiles(r.files || []))
      .catch(() => {});
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <PageHeader
        title="Statement upload"
        subtitle="Ingest retail and corporate statements. The demo API records file metadata only—no persistent storage of sensitive content."
      />
      <UploadDropzone
        onUploaded={(list) => {
          setFiles(list);
        }}
      />
      <div className="mt-8 rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileStack className="h-5 w-5 text-bank-accent" />
            <h3 className="font-display font-semibold text-bank-blue">Uploaded files</h3>
          </div>
          <span className="text-xs text-slate-500">{files.length} item(s)</span>
        </div>
        {files.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">No uploads yet. Drop files above to populate this list.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {files.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50/80 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 truncate">{f.name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    {new Date(f.uploadedAt).toLocaleString()} · {f.status}
                  </p>
                </div>
                <button
                  type="button"
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  onClick={() =>
                    api.deleteUpload(f.id).then(() => setFiles((prev) => prev.filter((x) => x.id !== f.id)))
                  }
                  aria-label={`Remove ${f.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
