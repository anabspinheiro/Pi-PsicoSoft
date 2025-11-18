// Navbar.jsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Typography, Button, Chip, Avatar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const APP_NAME = import.meta.env.VITE_APP_NAME || "PsicoSoft MGF";
const API_URL = import.meta.env.VITE_API_URL;

function Navbar({ drawerWidth = 0, navButton = [ { label: "NPS - Relatório", onClick: () => {} } ] }) {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);

  // Navega para páginas
  const goToHomePage = () => navigate('/');         // <<-- Home
  const goToFilas = () => navigate('/Employee');

  // Âncoras (funciona quando já estamos na Home)
  const goToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBackToLogin = () => {
    localStorage.clear();
    sessionStorage.clear();
    setMe(null);
    navigate("/");
  };

  useEffect(() => {
    const userDataStr = localStorage.getItem("userData");
    console.log("userDataStr:", userDataStr);
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        setMe(userData);
      } catch (error) {
        console.error("Failed to parse userData from localStorage", error);
      }
    }
  }, []);

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        ml: { md: `${drawerWidth}px` },
        width: { md: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo + nome → leva para Home */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={goToHomePage}                        // <<-- aqui
        >
          <DashboardIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap>
            {APP_NAME}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 1, display: { xs: "none", md: "block" } }}
          >
            — módulo de gerenciamento de filas
          </Typography>
        </Box>

        {/* Menu central */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            gap: 1,
            justifyContent: "center",
          }}
        >
          {
            navButton.map((btn, idx) => (
              <Button key={idx} onClick={btn.onClick}>
                {btn.label}
              </Button>
            ))
          }
        </Box>

        {/* Usuário / Sair */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {me && (
            <>
              <Chip
                avatar={<Avatar src={me.picture} alt={me.name} />}
                label={me.name}
                title={me.email}
                sx={{ maxWidth: 160 }}
              />
              <Button variant="outlined" onClick={handleBackToLogin}>
                Sair
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;