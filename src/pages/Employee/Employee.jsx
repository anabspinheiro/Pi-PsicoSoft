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


function Employee() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar fixa com offset do Drawer */}
      <Navbar navButton={
        [
          { label: "Dashboard", onClick: () => setActiveView("dashboard") },
          { label: "Métricas", onClick: () => setActiveView("metrics") },
          { label: "Gestão de Filas", onClick: () => setActiveView("queue") }
        ]
      }/>

      {/* Área de conteúdo */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
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
