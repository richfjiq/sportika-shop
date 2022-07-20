import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../components/layout';

const LoginPage = () => {
  return (
    <AuthLayout title="Log In">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Log in
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Email" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Password" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button
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
    </AuthLayout>
  );
};

export default LoginPage;
