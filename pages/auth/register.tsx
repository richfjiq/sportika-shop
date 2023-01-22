import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
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
import { GetServerSideProps } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { CustomIcon } from '../../components/auth';

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
  const [providers, setProviders] = useState<any>({});

  const destination = router.query.p?.toString() || '/';

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [error]);

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    const userData = {
      name,
      email,
      password,
    };

    createUser(userData);
    router.replace('/auth/login?p=/');
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'calc(100vh - 220px)',
        }}
      >
        <Box
          sx={{
            width: 350,
            padding: '0 20px',
            margin: 'auto 0',
          }}
        >
          <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
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
                <NextLink href={`/auth/login?p=${destination}`} passHref>
                  <Link sx={{ color: 'blue' }}>
                    Have an account? Log in here
                  </Link>
                </NextLink>
              </Grid>
            </Grid>
          </form>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            sx={{ maxWidth: '350px', width: '100%' }}
          >
            <Divider sx={{ width: '100%', mb: 2, mt: 1 }} />
            {Object.values(providers).map((provider: any) => {
              if (provider.id === 'credentials') return;

              return (
                <Button
                  key={provider.id}
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => signIn(provider.id)}
                  startIcon={<CustomIcon logo={provider.id} />}
                >
                  {provider.name}
                </Button>
              );
            })}
          </Grid>
        </Box>
      </Box>
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
