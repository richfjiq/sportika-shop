import NextLink from 'next/link';
import { useEffect, useState } from 'react';
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

import { ShopLayout } from '../../components/layout';
import { validations } from '../../utils';
import { useAuth } from '../../store';
import { useRouter } from 'next/router';
import { sportikaApi } from '../../api';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { createUser, loading, error, isLoggedIn } = useAuth();
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const destination = router.query.p?.toString() || '/';

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (isLoggedIn) {
      const destination = router.query.p?.toString() || '/';
      router.replace(destination);
    }
  }, [isLoggedIn, router]);

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    const userData = {
      name,
      email,
      password,
    };

    createUser(userData);
    // setShowError(false);
    // try {
    //   const { data } = await sportikaApi.post('/user/register', {
    //     name,
    //     email,
    //     password,
    //   });
    //   const { token, user } = data;
    //   console.log({ token, user });
    // } catch (error) {
    //   console.log('credentials error', { error });
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    // }
  };

  return (
    <ShopLayout title="Create an account" pageDescription="Create an account">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 350,
              padding: '10px 20px',
              margin: 'auto 0',
              height: 'calc(100vh - 200px)',
            }}
          >
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
                  disabled={loading}
                >
                  Create account
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink href={`/auth/register?p=${destination}`} passHref>
                  <Link underline="always">I have an account.</Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
