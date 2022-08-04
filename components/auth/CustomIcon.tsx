import { FC } from 'react';
import { CardMedia, Icon } from '@mui/material';

interface Props {
  logo: string;
}

export const CustomIcon: FC<Props> = ({ logo }) => {
  return (
    <Icon>
      <CardMedia component="img" image={`/images/${logo}_logo.png`} />
    </Icon>
  );
};
