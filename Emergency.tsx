export default function Emergency() {
    const contacts = [
        { name: "SAPS Emergency", number: "10111", desc: "South African Police Service — for crimes in progress", urgent: true },
        { name: "Ambulance / Medical Emergency", number: "10177", desc: "Ambulance and medical emergencies", urgent: true },
        { name: "Cellphone Emergency (All Networks)", number: "112", desc: "Works from any cellphone, even without airtime", urgent: true },
        { name: "Centurion SAPS", number: "012 671 6600", desc: "Centurion Police Station — non-emergency reports", urgent: false },
        { name: "Pretoria Central SAPS", number: "012 353 4100", desc: "Pretoria Central Police Station", urgent: false },
        { name: "Sandton SAPS", number: "011 722 4200", desc: "Sandton Police Station", urgent: false },
        { name: "Crime Stop", number: "08600 10111", desc: "Report crime anonymously", urgent: false },
        { name: "GBV Command Centre", number: "0800 428 428", desc: "Gender-Based Violence support — 24/7, free", urgent: false },
    ];

    const tips = [
        "Share your live location with a trusted contact when travelling at night.",
        "Keep doors locked, windows up, and valuables out of sight in traffic.",
        "Avoid walking alone in poorly lit areas — use well-lit, busy routes.",
        "If you feel followed, drive to the nearest police station or petrol station, do not drive home.",
        "Save 10111 and 112 in your phone before you need them.",
        "Do not confront suspects. Your safety is more important than belongings.",
    ];

    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "0 auto", padding: 20 }}>
            <div style={{ background: "#ef4444", color: "white", padding: 18, borderRadius: 12, textAlign: "center" }}>
                <h2 style={{ margin: "0 0 8px" }}>🚨 In an emergency, call SAPS directly</h2>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>
                    Gauteng Safety Network is <b>NOT</b> an emergency dispatch service. We do not replace SAPS, ambulance, or fire services.
                    If someone is in danger right now, call <b>10111</b> or <b>112</b> immediately.
                </p>
            </div>

            <h2 style={{ marginTop: 28 }}>📞 Emergency Contacts</h2>
            <p style={{ color: "#475569" }}>Contact details should be checked against authoritative sources before publication and reviewed regularly.</p>

            {contacts.map((c) => (
                <div key={c.name} style={{ background: "white", padding: 16, borderRadius: 12, border: c.urgent ? "2px solid #ef4444" : "1px solid #e2e8f0", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <b style={{ fontSize: 16 }}>{c.name}</b>
                        <p style={{ color: "#475569", margin: "4px 0 0", fontSize: 14 }}>{c.desc}</p>
                    </div>
                    <a href={`tel:${c.number.replace(/ /g, "")}`} style={{ background: c.urgent ? "#ef4444" : "#0f172a", color: "white", padding: "10px 16px", borderRadius: 8, textDecoration: "none", fontWeight: "bold", whiteSpace: "nowrap", marginLeft: 12 }}>
                        {c.number}
                    </a>
                </div>
            ))}

            <h2 style={{ marginTop: 28 }}>🛡️ Safety Guidance</h2>
            {tips.map((t, i) => (
                <div key={i} style={{ background: "white", padding: 14, borderRadius: 10, border: "1px solid #e2e8f0", marginBottom: 10 }}>
                    ✅ {t}
                </div>
            ))}

            <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, marginTop: 20 }}>
                Phase 1 • GSN complements, but does not replace, official emergency services.
            </p>
        </div>
    );
}