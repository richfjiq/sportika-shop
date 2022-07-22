import { useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layout';
import { validations } from '../../utils';
import { sportikaApi } from '../../api';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    try {
      const { data } = await sportikaApi.post('/user/login', {
        email,
        password,
      });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log('credentials error');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout title="Log In">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Log in
              </Typography>
              <Chip
                label="Wrong username / password"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{
                  width: '100%',
                  mt: 1,
                  display: showError ? 'flex' : 'none',
                }}
                variant="filled"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                {...register('email', {
                  required: 'Email is required.',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password', {
                  required: 'Password is required.',
                  minLength: { value: 6, message: 'At least 6 characters.' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Log in
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={'/auth/register'} passHref>
                <Link underline="always">Do you have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
