import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Link,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel,
  Tooltip,
  Snackbar,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  GitHub,
  DarkMode,
  LightMode,
  LoginOutlined,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: darkMode ? '#ffffff' : '#000000'
      },
      opacity: {
        value: 0.2
      },
      size: {
        value: 3
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'bounce'
        }
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.style.backgroundColor = darkMode ? '#303030' : '#f5f5f5';
  }, [darkMode]);

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleSocialLogin = (provider) => {
    setSnackbar({
      open: true,
      message: `Login com ${provider} em desenvolvimento`,
      severity: 'info'
    });
  };

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('rememberedEmail') || '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', values.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        setShowAlert(true);
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Erro ao fazer login. Tente novamente.',
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: darkMode 
            ? 'linear-gradient(135deg, #1a237e 0%, #000000 100%)'
            : 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)',
          transition: 'background 0.3s ease',
          zIndex: -1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
            opacity: darkMode ? 0.8 : 0.3,
            transition: 'opacity 0.3s ease'
          }
        }}
      />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      />
      <Container 
        component="main" 
        maxWidth="xs"
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Paper
              elevation={darkMode ? 4 : 3}
              sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                background: darkMode ? 'rgba(48, 48, 48, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                color: darkMode ? '#fff' : 'inherit',
                borderRadius: 2,
              }}
            >
              <Box sx={{ position: 'absolute', right: 20, top: 20 }}>
                <Tooltip title={darkMode ? "Modo Claro" : "Modo Escuro"}>
                  <IconButton 
                    onClick={handleDarkModeChange} 
                    color="primary"
                    sx={{ 
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'rotate(180deg)' }
                    }}
                  >
                    {darkMode ? <LightMode /> : <DarkMode />}
                  </IconButton>
                </Tooltip>
              </Box>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <LoginOutlined sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ 
                    mb: 3, 
                    fontWeight: 'bold', 
                    color: 'primary.main',
                    textAlign: 'center'
                  }}
                >
                  Bem-vindo
                </Typography>
              </motion.div>

              <AnimatePresence>
                {showAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Alert 
                      severity="success" 
                      sx={{ mb: 2, width: '100%' }}
                      onClose={() => setShowAlert(false)}
                    >
                      Login realizado com sucesso!
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <Box 
                component="form" 
                onSubmit={formik.handleSubmit} 
                sx={{ 
                  mt: 1,
                  width: '100%',
                  '& .MuiTextField-root': {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : undefined,
                      },
                      '&:hover fieldset': {
                        borderColor: darkMode ? 'rgba(255, 255, 255, 0.5)' : undefined,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined,
                    },
                    '& .MuiInputBase-input': {
                      color: darkMode ? '#fff' : undefined,
                    },
                  }
                }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Lembrar-me"
                  sx={{ 
                    mt: 1, 
                    color: darkMode ? '#fff' : 'inherit',
                    '& .MuiSwitch-track': {
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : undefined
                    }
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    height: '48px',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                      transform: 'scale(1.02)',
                    },
                    transition: 'transform 0.2s ease',
                    position: 'relative',
                  }}
                >
                  {isLoading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: '#fff',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  ) : (
                    'Entrar'
                  )}
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Link 
                    href="/forgot-password" 
                    variant="body2" 
                    sx={{ 
                      color: darkMode ? '#90caf9' : 'primary.main',
                      '&:hover': { textDecoration: 'none' }
                    }}
                  >
                    Esqueceu a senha?
                  </Link>
                  <Link 
                    href="/register" 
                    variant="body2" 
                    sx={{ 
                      color: darkMode ? '#90caf9' : 'primary.main',
                      '&:hover': { textDecoration: 'none' }
                    }}
                  >
                    Criar conta
                  </Link>
                </Box>

                <Divider sx={{ 
                  my: 2,
                  '&::before, &::after': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : undefined
                  },
                  color: darkMode ? '#fff' : undefined
                }}>
                  ou continue com
                </Divider>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Tooltip title="Google">
                    <IconButton
                      onClick={() => handleSocialLogin('Google')}
                      sx={{
                        bgcolor: '#DB4437',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: '#C53929',
                          transform: 'scale(1.1)'
                        },
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <Google />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Facebook">
                    <IconButton
                      onClick={() => handleSocialLogin('Facebook')}
                      sx={{
                        bgcolor: '#4267B2',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: '#365899',
                          transform: 'scale(1.1)'
                        },
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <Facebook />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="GitHub">
                    <IconButton
                      onClick={() => handleSocialLogin('GitHub')}
                      sx={{
                        bgcolor: '#333',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: '#000',
                          transform: 'scale(1.1)'
                        },
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <GitHub />
                    </IconButton>
                  </Tooltip>
                  </Box>
              </Box>
            </Paper>
          </Box>
        </motion.div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default Login;