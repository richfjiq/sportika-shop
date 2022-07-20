import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { Navbar, SideMenu } from '../ui';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { ProductSlideshow } from '../products';

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  fromHome?: boolean;
}

const homeImages = [
  '/nike_home_image.jpg',
  '/adidas_home_image.jpg',
  '/reebok_home_image.jpg',
];

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
  fromHome,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <Navbar />

      {/* TODO: Sidebar */}
      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1536px',
          padding: '0px 30px',
        }}
      >
        {fromHome && <ProductSlideshow images={homeImages} fromHome={true} />}
        {children}
      </main>

      <footer>{/* TODO: Footer */}</footer>
    </>
  );
};
