/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  ClearOutlined,
  MenuOutlined,
  PersonOutlineOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth, useCart, useUi } from '../../store';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';

export const Navbar = () => {
  const { setMenuOpen, setAutoFocus } = useUi();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter();
  const { asPath, push } = router;
  const { addCartFromCookies, numberOfItems, loadAddressFromCookies } =
    useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    loadAddressFromCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   if (token) {
  //     checkToken();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const cartFromCookies = Cookies.get('cart')
      ? JSON.parse(Cookies.get('cart')!)
      : [];

    addCartFromCookies(cartFromCookies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const setInputSearchFocused = () => {
    setMenuOpen();
    setAutoFocus();
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
    setIsSearchVisible(false);
  };

  return (
    <AppBar
      sx={{
        justifyContent: 'center',
        height: '100px',
      }}
    >
      <Toolbar
        sx={{
          width: { xl: '1536px' },
          margin: { xl: '0 auto' },
        }}
      >
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            mx: 'auto',
          }}
        >
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <img
                src="https://res.cloudinary.com/dlz1bhh8j/image/upload/v1672172814/sportika/umqc76hrwnckyxwwiy2z.png"
                alt="sportika_logo"
                height={60}
                width={110}
              />
            </Link>
          </NextLink>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <img
                src="https://res.cloudinary.com/dlz1bhh8j/image/upload/v1672172814/sportika/umqc76hrwnckyxwwiy2z.png"
                alt="sportika_logo"
                height={70}
                width={140}
              />
              {/* <Typography variant="h4">Sportika |</Typography> */}
              {/* <Typography sx={{ ml: 0.5 }}>| Shop</Typography> */}
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', md: 'flex' },
          }}
          className="fadeIn"
        >
          <NextLink href="/category/men" passHref>
            <Link mx={3}>
              <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
                <Typography variant="subtitle1">Men</Typography>
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link mx={3}>
              <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
                <Typography variant="subtitle1">Women</Typography>
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/boys" passHref>
            <Link mx={3}>
              <Button color={asPath === '/category/boys' ? 'primary' : 'info'}>
                <Typography variant="subtitle1">Boys</Typography>
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/girls" passHref>
            <Link mx={3}>
              <Button color={asPath === '/category/girls' ? 'primary' : 'info'}>
                <Typography variant="subtitle1">Girls</Typography>
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        {isSearchVisible ? (
          <Input
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type="text"
            placeholder="Search..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        <IconButton
          sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }}
          onClick={setInputSearchFocused}
        >
          <SearchOutlined />
        </IconButton>

        {/* <NextLink href={`/auth/login?p=${router.asPath}`} passHref>
          <Link> */}
        <IconButton
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() =>
            isLoggedIn
              ? navigateTo('/profile')
              : navigateTo(`/auth/login?p=${router.asPath}`)
          }
        >
          <PersonOutlineOutlined />
        </IconButton>
        {/* </Link>
        </NextLink> */}

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Badge
                badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <IconButton onClick={setMenuOpen}>
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
