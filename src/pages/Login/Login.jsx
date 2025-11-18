import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import { Person, Lock, Google, ArrowBack } from '@mui/icons-material';

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('userType') || 'Paciente';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for existing authToken on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (authToken) {
      // If authToken exists, navigate based on user type
      if (userType === 'Funcionario') {
        navigate('/employee');
      } else {
        navigate('/profile');
      }
    }
  }, [navigate, userType]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call template
      console.log('Logging in with:', formData, 'as', userType);
      const response = await fetch('https://6blopd43v4.execute-api.us-east-1.amazonaws.com/Alpha/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          empresa: "PSICOSOFT",
          tipo: userType
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Generate UUID using Unix time and CPF
      const unixTime = Date.now();
      const cpf = data.client?.cpf || '';
      const customToken = `${unixTime}-${cpf}`;

      // Store authentication token
      if (formData.rememberMe) {
        localStorage.setItem('authToken', customToken);
      } else {
        sessionStorage.setItem('authToken', customToken);
      }

      // Store user data if needed
      localStorage.setItem('userData', JSON.stringify(
        {
          ...data.client,
          tipo: userType,
          email: formData.email
        }
      ));

      // Navigate based on user type
      if (userType === 'Funcionario') {
        navigate('/employee');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: (theme) => `linear-gradient(135deg, ${theme.palette.info.main}, ${theme.palette.secondary.main})`,
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          bgcolor: 'background.paper',
          '&:hover': {
            bgcolor: 'background.default',
          },
        }}
      >
        <ArrowBack />
      </IconButton>
      <Card
        sx={{
          width: 400,
          p: 4,
          position: 'relative',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            bgcolor: 'primary.main',
            borderRadius: '12px 12px 0 0',
          },
        }}
      >
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" component="h2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
            Entrar no PsicoSoft
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Acesse sua conta para continuar
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              type="email"
              name="email"
              placeholder="Endereço de e-mail"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type="password"
              name="password"
              placeholder="Senha"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    size="small" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label={<Typography variant="body2">Lembrar-me</Typography>}
              />
              <Link href="#" underline="hover" variant="body2" color="primary">
                Esqueci minha senha
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 2,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>

            <Divider sx={{ my: 2 }} />

            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              startIcon={<Google />}
              sx={{
                py: 1.5,
              }}
            >
              Entrar com Google
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;
