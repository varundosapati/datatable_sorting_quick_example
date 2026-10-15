import {ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
 export type Column<T> = {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
    width?: number | string;
 };

  export type SortState<T> = { key: keyof T; dir: "asc" | "desc" };
 
  export default function DataTable<T extends Record<string, any>>({
     columns,
     rows,
     dense,
     pageSize,
     getRowStyle,
     onRowClick,
  }: {
     columns: Column<T>[];
     rows: T[];
     dense?: boolean;
     pageSize?: number;
     getRowStyle?: (row: any) => React.CSSProperties;
     onRowClick?: (row: T) => void;
  }) {
     const [sortkey, setSortkey] = useState<keyof T | undefined>("id");
       const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
      
       const [currentPage, setCurrentPage] = useState(1);
 
       useEffect(() => {
           setCurrentPage(1);
         }, [sortkey, sortDir]);
 
       const handleSort = (key: keyof T) => {
     if (sortkey === key) {
       setSortDir(sortDir === "asc" ? "desc" : "asc");
     } else {
       setSortkey(key);
       setSortDir("asc");
     }
   };

   type DataTableProps = {
    columns: any[];
    rows: any[];
    pageSize?: number;
    dense?: boolean;
    getRowStyle?: (row: any) => React.CSSProperties;
    onRowClick?: (row: any) => void;
   }
 
   const sortedRows = sortkey !== undefined
     ? [...rows].sort((a, b) => {
         const aVal = a[sortkey];
         const bVal = b[sortkey];
        let cmp: number;
         if (typeof aVal === "number" && typeof bVal === "number") cmp = aVal - bVal;
         else cmp = String(aVal).localeCompare(String(bVal));
         return sortDir === "asc" ? cmp : -cmp;
       })
     : rows;
 
     const totalRows = sortedRows.length;
       const totalPages = pageSize ? Math.max(1, Math.ceil(totalRows / pageSize)) : 1;
       const pageIndex = Math.min(Math.max(1, currentPage), totalPages);
       const paginatedRows = pageSize
         ? sortedRows.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
         : sortedRows;
       const displayRows = paginatedRows;
 
        return (
                    <div
      style={{
        overflow: "auto",
        background: "#ffffff",
        borderRadius: "8px",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e5e7eb",
      }}
    >
      <table
        style={{
          width: "max-content",
          minWidth: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: dense ? 13 : 14,
          paddingLeft: "2px",
          paddingRight: "2px",
          paddingTop: "1px",
        }}
      >
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                onClick={() => handleSort(c.key as keyof T)}
                title={`Click to sort by ${c.header}`}
                style={{
                  textAlign: "left",
                  padding: dense ? "2px 2px" : "14px 16px",
                  color: "#ffffff",
                  backgroundColor: "#8d9ec7",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  width: c.width,
                  textTransform: "uppercase",
                  fontSize: dense ? 11 : 12,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {c.header}
                  <span
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      gap: 0,
                      lineHeight: 0,
                      marginTop: "-1px",
                    }}
                  >
                    <ArrowUp
                      size={14}
                      color="#374151"
                      style={{
                        opacity:
                          sortkey === (c.key as any) && sortDir === "asc"
                            ? 1
                            : 0.35,
                      }}
                    />
                    <ArrowDown
                      size={14}
                      color="#374151"
                      style={{
                        opacity:
                          sortkey === (c.key as any) && sortDir === "desc"
                            ? 1
                            : 0.35,
                      }}
                    />
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "32px 16px",
                  color: "#6b7280",
                  textAlign: "center",
                  background: "#ffffff",
                }}
              >
                No data available.
              </td>
            </tr>
          ) : (
            displayRows.map((r, i) => {
              const rowStyle = getRowStyle ? getRowStyle(r) : {};
               const isHighlighted = !! rowStyle.backgroundColor;

              return (
              <tr
                key={i}
                style={{
                  ...rowStyle,
                  background: rowStyle.backgroundColor
                  ? rowStyle.backgroundColor
                  : i % 2 === 0 
                  ? "#ffffff" 
                  : "#f9fafb",
                  transition: "background-color 0.2s",
                  cursor: "pointer"
                }}
                onClick={() => onRowClick?.(r)}
                onMouseEnter={(e) => {
                  if (!isHighlighted) {
                  e.currentTarget.style.background = "#f3f4f6";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    rowStyle.backgroundColor ||
                    (i % 2 === 0 ? "#ffffff" : "#f9fafb");
                }}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    style={{
                      padding: dense ? "10px 16px" : "14px 16px",
                      borderBottom:
                        i === displayRows.length - 1
                          ? "none"
                          : "1px solid #e5e7eb",
                      whiteSpace: "nowrap",
                      color: "#111827",
                    }}
                  >
                    {c.render ? c.render(r) : String(r[c.key] ?? "")}
                  </td>
                ))}
              </tr>
              );
  })
          )}
        </tbody>
      </table>
      {pageSize != null && totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderTop: "1px solid #e5e7eb",
            background: "#ffffff",
            fontSize: 14,
            color: "#4b5563",
          }}
        >
          <span>
            Showing {(pageIndex - 1) * pageSize + 1}–{Math.min(pageIndex * pageSize, totalRows)} of {totalRows}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={pageIndex <= 1}
              style={{
                padding: "6px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                background: pageIndex <= 1 ? "#f9fafb" : "#ffffff",
                cursor: pageIndex <= 1 ? "not-allowed" : "pointer",
                color: pageIndex <= 1 ? "#9ca3af" : "#374151",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <span style={{ padding: "0 12px", fontWeight: 500 }}>
              Page {pageIndex} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageIndex >= totalPages}
              style={{
                padding: "6px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                background: pageIndex >= totalPages ? "#f9fafb" : "#ffffff",
                cursor: pageIndex >= totalPages ? "not-allowed" : "pointer",
                color: pageIndex >= totalPages ? "#9ca3af" : "#374151",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
 
              );
 }
