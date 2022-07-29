import { FC } from 'react';
import { Grid, Typography } from '@mui/material';

import { useCart } from '../../store';
import { currency } from '../../utils';

interface Props {
  numberOfItemsOrder?: number;
  subTotalOrder?: number;
  totalOrder?: number;
  taxOrder?: number;
  fromOrder?: boolean;
}

export const OrderSummary: FC<Props> = ({
  numberOfItemsOrder = 0,
  subTotalOrder = 0,
  totalOrder = 0,
  taxOrder = 0,
  fromOrder = false,
}) => {
  const { numberOfItems, subTotal, total, tax } = useCart();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>Items</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
          {fromOrder ? numberOfItemsOrder : numberOfItems}{' '}
          {fromOrder
            ? numberOfItemsOrder
            : numberOfItems === 1
            ? 'item'
            : 'items'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
          {fromOrder
            ? currency.format(subTotalOrder)
            : currency.format(subTotal)}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
          Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
          {fromOrder ? currency.format(taxOrder) : currency.format(tax)}
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
          {fromOrder ? currency.format(totalOrder) : currency.format(total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
