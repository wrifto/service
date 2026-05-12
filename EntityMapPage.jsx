import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import FinanceCytoscape from "../components/FinanceCytoscape.jsx";
import { api } from "../api/client.js";

export default function EntityMapPage() {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    api.entityGraph().then(setGraph).catch(() => setGraph(null));
  }, []);

  return (
    <div>
      <PageHeader
        title="Entity relationship mapping"
        subtitle="Reveal hidden ties—UBO links, shared addresses, offshore beneficiaries, and crypto touchpoints. Edge width reflects inferred relationship strength."
      />
      <FinanceCytoscape graph={graph} variant="entity" />
    </div>
  );
}
