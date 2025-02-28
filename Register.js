import React, { useState } from 'react';
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
  Collapse,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  GitHub,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('Confirme sua senha'),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Formulário enviado:', values);
      setShowAlert(true);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
            >
              Criar Conta
            </Typography>

            <Collapse in={showAlert}>
              <Alert 
                severity="success" 
                sx={{ mb: 2, width: '100%' }}
                onClose={() => setShowAlert(false)}
              >
                Cadastro realizado com sucesso!
              </Alert>
            </Collapse>

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Nome Completo"
                name="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
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
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
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
              <TextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  height: '48px',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                  },
                }}
              >
                Criar Conta
              </Button>

              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Link href="/login" variant="body2" sx={{ color: 'primary.main' }}>
                  Já tem uma conta? Entre aqui
                </Link>
              </Box>

              <Divider sx={{ my: 2 }}>ou cadastre-se com</Divider>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton
                  sx={{
                    bgcolor: '#DB4437',
                    color: 'white',
                    '&:hover': { bgcolor: '#C53929' },
                  }}
                >
                  <Google />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: '#4267B2',
                    color: 'white',
                    '&:hover': { bgcolor: '#365899' },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: '#333',
                    color: 'white',
                    '&:hover': { bgcolor: '#000' },
                  }}
                >
                  <GitHub />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
}

export default Register;