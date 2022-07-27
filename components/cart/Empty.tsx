import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';

export const EmptyPage = () => {
  return (
    <>
      <Box
        display="flex"
        height="calc(100vh - 200px)"
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>The cart is empty.</Typography>
          <NextLink href="/" passHref>
            <Link typography="h4" color="secondary">
              Back
            </Link>
          </NextLink>
        </Box>
      </Box>
    </>
  );
};
