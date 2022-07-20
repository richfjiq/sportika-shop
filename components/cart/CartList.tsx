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

import { initialData } from '../../database';
import { ItemCounter } from '../ui';

const productsInCart = [
  initialData.initialData.products[0],
  initialData.initialData.products[1],
  initialData.initialData.products[2],
];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
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
                Size: <strong>M</strong>
              </Typography>

              {/* Condicional */}
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography sx={{ fontSize: { xs: 14, sm: 18 } }} variant="h6">
                  3 items
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
              <Button variant="text" color="secondary">
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
