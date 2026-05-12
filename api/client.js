const API_BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: options.body instanceof FormData ? {} : { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText || "Request failed");
  }
  const ct = res.headers.get("content-type");
  if (ct && ct.includes("application/json")) return res.json();
  return res;
}

export const api = {
  health: () => request("/api/health"),
  summary: () => request("/api/transactions/summary"),
  transactions: (limit) => request(`/api/transactions?limit=${limit || 500}`),
  fraudPredictions: () => request("/api/fraud/predictions"),
  fundFlowGraph: () => request("/api/fund-flow/graph"),
  entityGraph: () => request("/api/entity-graph"),
  volumeByDay: () => request("/api/charts/volume-by-day"),
  riskDistribution: () => request("/api/charts/risk-distribution"),
  uploads: () => request("/api/uploads"),
  uploadFiles: (formData) =>
    fetch(`${API_BASE}/api/upload`, { method: "POST", body: formData }).then(async (res) => {
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Upload failed");
      return res.json();
    }),
  deleteUpload: (id) =>
    request(`/api/uploads/${id}`, { method: "DELETE" }),
  fraudReportPdfUrl: () => `${API_BASE}/api/reports/fraud-analysis.pdf`,
};
