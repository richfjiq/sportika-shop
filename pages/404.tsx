import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../components/layout';

const Custom404 = () => {
  return (
    <ShopLayout
      title="Page not found"
      pageDescription="There is nothing to show"
    >
      <Box
        display="flex"
        height="calc(100vh - 200px)"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: { xs: 50, sm: 100 },
            fontWeight: 10,
          }}
        >
          404
        </Typography>
        <Typography sx={{ mt: 3 }} variant="h6">
          Page not found
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
