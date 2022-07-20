import { Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const BoysPage = () => {
  const { products, isLoading } = useProducts('/products?gender=boys');

  return (
    <ShopLayout
      title={'Sportika-Shop - Boys'}
      pageDescription={'All products for boys'}
    >
      <Typography variant="h1" component="h1">
        Boys
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        All Products for boys
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default BoysPage;
