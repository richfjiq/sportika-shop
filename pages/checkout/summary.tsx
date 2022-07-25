import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { useCart } from '../../store';

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useCart();

  return (
    <ShopLayout title={'Order summary'} pageDescription={'Order summary'}>
      <Typography
        sx={{ fontSize: { xs: 18, sm: 22 } }}
        variant="h1"
        component="h1"
        mb={3}
      >
        Order summary
      </Typography>
      <Grid container display="flex" justifyContent="center" spacing={1}>
        <Grid item xs={12} sm={12} md={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={10} md={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography
                sx={{
                  fontSize: { xs: 16, sm: 20 },
                  fontWeight: { xs: '600', sm: '600' },
                }}
                variant="h2"
              >
                Summary{' '}
                {numberOfItems === 1
                  ? `${numberOfItems} item`
                  : `${numberOfItems} items`}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: { xs: 14, sm: 18 } }}
                >
                  Delivery address
                </Typography>

                <NextLink href="/checkout/address" passHref>
                  <Link
                    sx={{ fontSize: { xs: 14, sm: 18 } }}
                    underline="always"
                  >
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {shippingAddress?.address} {shippingAddress?.address2}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {shippingAddress?.city} {shippingAddress?.zip}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {shippingAddress?.country}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {`${shippingAddress?.code} ${shippingAddress?.phone}`}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link
                    sx={{ fontSize: { xs: 14, sm: 18 } }}
                    underline="always"
                  >
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
