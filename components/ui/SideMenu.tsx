import { useEffect, useRef, useState } from 'react';
import {
  AccountCircleOutlined,
  BoyOutlined,
  CategoryOutlined,
  DashboardOutlined,
  GirlOutlined,
  GroupOutlined,
  ListAltOutlined,
  LogoutOutlined,
  ManOutlined,
  SearchOutlined,
  VpnKeyOutlined,
  WomanOutlined,
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
      <Box sx={{ width: { xs: 180, sm: 250 }, paddingTop: 2 }}>
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
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItemButton>
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
