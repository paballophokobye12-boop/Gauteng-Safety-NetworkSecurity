import { useState } from "react";
import Report from "./Report";
import Alerts from "./Alerts";
import Emergency from "./Emergency";
import Admin from "./Admin";
import Auth from "./Auth";

type Area = {
    name: string;
    level: "Green" | "Yellow" | "Orange" | "Red";
    reports: number;
    summary: string;
};

const AREAS: Area[] = [
    { name: "Centurion", level: "Yellow", reports: 12, summary: "Take caution — reports of theft near station, 17:00-19:00." },
    { name: "Pretoria Central", level: "Red", reports: 28, summary: "Verified warning — multiple hijacking reports. Avoid poorly lit areas at night." },
    { name: "Johannesburg CBD", level: "Orange", reports: 19, summary: "Multiple recent reports. Safety concern — stay in busy areas." },
    { name: "Sandton", level: "Yellow", reports: 8, summary: "Take caution — isolated theft reports." },
    { name: "Soweto", level: "Green", reports: 1, summary: "No incident in past month/week in this area." },
    { name: "Midrand", level: "Green", reports: 2, summary: "No major incidents — road hazard reported on N1." },
];

const COLORS: Record<string, string> = {
    Green: "#22c55e",
    Yellow: "#eab308",
    Orange: "#f97316",
    Red: "#ef4444",
};

function Home() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Area | null>(AREAS[0]);
    const filtered = AREAS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 1100, margin: "0 auto", padding: 20 }}>
            <h1 style={{ textAlign: "center" }}>🛡️ Gauteng Safety Network</h1>
            <p style={{ textAlign: "center", color: "#475569", maxWidth: 700, margin: "0 auto 20px" }}>
                Community safety information for Gauteng. Moderated reports, not official crime statistics.
                GSN does NOT replace SAPS — in an emergency call <b>10111</b> or <b>112</b>.
            </p>

            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search area — e.g. Centurion, Sandton, Soweto..." style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #cbd5e1", marginBottom: 20 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {filtered.map(a => (
                    <div key={a.name} onClick={() => setSelected(a)} style={{ background: "white", padding: 16, borderRadius: 12, border: selected?.name === a.name ? "2px solid #0f172a" : "1px solid #e2e8f0", cursor: "pointer" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><b>{a.name}</b><span style={{ background: COLORS[a.level], color: "white", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>{a.level}</span></div>
                        <p style={{ color: "#475569", fontSize: 14, margin: "10px 0 0" }}>{a.reports} moderated reports</p>
                    </div>
                ))}
            </div>

            {selected && (
                <div style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0", marginTop: 20, borderLeft: `6px solid ${COLORS[selected.level]}` }}>
                    <h2 style={{ margin: "0 0 8px" }}>{selected.name} — {selected.level} Zone</h2>
                    <p style={{ color: "#475569" }}>{selected.summary}</p>
                    <p style={{ fontSize: 13, color: "#94a3b8" }}>Green: No incident in past month/week • Yellow: Take caution • Orange: Multiple reports • Red: Verified warning</p>
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
                <div style={{ background: "#fef3c7", padding: 16, borderRadius: 12 }}><b>🟡 How it works</b><p style={{ fontSize: 14, color: "#475569" }}>Travelling Montana → Centurion? Compare areas and pick the safest route, not just fastest.</p></div>
                <div style={{ background: "#dcfce7", padding: 16, borderRadius: 12 }}><b>✅ Moderated</b><p style={{ fontSize: 14, color: "#475569" }}>Only approved reports appear on the map. Fake reports are rejected.</p></div>
                <div style={{ background: "#fee2e2", padding: 16, borderRadius: 12 }}><b>🚨 Emergency?</b><p style={{ fontSize: 14, color: "#475569" }}>Call SAPS 10111 directly. GSN is not dispatch.</p></div>
            </div>
        </div>
    );
}

export default function App() {
    const [tab, setTab] = useState("Home");
    const tabs = ["Home", "Report", "Alerts", "Emergency", "Admin", "Account"];

    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
            <nav style={{ background: "#0f172a", color: "white", padding: "12px 20px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
                <b style={{ marginRight: 12 }}>🛡️ GSN</b>
                {tabs.map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? "white" : "transparent", color: tab === t ? "#0f172a" : "white", border: "1px solid white", padding: "8px 14px", borderRadius: 20, cursor: "pointer", fontWeight: "bold" }}>{t}</button>
                ))}
            </nav>

            {tab === "Home" && <Home />}
            {tab === "Report" && <Report />}
            {tab === "Alerts" && <Alerts />}
            {tab === "Emergency" && <Emergency />}
            {tab === "Admin" && <Admin />}
            {tab === "Account" && <Auth />}

            <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, padding: 20 }}>
                Gauteng Safety Network • Phase 1 Prototype • Demonstration data — not official crime statistics • GSN complements, does not replace, SAPS & emergency services.
            </p>
        </div>
    );
}