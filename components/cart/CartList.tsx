import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { FC } from 'react';
import { ICartProduct } from '../../interfaces';

import { useCart } from '../../store';
import { ItemCounter } from '../ui';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeProductFromCart } = useCart();

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    // product.quantity = newQuantityValue;
    updateCartQuantity(product, newQuantityValue);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          key={`${product.slug}-${product.size}`}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>

          <Grid item xs={7}>
            <Box>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }} variant="body1">
                {product.title}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 18 } }} variant="body1">
                Size: <strong>{product.size}</strong>
              </Typography>

              {/* Condicional */}
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  updatedQuantity={(value) =>
                    onNewCartQuantityValue(product, value)
                  }
                  maxValue={10}
                />
              ) : (
                <Typography sx={{ fontSize: { xs: 14, sm: 18 } }} variant="h6">
                  {product.quantity} {product.quantity === 1 ? 'item' : 'items'}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography
              sx={{ fontSize: { xs: 14, sm: 18 } }}
              variant="subtitle1"
            >
              ${product.price}
            </Typography>

            {/* Editable */}
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeProductFromCart(product)}
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
