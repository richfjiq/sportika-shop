import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={'Sportika-Shop - Search'}
      pageDescription={
        'Find the shoes and clothes for practicing your favorite sport.'
      }
    >
      <Typography variant="h1" component="h1">
        Search Products
      </Typography>

      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
          Search term: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No products found
          </Typography>
          <Typography
            variant="h2"
            sx={{ ml: 1 }}
            color="secondary"
            textTransform="capitalize"
          >
            {`${query}`}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  //   TODO: regresar otros productos
  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
