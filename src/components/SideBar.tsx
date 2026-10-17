import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import logo from '../pages/FCB.jpeg';


const drawerWidth =280;

const menuItems = [
    { key: "quoteErrors", label: "Quote Request/ Booking Request Error"},
    { key: "currencyPair", label: "Quote Request by Currency Pair"},
    { key: "quotetable", label: "Quote Request Table"},
    { key: "tradeBlotter", label: "Booked Trade Blotter"},
    { key: "svbUpload", label: "SVB Go File Upload"},
    { key: "errordetails", label: "Error Code trade Details"},
    { key: "revenue", label: "Revenue By Channel"},
];

type SidebarProps = {
    selectedView: string;
    setSelectedView: (value: string) => void;
};
export default function Sidebar({selectedView, setSelectedView}: SidebarProps) {
    const [openQuote, setOpenQuote] = useState(true);

    return (
        <Drawer
        variant='permanent'
        anchor="left"
        
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'content-box',
                                   
                  
                }
            }}
            >
                <Toolbar disableGutters sx={{ paddingLeft: 0 }}>
                    <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 64,
                        borderBottom: "1px solid #e5e7eb",
                        

                    }}
                    >
        <Box
          component="img"
          sx={{ height: 60, objectFit: "contain" }}
          alt="Logo"
          src={logo}
        /></Box></Toolbar>
                <List>
                    <ListItemButton onClick={() => setOpenQuote(!openQuote)}>
                        <ListItemText
                        primary="Quote Execution"
                        primaryTypographyProps={{fontWeight: 600}}
                        />
                        {openQuote ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={openQuote} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {menuItems.map((item) => (
                                <ListItemButton
                                key={item.key}
                                sx={{
                                    pl: 4,
                                    backgroundColor: 
                                    selectedView === item.key ? "#e3f2fd" : "transparent"
                                }}
                                onClick={() => setSelectedView(item.key)}
                                >
                                 <ListItemText primary={item.label} />   
                                </ListItemButton>
                            ))}
                            </List>
                        </Collapse>
                    
                </List>
            </Drawer>
            );
        }

        
        
            
