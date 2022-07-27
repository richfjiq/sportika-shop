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
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { useCart } from '../../store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems } = useCart();

  useEffect(() => {
    if (!Cookies.get('firstName') && !Cookies.get('cart')) {
      router.push('/');
    }
    if (!Cookies.get('firstName') && Cookies.get('cart')) {
      router.push('/checkout/address');
    }
  }, [router]);

  if (!shippingAddress) {
    return <></>;
  }

  const {
    firstName,
    lastName,
    address,
    address2,
    city,
    zip,
    country,
    phone,
    code,
  } = shippingAddress;

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
                {`${firstName} ${lastName}`}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {address} {address2}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {city} {zip}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {country}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {`${code} ${phone}`}
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

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/summary',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default SummaryPage;
