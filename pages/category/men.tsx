import { Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const MenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title={'Sportika-Shop - Men'}
      pageDescription={'All products for men'}
    >
      <Typography variant="h1" component="h1">
        Men
      </Typography>
      <Typography variant="h2" sx={{ mb: 2, mt: 1 }}>
        All Products for men
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
