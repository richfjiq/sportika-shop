import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  currentValue?: number;
  updateQuantity?: (action: string) => void;
}

export const ItemCounter: FC<Props> = ({
  currentValue = 1,
  updateQuantity = () => null,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => updateQuantity('remove')}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton onClick={() => updateQuantity('add')}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
