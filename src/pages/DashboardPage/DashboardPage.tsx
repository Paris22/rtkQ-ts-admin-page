import { Box, Typography } from "@mui/material";
import React from "react";
import { alts } from "../../constants/alts";

export const DashboardPage = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img width={300} height={300} alt={alts.LOGO} loading="lazy" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="h4" gutterBottom>
          Select the section you are interested in.
        </Typography>
      </Box>
    </Box>
  );
};
