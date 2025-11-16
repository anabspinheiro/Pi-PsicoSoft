import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Paper,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Queue as QueueIcon,
  Warning as WarningIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";

/* ---------------------------------------------
   Componente: Lista de Pacientes
   --------------------------------------------- */
const QueueList = ({ patients, estimatedWaitTime, priority }) => (
  <List
    sx={{
      p: 0,
      "& .MuiListItem-root": {
        px: 2,
        py: 1.25,
        borderBottom: (t) =>
          `1px dashed ${t.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)"}`,
        "&:last-of-type": { borderBottom: "none" },
      },
    }}
  >
    {patients.map((patient, index) => (
      <ListItem key={`${patient.name}-${index}`} disableGutters>
        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight={700}>
              {patient.name}
            </Typography>
          }
          secondary={
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.25 }}>
              <Chip
                size="small"
                label={priority}
                color={priority === "Alta" ? "error" : priority === "Média" ? "warning" : "primary"}
                sx={{
                  fontWeight: 700,
                  borderRadius: 999,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Espera: {patient.waitTime} min
              </Typography>
            </Box>
          }
        />
      </ListItem>
    ))}
  </List>
);

/* ---------------------------------------------
   Componente: Monitor de Status (KPI)
   --------------------------------------------- */
const StatusMonitor = ({ currentlyServing, waitingTotal, averageWaitTime }) => (
  <Card
    elevation={0}
    sx={(t) => ({
      border: `1px solid ${
        t.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
      }`,
      borderRadius: 2,
    })}
  >
    <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            sx={(t) => ({
              textAlign: "center",
              p: 1.5,
              borderRadius: 1.5,
              bgcolor: t.palette.mode === "dark" ? "rgba(255,255,255,.04)" : "rgba(2,62,138,.06)",
              border: `1px solid ${
                t.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
              }`,
            })}
          >
            <Typography variant="h6" fontWeight={800}>
              Em Atendimento: {currentlyServing}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={(t) => ({
              textAlign: "center",
              p: 1.5,
              borderRadius: 1.5,
              bgcolor: t.palette.mode === "dark" ? "rgba(255,255,255,.04)" : "rgba(2,62,138,.06)",
              border: `1px solid ${
                t.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
              }`,
            })}
          >
            <Typography variant="h6" fontWeight={800}>
              Total em Espera: {waitingTotal}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={(t) => ({
              textAlign: "center",
              p: 1.5,
              borderRadius: 1.5,
              bgcolor: t.palette.mode === "dark" ? "rgba(255,255,255,.04)" : "rgba(2,62,138,.06)",
              border: `1px solid ${
                t.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
              }`,
            })}
          >
            <Typography variant="h6" fontWeight={800}>
              Tempo Médio: {averageWaitTime} min
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

/* ---------------------------------------------
   Página: QueueManagement
   --------------------------------------------- */
function QueueManagement() {
  const theme = useTheme();

  // Dados de exemplo
  const [queue] = useState({
    regular: [
      { name: "João Silva", waitTime: 10 },
      { name: "Maria Santos", waitTime: 15 },
    ],
    renewal: [
      { name: "Pedro Costa", waitTime: 5 },
      { name: "Ana Oliveira", waitTime: 8 },
    ],
    urgent: [
      { name: "Carlos Lima", waitTime: 2 },
      { name: "Beatriz Souza", waitTime: 3 },
    ],
    currentlyServing: 3,
    totalWaiting: 6,
  });

  return (
    <Container maxWidth="xl" disableGutters>
      {/* Caixa única envolvendo todo o ambiente */}
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
        {/* Cabeçalho: título + ações */}
        <Box sx={{ mb: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Box>
              <Typography variant="h5" fontWeight={800}>
                Gerenciamento de Filas
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Controle de prioridades, acompanhamento de espera e status operacional.
              </Typography>
            </Box>

            <ButtonGroup
              variant="contained"
              aria-label="Ações do gerenciamento de filas"
              sx={{
                "& .MuiButton-root": {
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2,
                  boxShadow: theme.shadows[3],
                },
                "& .MuiButton-contained": {
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                },
              }}
            >
              <Button startIcon={<QueueIcon />}>Chamar Próximo</Button>
              <Button
                color="warning"
                startIcon={<TimeIcon />}
                sx={{
                  bgcolor: "warning.main",
                  "&:hover": { bgcolor: "warning.dark" },
                }}
              >
                Pausar Fila
              </Button>
              <Button
                color="error"
                startIcon={<WarningIcon />}
                sx={{
                  bgcolor: "error.main",
                  "&:hover": { bgcolor: "error.dark" },
                }}
              >
                Emergência
              </Button>
            </ButtonGroup>
          </Stack>

          <Divider sx={{ mt: 2 }} />
        </Box>

        {/* Conteúdo em grid (cards de filas + monitor) */}
        <Grid container spacing={2.5}>
          {/* Renovação */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <CardHeader
                title="Renovação de Consultas"
                subheader="Prioridade: Média"
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,.04)"
                      : "rgba(2,62,138,.06)",
                  borderBottom: `1px solid ${
                    theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                  }`,
                  "& .MuiCardHeader-title": { fontWeight: 800 },
                  "& .MuiCardHeader-subheader": { color: "text.secondary", fontWeight: 600 },
                }}
              />
              <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                <QueueList patients={queue.renewal} estimatedWaitTime={15} priority="Média" />
              </CardContent>
            </Card>
          </Grid>

          {/* Urgentes */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <CardHeader
                title="Casos Urgentes"
                subheader="Prioridade: Alta"
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,.04)"
                      : "rgba(244, 67, 54, 0.08)", // leve vermelho
                  borderBottom: `1px solid ${
                    theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                  }`,
                  "& .MuiCardHeader-title": { fontWeight: 800, color: "error.main" },
                  "& .MuiCardHeader-subheader": { color: "text.secondary", fontWeight: 600 },
                }}
              />
              <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                <QueueList patients={queue.urgent} estimatedWaitTime={5} priority="Alta" />
              </CardContent>
            </Card>
          </Grid>

          {/* Regulares */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                }`,
              }}
            >
              <CardHeader
                title="Consultas Regulares"
                subheader="Prioridade: Normal"
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,.04)"
                      : "rgba(2,62,138,.06)",
                  borderBottom: `1px solid ${
                    theme.palette.mode === "dark" ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)"
                  }`,
                  "& .MuiCardHeader-title": { fontWeight: 800 },
                  "& .MuiCardHeader-subheader": { color: "text.secondary", fontWeight: 600 },
                }}
              />
              <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                <QueueList patients={queue.regular} estimatedWaitTime={20} priority="Normal" />
              </CardContent>
            </Card>
          </Grid>

          {/* Monitor de Status — ocupa 100% da largura */}
          <Grid item xs={12}>
            <StatusMonitor
              currentlyServing={queue.currentlyServing}
              waitingTotal={queue.totalWaiting}
              averageWaitTime={15}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default QueueManagement;