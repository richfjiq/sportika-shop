import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { CartList, OrderSummary } from '../../components/cart';
import { EmptyPage } from '../../components/cart';

import { ShopLayout } from '../../components/layout';
import { useCart } from '../../store';

const CartPage = () => {
  const { numberOfItems } = useCart();

  return (
    <ShopLayout title={'Cart - 3'} pageDescription={'Shopping cart'}>
      {numberOfItems === 0 ? (
        <EmptyPage />
      ) : (
        <>
          <Typography variant="h1" component="h1">
            Cart
          </Typography>
          <Grid container mt={3}>
            <Grid item xs={12} sm={7}>
              <CartList editable />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Card className="summary-card">
                <CardContent>
                  <Typography variant="h2">Order</Typography>
                  <Divider sx={{ my: 1 }} />

                  <OrderSummary />

                  <Box sx={{ mt: 3 }}>
                    <Link href="/checkout/summary">
                      <Button
                        color="secondary"
                        className="circular-btn"
                        fullWidth
                        type="button"
                      >
                        Checkout
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </ShopLayout>
  );
};

export default CartPage;
