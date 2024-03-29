import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { ShopLayout } from '../../components/layout';
import { validations } from '../../utils';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { CustomIcon } from '../../components/auth';
import { sportikaApi } from '../../api';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const [providers, setProviders] = useState<any>({});

  const destination = router.query.p?.toString() || '/';

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    try {
      setLoading(true);
      const { data } = await sportikaApi.post('/user/register', {
        name,
        email,
        password,
      });
      const { message } = data;
      setLoading(false);
      resetField('email');
      resetField('name');
      resetField('password');
      toast.success(data.message, {
        position: 'top-center',
        onClose: () => router.replace('/auth/login'),
      });
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          position: 'top-center',
        });
      }
    }
  };

  return (
    <ShopLayout title="Create an account" pageDescription="Create an account">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 350,
            padding: '20px 0',
            margin: 'auto 0',
          }}
        >
          <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h1" component="h1">
                  Create an account
                </Typography>
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
                  {loading ? (
                    <CircularProgress size={26} sx={{ color: 'white' }} />
                  ) : (
                    'Create account'
                  )}
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
          <Grid item xs={12} display="flex" flexDirection="column">
            <Divider sx={{ width: '100%', mb: 3, mt: 1 }} />
            {Object.values(providers).map((provider: any) => {
              if (provider.id === 'credentials') return;

              return (
                <Button
                  key={provider.id}
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ mb: 2, padding: '10px 0' }}
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
