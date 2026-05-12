import cytoscape from "cytoscape";
import { useEffect, useMemo, useRef } from "react";

const flowStyles = [
  {
    selector: "node",
    style: {
      "background-color": "#1e4a7a",
      label: "data(label)",
      color: "#0f172a",
      "text-valign": "center",
      "text-halign": "center",
      "font-size": "10px",
      "font-weight": "600",
      width: "label",
      height: "label",
      padding: "12px",
      "text-wrap": "wrap",
      "text-max-width": "120px",
      "border-width": 2,
      "border-color": "#cbd5e1",
    },
  },
  {
    selector: "node[nodeType = 'external_high_risk']",
    style: {
      "background-color": "#7f1d1d",
      "border-color": "#fecaca",
      color: "#fff7ed",
    },
  },
  {
    selector: "node[nodeType = 'suspicious']",
    style: {
      "background-color": "#9a3412",
      "border-color": "#fed7aa",
      color: "#fffbeb",
    },
  },
  {
    selector: "node[nodeType = 'treasury']",
    style: { "background-color": "#0f2744", color: "#e2e8f0" },
  },
  {
    selector: "edge",
    style: {
      width: 2,
      "line-color": "#94a3b8",
      "target-arrow-color": "#94a3b8",
      "target-arrow-shape": "triangle-backcurve",
      "curve-style": "bezier",
      label: "data(label)",
      "font-size": "9px",
      color: "#475569",
      "text-background-color": "#ffffff",
      "text-background-opacity": 0.9,
      "text-background-padding": "3px",
    },
  },
  {
    selector: "edge[risk = 'high']",
    style: {
      "line-color": "#dc2626",
      width: 4,
      "target-arrow-color": "#dc2626",
    },
  },
];

const entityStyles = [
  {
    selector: "node",
    style: {
      "background-color": "#e2e8f0",
      label: "data(label)",
      color: "#0f172a",
      "text-valign": "center",
      "text-halign": "center",
      "font-size": "10px",
      "font-weight": "600",
      width: "label",
      height: "label",
      padding: "12px",
      "text-wrap": "wrap",
      "text-max-width": "130px",
      "border-width": 2,
      "border-color": "#cbd5e1",
    },
  },
  {
    selector: "node[entityType = 'shell']",
    style: { "background-color": "#fecaca", "border-color": "#b91c1c", color: "#450a0a" },
  },
  {
    selector: "node[entityType = 'offshore']",
    style: { "background-color": "#fee2e2", "border-color": "#991b1b", color: "#450a0a" },
  },
  {
    selector: "node[entityType = 'vasp']",
    style: { "background-color": "#ffedd5", "border-color": "#c2410c", color: "#431407" },
  },
  {
    selector: "node[entityType = 'person']",
    style: { "background-color": "#dbeafe", "border-color": "#1d4ed8", color: "#1e3a8a" },
  },
  {
    selector: "node[entityType = 'business']",
    style: { "background-color": "#dcfce7", "border-color": "#15803d", color: "#14532d" },
  },
  {
    selector: "node[entityType = 'internal']",
    style: { "background-color": "#e0e7ff", "border-color": "#4338ca", color: "#312e81" },
  },
  {
    selector: "node[entityType = 'location']",
    style: { "background-color": "#fae8ff", "border-color": "#a21caf", color: "#4a044e" },
  },
  {
    selector: "node[entityType = 'unknown']",
    style: { "background-color": "#f1f5f9", "border-color": "#64748b", color: "#0f172a" },
  },
  {
    selector: "node[entityType = 'vendor']",
    style: { "background-color": "#ccfbf1", "border-color": "#0f766e", color: "#134e4a" },
  },
  {
    selector: "edge",
    style: {
      width: "mapData(strength, 0, 1, 1.5, 5)",
      "line-color": "#64748b",
      "target-arrow-color": "#64748b",
      "target-arrow-shape": "triangle",
      "curve-style": "unbundled-bezier",
      label: "data(label)",
      "font-size": "9px",
      color: "#334155",
      "text-rotation": "autorotate",
      "text-background-color": "#ffffff",
      "text-background-opacity": 0.95,
      "text-background-padding": "3px",
    },
  },
];

export default function FinanceCytoscape({ graph, variant = "flow" }) {
  const containerRef = useRef(null);

  const elements = useMemo(() => {
    if (!graph?.nodes || !graph?.edges) return [];
    return [...graph.nodes, ...graph.edges];
  }, [graph]);

  const stylesheet = variant === "entity" ? entityStyles : flowStyles;

  useEffect(() => {
    if (!elements.length || !containerRef.current) return undefined;

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: stylesheet,
      layout: { name: "cose", padding: 28, nodeRepulsion: 8500, idealEdgeLength: 140 },
      minZoom: 0.2,
      maxZoom: 2.5,
      wheelSensitivity: 0.35,
    });
    cy.fit(undefined, 32);

    const onResize = () => {
      cy.resize();
      cy.fit(undefined, 32);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cy.destroy();
    };
  }, [elements, stylesheet]);

  if (!elements.length) {
    return (
      <div className="h-[520px] flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-500 text-sm">
        No graph data.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-inner">
      <div
        ref={containerRef}
        className="w-full h-[min(70vh,560px)] min-h-[420px]"
        role="img"
        aria-label="Transaction or entity network graph"
      />
    </div>
  );
}
