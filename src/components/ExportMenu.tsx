import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF  from "jspdf";

const menuItemStyle: React.CSSProperties = {
    padding: "10px 12px",
    color: "#070707",
    cursor: "pointer",
    fontSize: "14px"
};

const ExportMenu: React.FC = () => {
    const [open, setOpen] =useState<boolean>(false);

    const handleExportPDF = async (): Promise<void> => {
        const element =document.getElementById("dashboard-content");

        if(!element) {
            alert("Dashboard content not found");
            return;
        }

        try {
            const canvas =  await html2canvas(element, {
                scale: 2,
                useCORS: true
            });

            const imgData =canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            pdf.save(`realtime_dashboard_-_errors__execution_-_prod-_${Date.now()}.pdf`);
        }catch (error) {
            console.error("pdf extraction failed:", error);
        }       
    };
    return(
        <div style={{ position: "relative", display: "inline-block"}}>
            <button
            onClick={() => setOpen((prev) => !prev)}
            style={{
                background: "#717477",
                color: "white",
                padding: "8px 14px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer"
            }}
            >
                Export ▼
            </button>

            {open && (
                <div
                style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "5px",
                    background: "#1f2s33",
                    border: "1px solid #444",
                    borderRadius: "4px",
                    width: "160px",
                    zIndex: 1000
                }}
                >
                    <div
                    style={menuItemStyle}
                    onClick={() => {
                        handleExportPDF();
                        setOpen(false);
                    }}
                    >
                        Export PDF
                    </div>
                    <div
                    style={menuItemStyle}
                    onClick={() => {
                        window.print();
                        setOpen(false);
                    }}
                    >
                        Print
                    </div>
                    </div>
            )}
        </div>
    );
};

export default ExportMenu;
