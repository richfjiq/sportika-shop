import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>Items</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>$155.46</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>Tax (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>$35.34</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }} variant="subtitle1">
          Total:
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography
          sx={{ fontSize: { xs: 14, sm: 18 }, fontWeight: { xs: 'bold' } }}
        >
          $186.34
        </Typography>
      </Grid>
    </Grid>
  );
};
