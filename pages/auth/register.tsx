import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../components/layout';

const RegisterPage = () => {
  return (
    <AuthLayout title="Create an account">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Create an account
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Name" variant="outlined" fullWidth />
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
    </AuthLayout>
  );
};

export default RegisterPage;
