import { FC, useState } from 'react';
import NextLink from 'next/link';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Chip,
} from '@mui/material';

import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
      <Grid
        item
        xs={6}
        sm={4}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          transform: isHovered
            ? 'translate(0px, -5px )'
            : 'translate(0px, 0px)',
          display: isImageLoaded ? 'block' : 'none',
        }}
      >
        <Card>
          <CardActionArea>
            {product.inStock === 0 && (
              <Chip
                color="primary"
                label="Out of stock"
                sx={{ position: 'absolute', zIndex: 10, top: 10, right: 10 }}
              />
            )}

            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.title}
              className="fadeIn"
              onLoad={() => setIsImageLoaded(true)}
              sx={{ aspectRatio: '1/1' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 3,
                left: 5,
              }}
            >
              <Typography
                sx={{ backgroundColor: 'white', px: 1, borderRadius: 1 }}
              >
                ${product.price}
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
        <Box sx={{ mt: 1 }} className="fadeIn">
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {product.title}
          </Typography>
        </Box>
      </Grid>
    </NextLink>
  );
};
