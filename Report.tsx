import { useState } from "react";

type Report = {
    id: number;
    area: string;
    type: string;
    details: string;
    anonymous: boolean;
    status: "Pending" | "Approved" | "Rejected";
};

export default function Report() {
    const [area, setArea] = useState("Centurion");
    const [type, setType] = useState("Robbery");
    const [details, setDetails] = useState("");
    const [anonymous, setAnonymous] = useState(true);
    const [reports, setReports] = useState<Report[]>([
        { id: 1, area: "Pretoria Central", type: "Hijacking", details: "Suspicious vehicle following near station", anonymous: true, status: "Pending" },
        { id: 2, area: "Sandton", type: "Theft", details: "Phone snatched at intersection", anonymous: false, status: "Pending" },
    ]);

    const submit = () => {
        if (!details.trim()) return alert("Please write what happened");
        setReports([{ id: Date.now(), area, type, details, anonymous, status: "Pending" }, ...reports]);
        setDetails("");
        alert("Report submitted for moderation!");
    };

    const setStatus = (id: number, status: "Approved" | "Rejected") => {
        setReports(reports.map(r => r.id === id ? { ...r, status } : r));
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "0 auto", padding: 20 }}>
            <h2>📝 Report an Incident</h2>
            <p style={{ color: "#475569" }}>Your report goes to a moderator first. It only appears on the map after approval.</p>
            <div style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <label><b>Area</b></label>
                <select value={area} onChange={e => setArea(e.target.value)} style={{ width: "100%", padding: 12, margin: "8px 0 16px", borderRadius: 8 }}>
                    <option>Centurion</option><option>Pretoria Central</option><option>Johannesburg CBD</option><option>Sandton</option><option>Soweto</option><option>Midrand</option>
                </select>
                <label><b>Type</b></label>
                <select value={type} onChange={e => setType(e.target.value)} style={{ width: "100%", padding: 12, margin: "8px 0 16px", borderRadius: 8 }}>
                    <option>Robbery</option><option>Hijacking</option><option>Theft</option><option>Assault</option><option>Suspicious Activity</option><option>Other</option>
                </select>
                <label><b>What happened?</b></label>
                <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="e.g. Two people tried to open car doors at traffic light..." style={{ width: "100%", padding: 12, margin: "8px 0", borderRadius: 8, minHeight: 90 }} />
                <label style={{ display: "flex", gap: 8, alignItems: "center", margin: "12px 0" }}>
                    <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} /> Report anonymously
                </label>
                <button onClick={submit} style={{ background: "#ef4444", color: "white", border: "none", padding: "12px 20px", borderRadius: 8, fontWeight: "bold", cursor: "pointer", width: "100%" }}>Submit for Moderation</button>
            </div>
            <h3 style={{ marginTop: 28 }}>🛡️ Moderation Queue — {reports.filter(r => r.status === "Pending").length} Pending</h3>
            {reports.map(r => (
                <div key={r.id} style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <b>{r.area} — {r.type}</b>
                        <span style={{ background: r.status === "Pending" ? "#eab308" : r.status === "Approved" ? "#22c55e" : "#ef4444", color: "white", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>{r.status}</span>
                    </div>
                    <p style={{ color: "#475569", margin: "8px 0" }}>{r.details}</p>
                    <p style={{ fontSize: 13, color: "#94a3b8" }}>{r.anonymous ? "Anonymous reporter" : "Named reporter"}</p>
                    {r.status === "Pending" && (
                        <div style={{ display: "flex", gap: 10 }}>
                            <button onClick={() => setStatus(r.id, "Approved")} style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" }}>✓ Approve</button>
                            <button onClick={() => setStatus(r.id, "Rejected")} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" }}>✕ Reject</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}