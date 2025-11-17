// Employee.jsx
import React, { useState, useEffect } from "react";
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
  const [endDate, setEndDate] = useState('14/11/2025');
  const [startDate, setStartDate] = useState('08/11/2025');

  const [consultaData, setConsultaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from API
  const fetchConsultas = async (startDate, endDate) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = new URL('https://6blopd43v4.execute-api.us-east-1.amazonaws.com/Alpha/Consulta/ListAll');
      url.searchParams.append('start_date', startDate);
      url.searchParams.append('end_date', endDate);

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setConsultaData(data);
      console.log('Consulta data:', data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching consultas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Example: Fetch data on component mount
  useEffect(() => {
    fetchConsultas(startDate, endDate);
  }, [startDate, endDate]);
  
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

        {activeView === "dashboard" && <Dashboard data={consultaData} startDate={startDate} endDate={endDate} />}
        {activeView === "metrics" && <MetricsPanel data={consultaData} />}
        {activeView === "queue" && <QueueManagement data={consultaData} />}
      </Box>
    </Box>
  );
}

export default Employee;
