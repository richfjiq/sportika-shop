import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';

export const EmptyPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="row"
      alignItems="center"
      sx={{ height: { xs: '100svh', sm: 'calc(100svh - (80px + 380px))' } }}
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
  );
};
