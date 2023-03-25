import { Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const WomenPage = () => {
  const { products, error } = useProducts('/products?gender=women');

  return (
    <ShopLayout
      title={'Sportika-Shop - Women'}
      pageDescription={'All products for women'}
    >
      <Typography variant="h1" component="h1">
        Women
      </Typography>
      <Typography variant="h2" sx={{ mb: 2, mt: 1 }}>
        All Products for women
      </Typography>

      {!products ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
