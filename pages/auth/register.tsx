import NextLink from 'next/link';
import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layout';
import { sportikaApi } from '../../api';
import { validations } from '../../utils';
import { AxiosError } from 'axios';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    try {
      const { data } = await sportikaApi.post('/user/register', {
        name,
        email,
        password,
      });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log('credentials error', { error });
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout title="Create an account">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Create an account
              </Typography>
              <Chip
                label="Email already exists."
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
                label="Name"
                variant="outlined"
                fullWidth
                {...register('name', {
                  required: 'Name is required.',
                  minLength: { value: 2, message: 'At least 2 characters.' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
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
                Create account
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={'/auth/login'} passHref>
                <Link underline="always">I have an account.</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
