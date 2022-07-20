import { Typography } from '@mui/material';
import type { NextPage } from 'next';

import { ShopLayout } from '../components/layout';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';
import { useProducts } from '../hooks';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <ShopLayout
      title={'Sportika-Shop - Home'}
      pageDescription={
        'Find the shoes and clothes for practicing your favorite sport.'
      }
      fromHome={true}
    >
      <Typography variant="h1" component="h1">
        Home
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        All Products
      </Typography>

      <ProductList products={products} />
    </ShopLayout>
  );
};

export default HomePage;
