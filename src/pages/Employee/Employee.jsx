// Employee.jsx
import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MetricsIcon from "@mui/icons-material/Assessment";
import QueueIcon from "@mui/icons-material/Queue";

import MetricsPanel from "./components/MetricsPanel";
import QueueManagement from "./components/QueueManagement";

// Navbar superior
import Navbar from '../../components/navbar'; 
import Dashboard from "./components/Dashboard";

const drawerWidth = 240;

function Employee() {
  const [activeView, setActiveView] = useState("dashboard");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
    { text: "Métricas", icon: <MetricsIcon />, view: "metrics" },
    { text: "Gestão de Filas", icon: <QueueIcon />, view: "queue" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar fixa com offset do Drawer */}
      <Navbar drawerWidth={drawerWidth} />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "background.paper",
            color: "text.primary",
          },
        }}
      >
        {/* Espaço para não ficar atrás da AppBar */}
        <Toolbar />

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.view} disablePadding>
              <ListItemButton
                selected={activeView === item.view}
                onClick={() => setActiveView(item.view)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255, 184, 132, 0.25)",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "rgba(255, 184, 132, 0.35)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 184, 132, 0.15)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "text.primary" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Área de conteúdo */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {activeView === "dashboard" && <Dashboard />}
        {activeView === "metrics" && <MetricsPanel />}
        {activeView === "queue" && <QueueManagement />}
      </Box>
    </Box>
  );
}

export default Employee;
