import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { useAuth, useCart } from '../../store';
import { AddressForm } from '../../components/profile';

const SummaryPage = () => {
  const { shippingAddress } = useAuth();
  const router = useRouter();
  const { numberOfItems, createOrder, loading, orderCreated, newOrder } =
    useCart();
  const [addressModal, setAddressModal] = useState(false);

  const handleModal = () => setAddressModal((prev) => !prev);

  useEffect(() => {
    if (orderCreated) {
      router.replace(`/orders/${orderCreated}`);
    }
  }, [orderCreated, router]);

  const onCreateOrder = () => {
    createOrder();
  };

  return (
    <ShopLayout title={'Order summary'} pageDescription={'Order summary'}>
      {newOrder ? (
        <Box
          sx={{
            height: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-80px',
          }}
        >
          <CircularProgress size={80} thickness={2} />
          <Typography variant="h5" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <>
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

                  {shippingAddress ? (
                    <>
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          variant="subtitle1"
                          sx={{ fontSize: { xs: 14, sm: 18 } }}
                        >
                          Delivery address
                        </Typography>

                        <div onClick={handleModal}>
                          <Typography
                            sx={{
                              cursor: 'pointer',
                              fontSize: 16,
                              color: 'blue',
                            }}
                          >
                            Edit
                          </Typography>
                        </div>
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
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        color="secondary"
                        className="circular-btn"
                        onClick={handleModal}
                        disabled={loading}
                        type="button"
                        sx={{ width: '50%', margin: '40px 0' }}
                      >
                        Add Address
                      </Button>
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: { xs: 14, sm: 18 } }}
                    >
                      Bill
                    </Typography>

                    <NextLink href="/cart" passHref>
                      <Link sx={{ fontSize: 16, color: 'blue' }}>Edit</Link>
                    </NextLink>
                  </Box>

                  <OrderSummary />

                  <Box sx={{ mt: 3 }}>
                    <Button
                      color="secondary"
                      className="circular-btn"
                      fullWidth
                      onClick={onCreateOrder}
                      disabled={loading}
                      type="button"
                    >
                      Confirm Order
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
      <AddressForm open={addressModal} onClose={handleModal} />
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
