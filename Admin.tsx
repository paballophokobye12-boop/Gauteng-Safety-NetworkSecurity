import { useState } from "react";

type AdminReport = {
    id: number;
    area: string;
    type: string;
    details: string;
    status: "Pending" | "Approved" | "Rejected";
};

export default function Admin() {
    const [reports, setReports] = useState<AdminReport[]>([
        { id: 1, area: "Centurion", type: "Theft", details: "Phone snatched near station", status: "Pending" },
        { id: 2, area: "Pretoria Central", type: "Hijacking", details: "Suspicious vehicle following", status: "Pending" },
        { id: 3, area: "Sandton", type: "Theft", details: "Bag stolen at intersection", status: "Approved" },
        { id: 4, area: "Soweto", type: "Suspicious Activity", details: "Unknown car parked 3 hours", status: "Approved" },
        { id: 5, area: "Midrand", type: "Road Hazard", details: "Pothole on N1", status: "Rejected" },
    ]);

    const [filter, setFilter] = useState("All");
    const [audit, setAudit] = useState<string[]>([
        "Admin approved report #3 — Sandton Theft — 18:42",
        "Admin rejected report #5 — Midrand Road Hazard (duplicate) — 18:10",
    ]);

    const setStatus = (id: number, status: "Approved" | "Rejected") => {
        setReports(reports.map(r => r.id === id ? { ...r, status } : r));
        const report = reports.find(r => r.id === id);
        setAudit([`Admin ${status.toLowerCase()} report #${id} — ${report?.area} ${report?.type} — Just now`, ...audit]);
    };

    const total = reports.length;
    const pending = reports.filter(r => r.status === "Pending").length;
    const approved = reports.filter(r => r.status === "Approved").length;
    const rejected = reports.filter(r => r.status === "Rejected").length;

    const byType: Record<string, number> = {};
    reports.forEach(r => { byType[r.type] = (byType[r.type] || 0) + 1; });

    const byArea: Record<string, number> = {};
    reports.forEach(r => { byArea[r.area] = (byArea[r.area] || 0) + 1; });

    const shown = reports.filter(r => filter === "All" || r.status === filter);

    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 1000, margin: "0 auto", padding: 20 }}>
            <h2>🛡️ Admin & Moderation Dashboard</h2>
            <p style={{ color: "#475569" }}>Role: Administrator • Only approved reports appear on the public map. Data is moderated reports, not official crime statistics.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                {[
                    { label: "Total Reports", value: total, color: "#0f172a" },
                    { label: "Pending Review", value: pending, color: "#eab308" },
                    { label: "Approved", value: approved, color: "#22c55e" },
                    { label: "Rejected", value: rejected, color: "#ef4444" },
                ].map(c => (
                    <div key={c.label} style={{ background: "white", padding: 18, borderRadius: 12, border: "1px solid #e2e8f0", textAlign: "center" }}>
                        <div style={{ fontSize: 32, fontWeight: "bold", color: c.color }}>{c.value}</div>
                        <div style={{ color: "#64748b", fontSize: 13 }}>{c.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                <div style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0" }}>
                    <b>📊 By Category</b>
                    {Object.entries(byType).map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 14 }}>
                            <span>{k}</span><b>{v}</b>
                        </div>
                    ))}
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10 }}>Caveat: Small sample, reporting bias possible. Not official stats.</p>
                </div>
                <div style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0" }}>
                    <b>📍 By Area</b>
                    {Object.entries(byArea).map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 14 }}>
                            <span>{k}</span><b>{v} reports</b>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                {["All", "Pending", "Approved", "Rejected"].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 16px", borderRadius: 20, border: "1px solid #cbd5e1", background: filter === f ? "#0f172a" : "white", color: filter === f ? "white" : "black", cursor: "pointer" }}>{f}</button>
                ))}
            </div>

            {shown.map(r => (
                <div key={r.id} style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", marginTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <b>#{r.id} — {r.area} — {r.type}</b>
                        <span style={{ background: r.status === "Pending" ? "#eab308" : r.status === "Approved" ? "#22c55e" : "#ef4444", color: "white", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>{r.status}</span>
                    </div>
                    <p style={{ color: "#475569", margin: "8px 0" }}>{r.details}</p>
                    {r.status === "Pending" && (
                        <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => setStatus(r.id, "Approved")} style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" }}>✓ Approve & Publish</button>
                            <button onClick={() => setStatus(r.id, "Rejected")} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" }}>✕ Reject</button>
                        </div>
                    )}
                </div>
            ))}

            <h3 style={{ marginTop: 24 }}>📜 Audit Log</h3>
            <div style={{ background: "#0f172a", color: "#cbd5e1", padding: 16, borderRadius: 12, fontSize: 13 }}>
                {audit.map((a, i) => <div key={i} style={{ marginBottom: 6 }}>• {a}</div>)}
            </div>
        </div>
    );
}