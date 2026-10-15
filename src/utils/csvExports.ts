/** Escape a single CSV field per RFC 4180 */
function escapeCsvCell(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function rowsToCsv<T extends Record<string, unknown>>(
  columnDefs: { key: string; header: string }[],
  rows: T[]
): string {
  const headerLine = columnDefs.map((c) => escapeCsvCell(c.header)).join(",");
  const dataLines = rows.map((row) =>
    columnDefs
      .map((c) => {
        const v = row[c.key];
        if (v === null || v === undefined) return escapeCsvCell("");
        return escapeCsvCell(String(v));
      })
      .join(",")
  );
  return [headerLine, ...dataLines].join("\r\n");
}

/** UTF-8 BOM helps Excel open UTF-8 CSV correctly */
export function downloadCsv(filename: string, csvContent: string): void {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.toLowerCase().endsWith(".csv")
    ? filename
    : `${filename}.csv`;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
