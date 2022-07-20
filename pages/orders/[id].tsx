import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout
      title={'Order summary 823458285'}
      pageDescription={'Order summary'}
    >
      <Typography
        sx={{ fontSize: { xs: 18, sm: 22 } }}
        variant="h1"
        component="h1"
        mb={3}
      >
        Order: 823458285
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pending payment"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Paid order"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

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
                Summary (3 items)
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
                Ricardo Flores
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                323 Some place
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                Stittsville, HYA 23S
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                Canada
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                +1 1234 1134 54
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
                <h1>Paid</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Paid order"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
