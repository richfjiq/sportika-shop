import { FC, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { Navbar, SideMenu } from '../ui';
import { ProductSlideshow } from '../products';
import { useAuth } from '../../store';
import { AuthUser } from '../../store/auth/reducer';

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
  const { data, status } = useSession();
  const { loginNextAuth } = useAuth();

  useEffect(() => {
    if (status === 'authenticated') {
      loginNextAuth(data.user as AuthUser);
    }
  }, [data, status, loginNextAuth]);

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
