type Alert = {
    id: number;
    title: string;
    area: string;
    category: string;
    date: string;
    expires: string;
    source: string;
    message: string;
    severity: "Info" | "Caution" | "Urgent";
};

const ALERTS: Alert[] = [
    {
        id: 1,
        title: "Increased theft reports near Centurion Station",
        area: "Centurion",
        category: "Theft",
        date: "19 Nov 2026",
        expires: "26 Nov 2026",
        source: "GSN Moderation Team",
        message: "Multiple moderated reports of phone snatching around Centurion Station between 17:00 - 19:00. Avoid walking alone, keep valuables out of sight.",
        severity: "Caution",
    },
    {
        id: 2,
        title: "Road hazard on N1 South near Midrand",
        area: "Midrand",
        category: "Road Hazard",
        date: "19 Nov 2026",
        expires: "21 Nov 2026",
        source: "Community Report - Approved",
        message: "Pothole and debris reported on left lane. Drive with caution and reduce speed.",
        severity: "Info",
    },
    {
        id: 3,
        title: "Verified warning: Hijacking reports in Pretoria Central",
        area: "Pretoria Central",
        category: "Hijacking",
        date: "18 Nov 2026",
        expires: "25 Nov 2026",
        source: "GSN Moderation Team",
        message: "Verified warning based on multiple approved reports. Avoid stopping in poorly lit areas at night. Keep doors locked and windows up.",
        severity: "Urgent",
    },
];

const COLORS: Record<string, string> = {
    Info: "#3b82f6",
    Caution: "#eab308",
    Urgent: "#ef4444",
};

export default function Alerts() {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "0 auto", padding: 20 }}>
            <h2>🔔 Safety Alerts & Notices</h2>
            <p style={{ color: "#475569" }}>
                Only approved alerts appear here. Alerts are community submissions or moderated reports — not official crime statistics.
            </p>

            {ALERTS.map((a) => (
                <div key={a.id} style={{ background: "white", padding: 18, borderRadius: 12, border: "1px solid #e2e8f0", marginBottom: 14, borderLeft: `6px solid ${COLORS[a.severity]}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <b style={{ fontSize: 17 }}>{a.title}</b>
                        <span style={{ background: COLORS[a.severity], color: "white", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>{a.severity}</span>
                    </div>
                    <p style={{ color: "#475569", margin: "10px 0" }}>{a.message}</p>
                    <div style={{ fontSize: 13, color: "#94a3b8", display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <span>📍 {a.area}</span>
                        <span>🏷️ {a.category}</span>
                        <span>📅 Published: {a.date}</span>
                        <span>⏳ Expires: {a.expires}</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>Source: {a.source} • Status: Approved for publication</p>
                </div>
            ))}

            <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, marginTop: 20 }}>
                Phase 1 • Alerts are reviewed by moderators before publication.
            </p>
        </div>
    );
}