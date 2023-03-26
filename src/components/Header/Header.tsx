import React from "react";
import { AppBar, Stack, Toolbar } from "@mui/material";
import { drawerWidth } from "./constants";

export const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Stack spacing={2} sx={{ width: 300 }} />
      </Toolbar>
    </AppBar>
  );
};
