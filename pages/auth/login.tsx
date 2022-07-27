import { useEffect, useState } from 'react';
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

import { ShopLayout } from '../../components/layout';
import { validations } from '../../utils';
// import { useAuth } from '../../store';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [providers, setProviders] = useState<any>({});
  // const [showError, setShowError] = useState(false);
  // const { userLogin, loading, error, isLoggedIn } = useAuth();
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

  const destination = router.query.p?.toString() || '/';

  // useEffect(() => {
  //   if (error) {
  //     setShowError(true);
  //     setTimeout(() => {
  //       setShowError(false);
  //     }, 3000);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const destination = router.query.p?.toString() || '/';
  //     router.replace(destination);
  //   }
  // }, [isLoggedIn, router]);

  const onLoginUser = async ({ email, password }: FormData) => {
    await signIn('credentials', { email, password });
    // const data = {
    //   email,
    //   password,
    // };
    // userLogin(data);
    // setShowError(false);
    // try {
    //   const { data } = await sportikaApi.post('/user/login', {
    //     email,
    //     password,
    //   });
    //   const { token, user } = data;
    //   console.log({ token, user });
    // } catch (error) {
    //   console.log('credentials error');
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    // }
  };

  return (
    <ShopLayout title="Log In" pageDescription="User Log in">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
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
                  // disabled={loading}
                >
                  Log in
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink href={`/auth/register?p=${destination}`} passHref>
                  <Link underline="always">Do you have an account?</Link>
                </NextLink>
              </Grid>

              <Grid
                item
                xs={12}
                display="flex"
                flexDirection="column"
                justifyContent="end"
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

  return {
    props: {},
  };
};

export default LoginPage;
