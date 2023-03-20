import { GetServerSideProps, NextPage } from 'next';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { sportikaApi } from '../../api';
import { useEffect, useState } from 'react';
import { useCart } from '../../store';

export type OrderResponseBody = {
  id: string;
  status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'PAYER_ACTION_REQUIRED';
};

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { orderCreated, setOrderCreated, newOrderCreated } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();
  const {
    _id,
    numberOfItems,
    orderItems,
    shippingAddress: {
      firstName,
      lastName,
      address,
      address2,
      zip,
      phone,
      code,
      country,
      city,
    },
    isPaid,
    subTotal,
    total,
    tax,
  } = order;

  useEffect(() => {
    if (orderCreated) {
      setOrderCreated('');
      newOrderCreated(false);
    }
  }, [newOrderCreated, orderCreated, setOrderCreated]);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('There is not Paypal payment.');
    }

    setIsPaying(true);

    try {
      const { data } = await sportikaApi.post('/orders/pay', {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert('Error');
    }
  };

  return (
    <ShopLayout title={'Order summary'} pageDescription={'Order summary'}>
      <Typography
        sx={{ fontSize: { xs: 18, sm: 22 } }}
        variant="h1"
        component="h1"
        mb={3}
      >
        Order: {_id}
      </Typography>

      {isPaid ? (
        <Chip
          sx={{ mb: 3 }}
          label="Paid order"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ mb: 3 }}
          label="Pending payment"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid
        container
        className="fadeIn"
        display="flex"
        justifyContent="center"
        spacing={1}
      >
        <Grid item xs={12} sm={12} md={7}>
          <CartList products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={10} md={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography
                sx={{
                  fontSize: { xs: 14 },
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Testing account Paypal payment
              </Typography>
              <Typography sx={{ fontSize: { xs: 14 }, textAlign: 'center' }}>
                sb-6sy8u17836682@personal.example.com
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 14 }, textAlign: 'center' }}
                marginBottom={1}
              >
                123abc&$
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 16, sm: 20 },
                  fontWeight: { xs: '600', sm: '600' },
                }}
                variant="h2"
              >
                Summary{' '}
                {numberOfItems === 1
                  ? `(${numberOfItems} item)`
                  : `(${numberOfItems} items)`}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: { xs: 14, sm: 18 } }}
                >
                  Delivery address
                </Typography>
              </Box>

              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {`${firstName} ${lastName}`}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {address}, {address2 ? address2 : ''}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {city}, {zip}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {country}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {`${code} ${phone}`}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: { xs: 14, sm: 18 } }}
                >
                  Bill
                </Typography>
              </Box>

              <OrderSummary
                numberOfItemsOrder={numberOfItems}
                subTotalOrder={subTotal}
                totalOrder={total}
                taxOrder={tax}
                fromOrder={true}
              />

              <Box sx={{ mt: 2 }} display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="center"
                  className="fadeIn"
                  sx={{ display: isPaying ? 'flex' : 'none' }}
                >
                  <CircularProgress />
                </Box>

                <Box
                  flexDirection="column"
                  sx={{ display: !isPaying ? 'flex' : 'none', flex: 1 }}
                >
                  {isPaid ? (
                    <Chip
                      label="Paid order"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                          // console.log({ details });
                          // const name = details.payer.name!.given_name;
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>

              <Link href="/orders/history">
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  type="button"
                  sx={{ mt: 3 }}
                >
                  Go To Orders
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
