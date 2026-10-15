import React, { useState } from 'react';
import {  Typography, IconButton, Collapse, Box } from '@mui/material';
import { Padding } from '@mui/icons-material';
import { Info } from 'lucide-react';

export type BannerProps = {
  /** Main heading shown in the banner */
  title: string;
  /** Extra detail shown when the info icon is opened; defaults to built-in help if omitted */
  information?: React.ReactNode;
  /** Custom action element to display on the right */
  action?: React.ReactNode;
  };

export default function Banner({ title, information, action}:BannerProps) {
    const bannerStyle = {
        color: 'white',
        backgroundColor: '#8d9ec7',
        px: 0.5,
        py: 0.1,
        // ml: 1,
        fontWeight: 'bold',
    };

const [infoOpen, setInfoOpen] = useState(false);

    return (
        <>
         <Box
       
        sx={{
          display: "flex",
          flexDirection: "column",
          background: (theme) =>
             `#8d9ec7`,
          px: { xs: 1, sm: 2 },
          // py: { xs: 1.5, sm: 2 },
        }}
      >

      
        <Box sx= {{
          display:"flex",
          alignItems:"flex-start",
          justifyContent:"space-between",
          gap:1,
        }}>
        <Box sx= {{
          flex: 1,
          minWidth:0,
          display:"flex",
          alignItems:"center",
          gap:2,
        flexWrap:"wrap",
              }}>
            <Typography
                variant="body1"
                sx={bannerStyle}
            >
                {title}
            
                <IconButton
          type="button"
          onClick={() => setInfoOpen((v) => !v)}
          aria-label={infoOpen ? "Hide information" : "Show information"}
          aria-expanded={infoOpen}
          sx={{
            color: "inherit",
            flexShrink: 0,
            // mt: -0.5,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
          }}
        >
          <Info size={24} strokeWidth={2} aria-hidden />
        </IconButton>
         </Typography>

        </Box>
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexShrink : 0,
          py: { xs: 1.5, sm: 2 },
        }}>
        {action}
        </Box>

        </Box>
          </Box>
           
        <Collapse in={infoOpen} timeout="auto">
        <Box
          sx={{
            // mt: 0.5,
            // pt: 0.5,
            px: 1.5,
            py: 1,
            borderTop: "1px solid rgba(255,255,255,0.28)",
            fontSize: "14px",
          }}
        >
          {information}
        </Box>
      </Collapse>
        </>
    )
}
