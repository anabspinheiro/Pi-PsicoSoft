import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Container,
  Avatar,
  useTheme,
  Divider as MuiDivider,
} from "@mui/material";
import {
  PeopleAlt as PeopleIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingIcon,
  Warning as AlertIcon,
} from "@mui/icons-material";

import {
  LineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* ============================
   Dados de exemplo (mantidos)
============================ */
const stats = {
  pacientesHoje: 45,
  tempoMedioEspera: "25min",
  ocupacao: 75,
  alertas: 3,
};

const tempoEsperaData = [
  { hora: "08:00", tempo: 15 },
  { hora: "09:00", tempo: 25 },
  { hora: "10:00", tempo: 30 },
  { hora: "11:00", tempo: 20 },
  { hora: "12:00", tempo: 10 },
  { hora: "13:00", tempo: 15 },
  { hora: "14:00", tempo: 35 },
  { hora: "15:00", tempo: 25 },
];

const tiposConsultaData = [
  { tipo: "Regular", quantidade: 30 },
  { tipo: "Urgente", quantidade: 15 },
  { tipo: "Renovação", quantidade: 25 },
  { tipo: "Primeira", quantidade: 20 },
];

const statusData = [
  { name: "Em Espera", value: 30, color: "#2196f3" },
  { name: "Em Atendimento", value: 15, color: "#4caf50" },
  { name: "Atendidos", value: 45, color: "#ff9800" },
  { name: "Cancelados", value: 10, color: "#f44336" },
];

const filaAtual = [
  { nome: "João Silva", tipo: "Urgente", tempo: "5min" },
  { nome: "Maria Santos", tipo: "Regular", tempo: "15min" },
  { nome: "Pedro Costa", tipo: "Renovação", tempo: "20min" },
];

/* ============================
   Componente auxiliar: KPICard
============================ */
function KPICard({ icon, label, value, extra }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 2,
        border: `1px solid ${
          theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
        }`,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "primary.dark" : "primary.light",
            color: "primary.contrastText",
            width: 48,
            height: 48,
          }}
        >
          {icon}
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h4" noWrap fontWeight={800} lineHeight={1.15}>
            {value}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" noWrap>
            {label}
          </Typography>

          {extra}
        </Box>
      </Stack>
    </Paper>
  );
}

/* ============================
   Página: Dashboard
============================ */
function Dashboard() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" disableGutters>
      {/* Caixa única do Dashboard */}
      <Paper
        elevation={1}
        sx={{
          bgcolor: "background.paper",
          border: `1px solid ${
            theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
          }`,
          borderRadius: 3,
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Cabeçalho */}
        <Box sx={{ mb: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Box>
              <Typography variant="h5" fontWeight={800}>
                Visão Geral
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                KPIs operacionais e evolução dos atendimentos.
              </Typography>
            </Box>
            {/* Espaço para filtros/período se quiser */}
            {/* <Box><YourFilters /></Box> */}
          </Stack>

          <MuiDivider sx={{ mt: 2 }} />
        </Box>

        {/* ===== KPIs ===== */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              icon={<PeopleIcon />}
              label="Pacientes Hoje"
              value={stats.pacientesHoje}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <KPICard icon={<TimeIcon />} label="Tempo Médio de Espera" value={stats.tempoMedioEspera} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              icon={<TrendingIcon />}
              label="Ocupação"
              value={`${stats.ocupacao}%`}
              extra={
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={stats.ocupacao}
                    sx={{
                      height: 8,
                      borderRadius: 999,
                      bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "primary.main",
                      },
                    }}
                  />
                </Box>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <KPICard icon={<AlertIcon />} label="Alertas" value={stats.alertas} />
          </Grid>
        </Grid>

        {/* ===== Gráficos Principais ===== */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {/* Tempo de Espera (Linha) */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <Box p={2}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Tempo Médio de Espera por Hora
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={tempoEsperaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hora" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tempo"
                      name="Minutos"
                      strokeWidth={2}
                      stroke={theme.palette.primary.main}
                      dot={{ r: 2 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Status (Pizza) */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <Box p={2}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Distribuição de Status
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* ===== Gráficos Secundários + Fila ===== */}
        <Grid container spacing={2.5}>
          {/* Tipos de Consulta (Barras) */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <Box p={2}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Pacientes por Tipo de Consulta
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                  <ReBarChart data={tiposConsultaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tipo" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="quantidade"
                      name="Quantidade de Pacientes"
                      fill={theme.palette.success.main}
                    />
                  </ReBarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Fila Atual */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <Box p={2}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Fila Atual
                </Typography>

                <List
                  sx={{
                    p: 0,
                    "& .MuiListItem-root": { px: 0 },
                  }}
                >
                  {filaAtual.map((paciente, index) => (
                    <Box key={index}>
                      <ListItem disableGutters>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={700}>
                              {paciente.nome}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary" component="span">
                              {paciente.tipo} • Espera: {paciente.tempo}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < filaAtual.length - 1 && (
                        <Divider sx={{ borderColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)" }} />
                      )}
                    </Box>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Dashboard;