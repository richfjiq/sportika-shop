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
          height="calc(100vh - 200px)"
          margin="80px auto"
          maxWidth="1536px"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
