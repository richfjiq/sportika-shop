import { Box, CircularProgress, Typography } from '@mui/material';

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      height="calc(100svh - 140px)"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h2" fontWeight={200} sx={{ mb: 3 }}>
        Loading...
      </Typography>
      <CircularProgress thickness={2} />
    </Box>
  );
};
