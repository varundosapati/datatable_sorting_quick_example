import { useState } from "react";
import { Box } from "@mui/material";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/SideBar";
export default function APP() {
    const [selectedView, setSelectedView] = useState("quoteErrors");

    return (
        <Box sx={{display: "flex", height: "100vh", overflow: "hidden"}}>

            <Sidebar
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            />

            <Box sx={{ flexGrow: 1, minWidth: 0, height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
                <Dashboard selectedView={selectedView} />
            </Box>
        </Box>
    );
        
}
