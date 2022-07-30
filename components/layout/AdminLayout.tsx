import { FC, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { SideMenu } from '../ui';
import { useAuth } from '../../store';
import { AuthUser } from '../../store/auth/reducer';
import { AdminNavbar } from '../admin';
import { Box, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
  title: string;
  subTitle: string;
  icon?: ReactNode;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
  const { data, status } = useSession();
  const { loginNextAuth } = useAuth();

  useEffect(() => {
    if (status === 'authenticated') {
      loginNextAuth(data.user as AuthUser);
    }
  }, [data, status, loginNextAuth]);

  return (
    <>
      <AdminNavbar />

      {/* TODO: Sidebar */}
      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1536px',
          padding: '0px 30px',
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon} {title}
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>

      <footer>{/* TODO: Footer */}</footer>
    </>
  );
};
