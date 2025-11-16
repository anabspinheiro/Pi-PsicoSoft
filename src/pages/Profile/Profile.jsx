import { useState } from 'react'
import {
  Box,
  CssBaseline,
  Toolbar
} from '@mui/material';

import ClientProfile from './components/ClientProfile'
import PersonalInfo from './components/PersonalInfo'
import AppointmentHistory from './components/AppointmentHistory'
import Navbar from '../../components/navbar';

function Profile() {
  // Mantido igual ao seu código (sem renomear)
  const [activeTab, setActiveView] = useState("consulta");

  const handleTabChange = (event, newValue) => {
    setActiveView(newValue);
  };

  // dados de exemplo para o ClientProfile
  const sampleAppointment = {
    date: '28/10/2025',
    time: '14:30',
    professional: 'Dra. Maria Silva'
  };

  // 🔹 Estilo único para todas as caixas de conteúdo
  const commonBoxSx = {
    // Tamanho responsivo (100% no mobile, largura confortável no desktop)
    width: { xs: '100%', sm: '640px', md: '880px' },
    minHeight: { xs: 280, sm: 320 }, // altura mínima
    // Aparência
   
    borderRadius: 2,
    
    // Espaçamento interno
    p: { xs: 2, sm: 3 },
    // Centralizar a caixa
    mx: 'auto',
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar fixa com offset do conteúdo, igual ao Employee.jsx */}
      <Navbar
        navButton={[
          { label: "Proxima Consulta", onClick: () => setActiveView("consulta") },
          { label: "Informações Pessoais", onClick: () => setActiveView("info") },
          { label: "Historico", onClick: () => setActiveView("historico") }
        ]}
      />

      {/* Área principal com mesmo padrão visual do Employee.jsx */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
        }}
      >
        {/* Offset da AppBar fixa */}
        <Toolbar />

        {/* Renderizamos apenas o conteúdo ativo, mas todos usam o mesmo tamanho */}
        {activeTab === "consulta" && (
          <Box sx={commonBoxSx}>
            <ClientProfile appointment={sampleAppointment} />
          </Box>
        )}

        {activeTab === "historico" && (
          <Box sx={commonBoxSx}>
            <AppointmentHistory />
          </Box>
        )}

        {activeTab === "info" && (
          <Box sx={commonBoxSx}>
            <PersonalInfo />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Profile;