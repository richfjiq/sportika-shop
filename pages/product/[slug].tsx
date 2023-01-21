import { useState } from 'react';
import {
  NextPage,
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { ShopLayout } from '../../components/layout';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { dbProducts } from '../../database';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { useRouter } from 'next/router';
import { useCart } from '../../store';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useCart();
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct((prevState) => ({ ...prevState, size }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3} mt={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}
          >
            <Box sx={{ width: { xs: '100%', sm: '75%', md: '100%' } }}>
              <ProductSlideshow images={product.images} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>

            <Typography variant="subtitle1" component="h1">
              ${product.price}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock}
              />
              <FormControl sx={{ width: '35%', marginTop: 2, marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tempCartProduct.size}
                  label="Size"
                  onChange={(e) => selectedSize(e.target.value as ISize)}
                  sx={{ textAlign: 'center' }}
                >
                  {product.sizes.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {product.inStock > 0 ? (
              <Button
                onClick={onAddProduct}
                color="secondary"
                className="circular-btn"
                sx={{ height: 40 }}
              >
                {tempCartProduct.size ? 'Add to cart' : 'Choose a size'}
              </Button>
            ) : (
              <Chip label="Sold out" color="error" variant="outlined" />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const data = await dbProducts.getAllProductSlugs();

  return {
    paths: data.map((item) => {
      const slug = item.slug;
      return {
        params: { slug },
      };
    }),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

export default ProductPage;
