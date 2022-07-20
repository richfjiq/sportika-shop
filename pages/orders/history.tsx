import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layout';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: "Shows order's status",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Pending" variant="outlined" />
      );
    },
  },
  {
    field: 'order',
    headerName: 'Order',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">See details</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullName: 'Fernando Herrera' },
  { id: 2, paid: false, fullName: 'Melissa Flores' },
  { id: 3, paid: true, fullName: 'Hernando Vallejo' },
  { id: 4, paid: true, fullName: 'Emin Reyes' },
  { id: 5, paid: false, fullName: 'Eduardo Rios' },
  { id: 6, paid: true, fullName: 'Natalia Herrera' },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={'Orders history'}
      pageDescription={'Customer order history'}
    >
      <Typography variant="h1" component="h1">
        Orders history
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
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

export default HistoryPage;
