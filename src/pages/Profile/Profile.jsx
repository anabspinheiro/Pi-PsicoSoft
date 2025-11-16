import { useState } from 'react'
import {
    Container,
    Grid,
    Tabs,
    Tab,
    Box
} from '@mui/material';
import ClientProfile from './components/ClientProfile'
import PersonalInfo from './components/PersonalInfo'
import AppointmentHistory from './components/AppointmentHistory'
import Navbar from '../../components/navbar'; 




function Profile() {
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

    return (
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            <Box sx={{ width: '100%' }}>
                    <Navbar navButton={
        [
            { label: "Proxima Consulta", onClick: () => setActiveView("consulta") },
            { label: "Informações Pessoais", onClick: () => setActiveView("info") },
            { label: "Historico", onClick: () => setActiveView("historico") }
        ]
      }/>
                
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                </Box>
                
                <Box sx={{ mt: 3 }}>
                    {activeTab === "consulta" && <ClientProfile appointment={sampleAppointment} />}
                    {activeTab === "info" && <PersonalInfo />}
                    {activeTab === "historico" && <AppointmentHistory />}
                </Box>
            </Box>
        </Container>
    );
}

export default Profile;