import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth, useCart } from '../../store';
import { ShopLayout } from '../../components/layout';
import { AddressForm } from '../../components/profile';

const AddressPage = () => {
  const { shippingAddress } = useAuth();
  const router = useRouter();
  const [addressModal, setAddressModal] = useState(false);

  const handleModal = () => setAddressModal((prev) => !prev);

  const onSubmitAddress = () => {
    if (!shippingAddress) return;
    console.log('Button clicked');
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout title="Address" pageDescription="Confirm address">
      <Typography variant="h1" component="h1" mb={3} textAlign="center">
        Delivery Address
      </Typography>

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          display="flex"
          justifyContent="center"
          spacing={1}
          sx={{ maxWidth: '1240px' }}
        >
          <Grid item xs={12} sm={10} md={6}>
            <Card className="summary-card">
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: { xs: 16, sm: 20 } }}
                  >
                    My address
                  </Typography>

                  {shippingAddress ? (
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
                  ) : null}
                </Box>

                {shippingAddress ? (
                  <>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.firstName} ${shippingAddress.lastName}`}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.address}`}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zip}`}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.country}`}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.code} ${shippingAddress.phone}`}
                    </Typography>
                  </>
                ) : (
                  <Box
                    sx={{
                      my: 5,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      color="secondary"
                      className="circular-btn"
                      size="large"
                      onClick={handleModal}
                    >
                      Add Address
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <Button
          type="button"
          color="secondary"
          className="circular-btn"
          size="large"
          onClick={() => onSubmitAddress()}
        >
          Review Order
        </Button>
      </Box>
      <AddressForm open={addressModal} onClose={handleModal} />
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = '' } = req.cookies;
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
