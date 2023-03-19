import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment';

import { ShopLayout } from '../../components/layout';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
  {
    field: 'order',
    headerName: 'Order',
    width: 150,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Box
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Link sx={{ color: 'blue' }}>See details</Link>
          </Box>
        </NextLink>
      );
    },
  },
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Name', width: 300, sortable: false },
  {
    field: 'paid',
    headerName: 'Paid',
    description: "Shows order's status",
    width: 150,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Pending" variant="outlined" />
      );
    },
  },

  {
    field: 'date',
    headerName: 'Date',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      const date = moment(params.row.date).format('DD-MM-YYYY hh:mm a');
      return <Typography>{date}</Typography>;
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
    date: order.createdAt,
  }));

  return (
    <ShopLayout
      title={'Orders history'}
      pageDescription={'Customer order history'}
    >
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Orders history
      </Typography>

      <Grid container className="fadeIn">
        <Grid
          item
          xs={12}
          sx={{
            height: 650,
            width: '100%',
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?=/orders/history`,
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
