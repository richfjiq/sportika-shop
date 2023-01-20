import NextLink from 'next/link';
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { useCart, useUi } from '../../store';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export const AdminNavbar = () => {
  const { setMenuOpen } = useUi();
  const { addCartFromCookies, loadAddressFromCookies } = useCart();

  useEffect(() => {
    loadAddressFromCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cartFromCookies = Cookies.get('cart')
      ? JSON.parse(Cookies.get('cart')!)
      : [];

    addCartFromCookies(cartFromCookies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar
      sx={{
        justifyContent: 'center',
      }}
    >
      <Toolbar
        sx={{
          width: { xl: '1240px' },
          margin: { xl: '0 auto' },
        }}
      >
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, mx: 'auto' }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h5">Sportika</Typography>
            </Link>
          </NextLink>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h4">Sportika |</Typography>
              <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton onClick={setMenuOpen}>
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
