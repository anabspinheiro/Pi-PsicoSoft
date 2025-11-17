import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import MetricCard from "./components/MetricCard";
import TimeLineChart from "./components/TimeLineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import DetailedMetrics from "./components/DetailedMetrics";
// src/pages/Employee/components/MetricsPanel/MetricsPanel.jsx

// Dados de exemplo para os gráficos
const waitTimeData = [
  { time: "9h", value: 12 },
  { time: "10h", value: 15 },
  { time: "11h", value: 18 },
  { time: "12h", value: 20 },
  { time: "13h", value: 15 },
  { time: "14h", value: 10 },
];

const flowData = [
  { time: "9h", value: 8 },
  { time: "10h", value: 12 },
  { time: "11h", value: 15 },
  { time: "12h", value: 10 },
  { time: "13h", value: 8 },
  { time: "14h", value: 14 },
];

function MetricsPanel({data}) {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" disableGutters className="mp-root">
      {/* Caixa única (Paper) que envolve todo o painel */}
      <Paper
        elevation={1}
        sx={{
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.mode === "dark"
            ? "rgba(255,255,255,.12)"
            : "rgba(0,0,0,.06)"
          }`,
          borderRadius: 3,
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Cabeçalho do painel */}
        <Box sx={{ mb: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Box>
              <Typography variant="h5" fontWeight={800}>
                Métricas e Desempenho
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Acompanhe tempos de espera, fluxo por hora e distribuição de atendimentos.
              </Typography>
            </Box>

            {/* Espaço para filtros ou período (opcional) */}
            {/* <Box><YourFilters/></Box> */}
          </Stack>

          <Divider sx={{ mt: 2 }} />
        </Box>

        {/* Cards de KPI com mini-gráficos */}
        <Grid container spacing={2.5}>
          {/* Tempo médio de espera */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                height: "100%",
                borderRadius: 2,
                border: `1px solid ${theme.palette.mode === "dark"
                  ? "rgba(255,255,255,.12)"
                  : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <MetricCard
                title="Tempo Médio de Espera"
                value="15min"
                trend="2min"
                trendLabel="↑ em relação à última hora"
                chart={<TimeLineChart data={waitTimeData} />}
              />
            </Paper>
          </Grid>

          {/* Pacientes por hora */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                height: "100%",
                borderRadius: 2,
                border: `1px solid ${theme.palette.mode === "dark"
                  ? "rgba(255,255,255,.12)"
                  : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <MetricCard
                title="Pacientes por Hora"
                value="12"
                trend="-2"
                trendLabel="↓ na última hora"
                chart={<BarChart data={flowData} />}
              />
            </Paper>
          </Grid>

          {/* Distribuição de atendimentos */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                height: "100%",
                borderRadius: 2,
                border: `1px solid ${theme.palette.mode === "dark"
                  ? "rgba(255,255,255,.12)"
                  : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <MetricCard
                title="Distribuição de Atendimentos"
                value=""
                trend=""
                chart={
                  <PieChart
                    data={{
                      renewal: 40,
                      urgent: 15,
                      newPatient: 25,
                      regular: 20,
                    }}
                  />
                }
              />
            </Paper>
          </Grid>

          {/* Métricas detalhadas — ocupa toda a largura */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, md: 2 },
                borderRadius: 2,
                border: `1px solid ${theme.palette.mode === "dark"
                  ? "rgba(255,255,255,.12)"
                  : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="h6" fontWeight={800}>
                  Métricas Detalhadas
                </Typography>

                {/* Ações/periodicidade (opcional) */}
                {/* <Stack direction="row" spacing={1}><Button size="small">Exportar</Button></Stack> */}
              </Box>

              <DetailedMetrics
                categories={{
                  newPatients: {
                    monthly: 40,
                    trend: "+12%",
                    avgWaitTime: "30min",
                  },
                  recurring: {
                    monthly: 120,
                    trend: "stable",
                    avgWaitTime: "15min",
                  },
                  urgent: {
                    monthly: 25,
                    trend: "-5%",
                    avgWaitTime: "10min",
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default MetricsPanel;