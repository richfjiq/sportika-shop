import { useState } from 'react';
import {
  AccountCircleOutlined,
  BoyOutlined,
  DashboardOutlined,
  GirlOutlined,
  GroupOutlined,
  ListAltOutlined,
  LogoutOutlined,
  ManOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  VpnKeyOutlined,
  WomanOutlined,
  BorderAllOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useRouter } from 'next/router';

import { useAuth, useUi } from '../../store';

export const SideMenu = () => {
  const router = useRouter();
  const { isLoggedIn, user, userLogout, logoutNextAuth } = useAuth();
  const { isMenuOpen, setMenuOpen, isFocused } = useUi();
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    setMenuOpen();
    router.push(url);
  };

  const onLogout = () => {
    userLogout();
    router.reload();
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={setMenuOpen}
    >
      <Box sx={{ width: { xs: '50vw', sm: 250 } }}>
        <List>
          <ListItem>
            <Input
              autoFocus={isFocused}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItemButton onClick={() => navigateTo('/profile')}>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo('/orders/history')}>
                <ListItemIcon>
                  <ListAltOutlined />
                </ListItemIcon>
                <ListItemText primary={'Orders'} />
              </ListItemButton>
            </>
          )}

          <ListItemButton
            onClick={() => navigateTo('/home')}
            sx={{ display: { md: 'none' } }}
          >
            <ListItemIcon>
              <BorderAllOutlined />
            </ListItemIcon>
            <ListItemText primary={'All'} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo('/category/men')}
            sx={{ display: { md: 'none' } }}
          >
            <ListItemIcon>
              <ManOutlined />
            </ListItemIcon>
            <ListItemText primary={'Men'} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo('/category/women')}
            sx={{ display: { md: 'none' } }}
          >
            <ListItemIcon>
              <WomanOutlined />
            </ListItemIcon>
            <ListItemText primary={'Women'} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo('/category/boys')}
            sx={{ display: { md: 'none' } }}
          >
            <ListItemIcon>
              <BoyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Boys'} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo('/category/girls')}
            sx={{ display: { md: 'none' } }}
          >
            <ListItemIcon>
              <GirlOutlined />
            </ListItemIcon>
            <ListItemText primary={'Girls'} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo('/cart')}
            sx={{ display: { sm: 'none' } }}
          >
            <ListItemIcon>
              <ShoppingCartOutlined />
            </ListItemIcon>
            <ListItemText primary={'Cart'} />
          </ListItemButton>

          {isLoggedIn ? (
            <ListItemButton onClick={logoutNextAuth}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary={'Log Out'} />
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Log In'} />
            </ListItemButton>
          )}

          {isLoggedIn && user?.role === 'admin' && (
            <>
              <Divider />

              <ListSubheader>Admin Panel</ListSubheader>

              <ListItemButton onClick={() => navigateTo('/admin')}>
                <ListItemIcon>
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo('/admin/products')}>
                <ListItemIcon>
                  <ListAltOutlined />
                </ListItemIcon>
                <ListItemText primary={'Products'} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo('/admin/orders')}>
                <ListItemIcon>
                  <ListAltOutlined />
                </ListItemIcon>
                <ListItemText primary={'Orders'} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo('/admin/users')}>
                <ListItemIcon>
                  <GroupOutlined />
                </ListItemIcon>
                <ListItemText primary={'Users'} />
              </ListItemButton>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
