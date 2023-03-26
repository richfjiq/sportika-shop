import { FC, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { SideMenu } from '../ui';
import { useAuth } from '../../store';
import { AuthUser } from '../../store/auth/reducer';
import { AdminNavbar } from '../admin';
import { Box, Typography } from '@mui/material';
import Footer from '../ui/Footer';

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

      <SideMenu />

      <main>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            margin: '80px auto 40px',
            maxWidth: '1240px',
            padding: { xs: '0 16px', sm: '0 24px' },
          }}
        >
          <Typography variant="h1" component="h1">
            {icon} {title}
          </Typography>
          <Typography variant="h2" sx={{ my: 1 }}>
            {subTitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>

      <Box
        sx={{
          margin: '50px auto',
          maxWidth: '1240px',
          padding: { xs: '0 16px', sm: '0' },
        }}
      >
        <Footer />
      </Box>
    </>
  );
};
