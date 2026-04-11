import { useState } from "react";

export default function Step4Preview() {
  const [nasivkyPlacement, setNasivkyPlacement] = useState(null);
  const [selectedNasivka, setSelectedNasivka] = useState(null);

  const NASIVKY = ["H1","H2","H3","H4","H5","H6","H7","H8"];

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: 16, fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#C5A44E", fontWeight: 700, letterSpacing: 3 }}>LUXURY CAR DESIGN</div>
        <h2 style={{ margin: "4px 0", fontSize: 18, color: "#333", fontWeight: 300 }}>Krok 4 — Náhľad</h2>
      </div>

      <div style={{
        background: "linear-gradient(135deg, #C5A44E, #A8893A)",
        color: "#fff", padding: "14px 20px", borderRadius: "10px 10px 0 0",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "rgba(255,255,255,0.2)", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 16,
        }}>4</div>
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" }}>
          Nášivky / Výšivky
        </span>
      </div>

      <div style={{ background: "#fff", border: "2px solid #e0d5b8", borderTop: "none", borderRadius: "0 0 10px 10px", padding: 20 }}>

        <div style={{ marginBottom: 16, borderRadius: 10, overflow: "hidden", border: "2px solid #C5A44E", background: "#1a1a1a" }}>
          <div style={{
            width: "100%", aspectRatio: "16/10",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", padding: 20,
          }}>
            <div style={{ textAlign: "center", color: "#aaa" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🚛</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#C5A44E", marginBottom: 4 }}>
                Ukážka nášiviek v kabíne kamiónu
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>
                (obrázok 91ThIMeaukL.jpg sa zobrazí v reálnom konfigurátore)
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: 8, right: 8,
              background: "rgba(197,164,78,0.9)", color: "#fff",
              padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            }}>VZOROVÁ FOTKA</div>
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 10 }}>Kam chcete nášivku?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {[
            { id: "nechcem", label: "Nechcem nášivku / výšivku" },
            { id: "boky", label: "Šofér + spolujazdec (bočné koberce)" },
            { id: "boky+stred", label: "Šofér + spolujazdec + stredový koberec" },
          ].map((opt) => {
            const isActive = nasivkyPlacement === opt.id;
            return (
              <div key={opt.id}
                onClick={() => {
                  setNasivkyPlacement(opt.id);
                  if (opt.id === "nechcem") setSelectedNasivka(null);
                }}
                style={{
                  padding: "12px 16px", cursor: "pointer", borderRadius: 8,
                  border: isActive ? "3px solid #C5A44E" : "2px solid #ddd",
                  background: isActive ? (opt.id === "nechcem" ? "#fff5f5" : "#fdf8ec") : "#fff",
                  fontSize: 13, fontWeight: 600, color: "#333",
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                {opt.id === "nechcem" && <span style={{ color: "#c00", fontSize: 16 }}>✗</span>}
                {opt.label}
                {isActive && <span style={{ marginLeft: "auto", color: "#C5A44E" }}>✓</span>}
              </div>
            );
          })}
        </div>

        {nasivkyPlacement === "nechcem" && (
          <div style={{
            padding: 16, background: "#f0faf3", borderRadius: 10,
            border: "2px solid #4CAF50", textAlign: "center",
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>✓</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#388E3C" }}>Pokračujte na ďalší krok</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Koberce budú bez nášiviek a výšiviek</div>
          </div>
        )}

        {nasivkyPlacement && nasivkyPlacement !== "nechcem" && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Vzor nášivky:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {NASIVKY.map((code) => {
                const isActive = selectedNasivka === code;
                return (
                  <div key={code}
                    onClick={() => setSelectedNasivka(code)}
                    style={{
                      width: 72, height: 72, borderRadius: 8,
                      border: isActive ? "3px solid #C5A44E" : "2px solid #ddd",
                      background: isActive ? "#fdf8ec" : "#f5f0e0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", fontSize: 13, fontWeight: 700,
                    }}
                  >{code}</div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
