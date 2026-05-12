import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import FinanceCytoscape from "../components/FinanceCytoscape.jsx";
import { api } from "../api/client.js";

export default function FundFlowPage() {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    api.fundFlowGraph().then(setGraph).catch(() => setGraph(null));
  }, []);

  return (
    <div>
      <PageHeader
        title="Fund flow tracking"
        subtitle="Network view of balances and wires across treasury, retail, and external sinks. Edge thickness encodes aggregate flow; red edges are model-flagged paths."
      />
      <FinanceCytoscape graph={graph} variant="flow" />
      <p className="mt-4 text-xs text-slate-500">
        Tip: scroll to zoom, drag the canvas to pan. Powered by Cytoscape.js.
      </p>
    </div>
  );
}
