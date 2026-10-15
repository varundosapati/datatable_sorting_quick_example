const PRESETS: { group: string; items: {key: string; label: string }[] }[] = [
    {
        group: "Relative",
        items: [
            {key: "today", label: "Today" },
            {key: "week_to_date", label: "Week To Date" },
            {key: "business_week_to_date", label: "Business Week To Date" },
            {key: "Previous_Year", label: "Previous Year" }
        ]
    },
    {
        group: "Last X",
        items: [
            {key: "last_15_mins", label: "Last 15 mins" },
            {key: "last_60_mins", label: "Last 60 mins" },
            {key: "last_4_hours", label: "Last 4 hours" },
            {key: "last_24_hours", label: "Last 24 hours" },
        ]
    },
    {
        group: "Other",
        items: [{key: "custom", label: "Date Range" }]
    }
];
export default function TimeFramePicker({
    value,
    onChange,
}:{
    value: string;
    onChange: (v: string) => void;

}) {
    return (
    <div > 
        
        <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
            height: "52px",
            padding: "0 12px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minWidth: "180px",
            cursor: "pointer"
        }}
       
        >
            {PRESETS.map((g) => (
                <optgroup key={g.group} label={g.group}>
                    {g.items.map((it) => (
                        <option key={it.key} value={it.key}>
                            {it.label}
                        </option>
                    ))}
                </optgroup>
            ))}
        </select>
        
    </div>
    );
}
