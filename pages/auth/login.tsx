import { FC, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
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
import { ErrorOutline } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { ShopLayout } from '../../components/layout';
import { validations } from '../../utils';
import { CustomIcon } from '../../components/auth';

type FormData = {
  email: string;
  password: string;
};

type Props = {
  error: boolean;
  registered: boolean;
};

const LoginPage: FC<Props> = ({ error = false }) => {
  const router = useRouter();
  const [providers, setProviders] = useState<any>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  useEffect(() => {
    if (error) {
      toast.error('Wrong credentials.', {
        position: 'top-center',
      });

      return () => toast.dismiss();
    }
  }, [error]);

  const destination = router.query.p?.toString() || '/';

  const onLoginUser = async ({ email, password }: FormData) => {
    await signIn('credentials', { email, password });
  };

  return (
    <ShopLayout title="Log In" pageDescription="User Log in">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: '20px 0', sm: '50px 0' },
          }}
        >
          <Box
            sx={{
              width: 350,
              margin: 'auto 0',
            }}
          >
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
                    // display: showError ? 'flex' : 'none',
                    display: 'none',
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
                <NextLink href={`/auth/register?p=${destination}`} passHref>
                  <Link sx={{ color: 'blue' }}>
                    Don&apos;t have an account?
                  </Link>
                </NextLink>
              </Grid>

              <Grid
                item
                xs={12}
                display="flex"
                flexDirection="column"
                justifyContent="end"
              >
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
        destination: `${p.toString()}`,
        permanent: false,
      },
    };
  }

  let errorLogin = false;

  if (query?.error) {
    errorLogin = true;

    return {
      props: {
        error: errorLogin,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
