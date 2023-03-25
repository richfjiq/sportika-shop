import { Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const GirlsPage = () => {
  const { products, error } = useProducts('/products?gender=girls');

  return (
    <ShopLayout
      title={'Sportika-Shop - Girls'}
      pageDescription={'All products for girls'}
    >
      <Typography variant="h1" component="h1">
        Girls
      </Typography>
      <Typography variant="h2" sx={{ mb: 2, mt: 1 }}>
        All Products for girls
      </Typography>

      {!products ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default GirlsPage;
