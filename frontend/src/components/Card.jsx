import { useState, useRef, useEffect } from "react";

const CATEGORIES = ["Food", "Travel", "Bills", "Health", "Other"];

const Card = ({ onClose, onAddExpense }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [focused, setFocused] = useState(null);
  const notesRef = useRef(null);

  useEffect(() => {
    if (showNotes && notesRef.current) notesRef.current.focus();
  }, [showNotes]);

  const inputBase = (field) => ({
    background: "#1c1c1c",
    border: `1px solid ${focused === field ? "rgba(34,197,94,0.38)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "13px",
    color: "#e2e2e2",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
    width: "100%",
  });

  return (
    <div style={{
      background: "#141414",
      border: "1px solid rgba(255,255,255,0.055)",
      borderRadius: "22px",
      padding: "26px",
      width: "100%",
      maxWidth: "456px",
      position: "relative",
      boxShadow: "0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    }}>

      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: "-14px", right: "-14px",
        width: "34px", height: "34px", borderRadius: "50%",
        background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.11)",
        color: "#777", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: "18px", zIndex: 10, lineHeight: 1, transition: "all 0.15s",
      }}
        onMouseEnter={e => { e.currentTarget.style.color = "#e2e2e2"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "#777"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)"; }}
      >×</button>

      <p style={{ color: "#282828", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px 0" }}>
        New Expense
      </p>

      {/* Title + Date */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            color: focused === "title" ? "#22c55e" : "#333",
            fontSize: "22px", pointerEvents: "none", lineHeight: 1, transition: "color 0.15s",
          }}>·</span>
          <input
            style={{ ...inputBase("title"), padding: "13px 14px 13px 30px", fontSize: "14px" }}
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onFocus={() => setFocused("title")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <input
          type="date"
          style={{ ...inputBase("date"), width: "148px", flexShrink: 0, padding: "12px 10px", fontSize: "12.5px", colorScheme: "dark" }}
          value={date}
          onChange={e => setDate(e.target.value)}
          onFocus={() => setFocused("date")}
          onBlur={() => setFocused(null)}
        />
      </div>

      {/* Amount + Note toggle */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{
            position: "absolute", left: "17px", top: "50%", transform: "translateY(-50%)",
            color: focused === "amount" ? "#22c55e" : "#333",
            fontSize: "24px", fontWeight: 300, pointerEvents: "none", lineHeight: 1, transition: "color 0.15s",
          }}>$</span>
          <input
            type="number"
            style={{ ...inputBase("amount"), padding: "20px 16px 20px 44px", fontSize: "34px", fontWeight: 300, letterSpacing: "-1px" }}
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            onFocus={() => setFocused("amount")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <button
          onClick={() => setShowNotes(v => !v)}
          style={{
            width: "76px", flexShrink: 0,
            background: showNotes ? "rgba(34,197,94,0.1)" : "#1c1c1c",
            border: `1px solid ${showNotes ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: "13px",
            color: showNotes ? "#22c55e" : "#555",
            fontSize: "28px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", padding: 0,
          }}
        >
          <span style={{ display: "inline-block", transform: showNotes ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.22s ease" }}>+</span>
        </button>
      </div>

      {/* Notes */}
      {showNotes && (
        <div style={{ marginBottom: "10px" }}>
          <textarea
            ref={notesRef}
            style={{
              background: "#1c1c1c", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "13px",
              padding: "13px 14px", color: "#e2e2e2", fontSize: "13px", outline: "none",
              width: "100%", resize: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: "1.65", minHeight: "80px",
            }}
            placeholder="Add a note..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
          />
        </div>
      )}

      <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", margin: "14px 0" }} />

      {/* Category */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        <span style={{ color: "#333", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Category
        </span>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c === category ? null : c)} style={{
            background: category === c ? "rgba(34,197,94,0.1)" : "transparent",
            border: `1px solid ${category === c ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "999px", padding: "5px 14px",
            color: category === c ? "#22c55e" : "#666",
            fontSize: "12px", fontWeight: category === c ? 500 : 400,
            cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit",
          }}>{c}</button>
        ))}
      </div>

      {/* Submit */}
      <button onClick={() => {
        onAddExpense({ title, amount, date, notes, category, });
        onClose();
      }}
        style={{
          width: "100%", background: "#22c55e", border: "none", borderRadius: "13px",
          padding: "14px", color: "#fff", fontSize: "14px", fontWeight: 600,
          cursor: "pointer", letterSpacing: "0.01em", fontFamily: "inherit", transition: "opacity 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        Add Expense
      </button>
    </div>
  );
};

export default Card;