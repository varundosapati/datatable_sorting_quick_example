import { useMemo, useEffect, useState } from "react";

export default function MultiSelect({
    label,
    options,
    value,
    onChange,
    placeholder = "Slect..."
} : {
    label: string;
    options: string[];
    value: string[],
    onChange: (v: string[]) => void;
    placeholder?: string;
}) {
    const [open, setOpen] =useState(false);
    const [q, setQ] = useState(""); 

    const filterd = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return qq ? options.filter((o) => o.toLowerCase().includes(qq)) :options;
    }, [options, q]);

    const toggle = (opt: string) => {
        const exists = value.includes(opt);
        onChange(exists ? value.filter((v) => v !==opt) : [...value, opt]);
    };

    return (
        <div style={{position: "relative" }}>
            <div style={{ color: "black", fontSize: 12, marginBottom: 6}}>
                {label}
                </div>

                <button
                className="preset-button"
                style={{
            height: "52px",
            padding: "0 12px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid white",
            minWidth: "180px",
            flex: "1 1 220px",
            cursor: "pointer"
        }}
                onClick={() => setOpen((o) => !o)}
                type="button"
                >
                    <span style={{ color: value.length ? "var(--text)" : "black" }}>
                        {value.length ? `${value.length} selected` : placeholder}
                    </span>
                    
                    <span style={{ color: "black", paddingLeft: "140px"}}>{open ? "▲" : "▼"}</span>
                    </button>

                    {open && (
                        <div
                        style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: 0,
                            right: 0,
                            zIndex: 50,
                            background: "#ffffff",
                            borderRadius: 12,
                            boxShadow: "var(--shadow)",
                            overflow: "hidden"
                        }}
                        >
                            <div
                            style={{
                                padding: 10,
                                borderBottom: "1px solid rgba(34,52,87,.6)"
                            }}
                            >
                            <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search..."
                            style={{
                                width: "100%",
                                padding: "10pz 10px",
                                borderRadius: 10,
                                border: "1px solid var(--border)",
                                background: "white",
                                color: "white"
                            }}
                            />
                            </div>

                            <div style={{ maxHeight: 220, overflow: "auto"}}>
                                {filterd.map((opt) => (
                                    <label
                                    key={opt}
                                    style={{
                                        display: "flex",
                                        gap: 10,
                                        alignItems: "center",
                                        padding: "10px 12px",
                                        cursor: "pointer"
                                    }}
                                    >
                                        <input
                                        type="checkbox"
                                        checked={value.includes(opt)}
                                        onChange={() => toggle(opt)}
                                        />
                                        <span>{opt}</span>
                                        </label>
                                ))}
                                </div>

                                <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    padding: 10,
                                    borderTop: "1px solid rgba(246, 248, 252, 0.6)"
                                }}
                            >
                                <button
                                className="preset-button"
                                type="button"
                                onClick={() => onChange([])}
                                style={{ 
                                    flex: 1, border: "2px solid black", width: "100%", textAlign: "left", display: "flex", 
                                    justifyContent: "space-between", gap: 10, borderRadius: 12, background: "#ffffff", padding: "10px 12px" }}
                                >
                                    Clear
                                </button>
                                <button
                                className="btn"
                                type="button"
                                onClick={() => setOpen(false)}
                                style={{ flex: 1, border: "2px solid black"}}
                                >
                                    Done
                                </button>
                                </div>
                                </div>
                                 )}
                                 </div>
    );
}
