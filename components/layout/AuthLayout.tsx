import { Box } from '@mui/material';
import Head from 'next/head';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            margin: '80px auto 40px',
            maxWidth: '1240px',
            padding: { xs: '0 16px', sm: '0 24px' },
          }}
        >
          {children}
        </Box>
      </main>
    </>
  );
};
