import { useState } from "react";

export default function Auth() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    const myReports = [
        { id: "GSN-1023", area: "Centurion", type: "Theft", status: "Approved", date: "18 Nov 2026" },
        { id: "GSN-1041", area: "Midrand", type: "Road Hazard", status: "Pending", date: "19 Nov 2026" },
        { id: "GSN-0998", area: "Sandton", type: "Suspicious Activity", status: "Rejected", date: "15 Nov 2026" },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return alert("Please enter email and password");
        if (mode === "register" && !name) return alert("Please enter your name");
        setUser({ name: name || email.split("@")[0], email });
    };

    if (user) {
        return (
            <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "0 auto", padding: 20 }}>
                <h2>👋 Welcome back, {user.name}</h2>
                <p style={{ color: "#475569" }}>{user.email} • Resident Account • Centurion, Gauteng</p>

                <div style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0" }}>
                    <h3 style={{ marginTop: 0 }}>📋 My Submissions</h3>
                    <p style={{ color: "#475569", fontSize: 14 }}>Track the status of your reports. Only approved reports appear on the public map.</p>
                    {myReports.map(r => (
                        <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                            <div>
                                <b>{r.id} — {r.area} — {r.type}</b>
                                <div style={{ fontSize: 13, color: "#94a3b8" }}>{r.date}</div>
                            </div>
                            <span style={{ background: r.status === "Approved" ? "#22c55e" : r.status === "Pending" ? "#eab308" : "#ef4444", color: "white", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>{r.status}</span>
                        </div>
                    ))}
                </div>

                <div style={{ background: "#f8fafc", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", marginTop: 16 }}>
                    <b>🔒 Privacy & Account</b>
                    <p style={{ color: "#475569", fontSize: 14, margin: "8px 0 0" }}>
                        We collect only what is needed to review your report. You can request help with your account or personal information by contacting the GSN team. Anonymous reporting is always available.
                    </p>
                </div>

                <button onClick={() => setUser(null)} style={{ marginTop: 16, background: "#0f172a", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>Log Out</button>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 480, margin: "0 auto", padding: 20 }}>
            <h2 style={{ textAlign: "center" }}>{mode === "login" ? "🔐 Log In" : "📝 Create Resident Account"}</h2>
            <p style={{ textAlign: "center", color: "#475569" }}>Phase 1 Demo — accounts are stored locally for prototype. Supabase Auth comes in Phase 2.</p>

            <form onSubmit={submit} style={{ background: "white", padding: 24, borderRadius: 12, border: "1px solid #e2e8f0" }}>
                {mode === "register" && (
                    <>
                        <label><b>Full Name</b></label><br />
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Paballo" style={{ width: "100%", padding: 12, margin: "8px 0 16px", borderRadius: 8, border: "1px solid #cbd5e1" }} />
                    </>
                )}
                <label><b>Email</b></label><br />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.co.za" style={{ width: "100%", padding: 12, margin: "8px 0 16px", borderRadius: 8, border: "1px solid #cbd5e1" }} />
                <label><b>Password</b></label><br />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: 12, margin: "8px 0 16px", borderRadius: 8, border: "1px solid #cbd5e1" }} />

                <button style={{ width: "100%", background: "#0f172a", color: "white", border: "none", padding: 14, borderRadius: 10, fontWeight: "bold", cursor: "pointer" }}>
                    {mode === "login" ? "Log In" : "Create Account"}
                </button>

                <p style={{ textAlign: "center", marginTop: 16, fontSize: 14 }}>
                    {mode === "login" ? "No account? " : "Already have an account? "}
                    <span onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ color: "#2563eb", cursor: "pointer", fontWeight: "bold" }}>
                        {mode === "login" ? "Register" : "Log In"}
                    </span>
                </p>
                <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8" }}>Demo: use any email + password to log in</p>
            </form>
        </div>
    );
}