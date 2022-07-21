import { Grid, Typography } from '@mui/material';
import { useCart } from '../../store';
import { currency } from '../../utils';

export const OrderSummary = () => {
  const { numberOfItems, subTotal, total, tax } = useCart();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>Items</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
          {numberOfItems} {numberOfItems === 1 ? 'item' : 'items'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
          {currency.format(subTotal)}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
          Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
          {currency.format(tax)}
        </Typography>
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
          {currency.format(total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
