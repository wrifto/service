"""Flask API for WRIFTO."""

import json
import os
import uuid
from datetime import datetime, timezone
from io import BytesIO

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

_uploaded_files: list[dict] = []


def _load_json(name: str) -> dict | list:
    path = os.path.join(DATA_DIR, name)
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _dataset() -> dict:
    raw = _load_json("sample_transactions.json")
    return {"transactions": raw["transactions"], "mlModel": raw["mlModel"]}


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "wrifto-api", "ts": datetime.now(timezone.utc).isoformat()})

    @app.get("/api/transactions/summary")
    def transactions_summary():
        data = _dataset()
        txs = data["transactions"]
        total = len(txs)
        fraud_count = sum(1 for t in txs if t.get("isFraudulent"))
        total_volume = sum(float(t["amount"]) for t in txs)
        avg_risk = sum(float(t.get("riskScore", 0)) for t in txs) / max(total, 1)
        return jsonify(
            {
                "totalTransactions": total,
                "fraudulentCount": fraud_count,
                "totalMoneyTransferred": round(total_volume, 2),
                "averageRiskScore": round(avg_risk, 1),
                "riskScorePercent": min(100, round(avg_risk, 1)),
                "currency": "USD",
                "mlModel": data["mlModel"],
            }
        )

    @app.get("/api/transactions")
    def transactions_list():
        limit = request.args.get("limit", type=int) or 500
        data = _dataset()
        return jsonify({"transactions": data["transactions"][:limit]})

    @app.get("/api/fraud/predictions")
    def fraud_predictions():
        data = _dataset()
        preds = []
        for t in data["transactions"]:
            preds.append(
                {
                    "transactionId": t["id"],
                    "riskScore": t.get("riskScore"),
                    "fraudProbability": round(min(0.999, max(0.001, t.get("riskScore", 0) / 100)), 3),
                    "predictedFraud": bool(t.get("isFraudulent")),
                    "anomalyFlags": t.get("anomalyFlags") or [],
                    "modelConfidence": round(0.75 + (t.get("riskScore", 0) / 500), 3),
                }
            )
        return jsonify({"predictions": preds, "mlModel": data["mlModel"]})

    @app.get("/api/fund-flow/graph")
    def fund_flow_graph():
        return jsonify(_load_json("fund_flow_graph.json"))

    @app.get("/api/entity-graph")
    def entity_graph():
        return jsonify(_load_json("entity_graph.json"))

    @app.get("/api/charts/volume-by-day")
    def chart_volume_by_day():
        """Aggregate sample volume for dashboard charts."""
        data = _dataset()
        from collections import defaultdict

        by_day: dict[str, dict] = defaultdict(lambda: {"volume": 0.0, "count": 0, "fraud": 0})
        for t in data["transactions"]:
            day = t["timestamp"][:10]
            by_day[day]["volume"] += float(t["amount"])
            by_day[day]["count"] += 1
            if t.get("isFraudulent"):
                by_day[day]["fraud"] += 1
        series = [
            {"date": k, "volume": round(v["volume"], 2), "count": v["count"], "fraudCount": v["fraud"]}
            for k, v in sorted(by_day.items())
        ]
        return jsonify({"series": series})

    @app.get("/api/charts/risk-distribution")
    def risk_distribution():
        data = _dataset()
        buckets = {"0-25": 0, "26-50": 0, "51-75": 0, "76-100": 0}
        for t in data["transactions"]:
            r = float(t.get("riskScore", 0))
            if r <= 25:
                buckets["0-25"] += 1
            elif r <= 50:
                buckets["26-50"] += 1
            elif r <= 75:
                buckets["51-75"] += 1
            else:
                buckets["76-100"] += 1
        return jsonify({"buckets": [{"label": k, "value": v} for k, v in buckets.items()]})

    @app.post("/api/upload")
    def upload_files():
        """Accept multipart uploads; store metadata only (demo)."""
        global _uploaded_files
        if "files" not in request.files:
            return jsonify({"error": "No files field"}), 400
        files = request.files.getlist("files")
        added = []
        for f in files:
            if not f or not f.filename:
                continue
            ext = os.path.splitext(f.filename)[1].lower()
            if ext not in (".pdf", ".csv", ".xlsx", ".xls"):
                return jsonify({"error": f"Unsupported type: {f.filename}"}), 400
            meta = {
                "id": str(uuid.uuid4()),
                "name": f.filename,
                "sizeBytes": request.content_length or 0,
                "uploadedAt": datetime.now(timezone.utc).isoformat(),
                "status": "queued_for_analysis",
            }
            _uploaded_files.insert(0, meta)
            added.append(meta)
        return jsonify({"uploaded": added, "all": _uploaded_files[:50]})

    @app.get("/api/uploads")
    def list_uploads():
        return jsonify({"files": _uploaded_files})

    @app.delete("/api/uploads/<file_id>")
    def delete_upload(file_id: str):
        global _uploaded_files
        _uploaded_files = [x for x in _uploaded_files if x["id"] != file_id]
        return jsonify({"ok": True})

    @app.get("/api/reports/fraud-analysis.pdf")
    def report_pdf():
        data = _dataset()
        txs = data["transactions"]
        fraud = [t for t in txs if t.get("isFraudulent")]
        buf = BytesIO()
        doc = SimpleDocTemplate(buf, pagesize=letter, title="WRIFTO — Fraud analysis report")
        styles = getSampleStyleSheet()
        story = [
            Paragraph("WRIFTO", styles["Title"]),
            Spacer(1, 12),
            Paragraph("Fraud Analysis Report (Sample)", styles["Heading2"]),
            Spacer(1, 8),
            Paragraph(f"Generated: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}", styles["Normal"]),
            Spacer(1, 16),
            Paragraph(
                f"Total transactions: {len(txs)} | Flagged: {len(fraud)} | "
                f"Model: {data['mlModel']['name']} v{data['mlModel']['version']}",
                styles["Normal"],
            ),
            Spacer(1, 20),
        ]
        table_data = [["ID", "Amount", "Risk", "Flags", "Fraud"]]
        for t in fraud[:20]:
            flags = ", ".join(t.get("anomalyFlags") or [])
            table_data.append(
                [
                    t["id"],
                    f"${t['amount']:,.2f}",
                    str(t.get("riskScore", "")),
                    flags[:40] + ("…" if len(flags) > 40 else ""),
                    "Yes",
                ]
            )
        tbl = Table(table_data, repeatRows=1)
        tbl.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f2744")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 9),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f3f4f6")]),
                    ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#cbd5e1")),
                ]
            )
        )
        story.append(tbl)
        doc.build(story)
        buf.seek(0)
        return send_file(
            buf,
            mimetype="application/pdf",
            as_attachment=True,
            download_name="fraud-analysis-report.pdf",
        )

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
