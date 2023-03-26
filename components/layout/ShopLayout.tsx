import { FC, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { Navbar, SideMenu } from '../ui';
import { ProductSlideshow } from '../products';
import { useAuth } from '../../store';
import { AuthUser } from '../../store/auth/reducer';
import { Box } from '@mui/material';
import Footer from '../ui/Footer';

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  fromHome?: boolean;
}

const homeImages = [
  'https://res.cloudinary.com/dlz1bhh8j/image/upload/v1659375333/sportika/ucfgfj3qylagifaen4hc.jpg',
  'https://res.cloudinary.com/dlz1bhh8j/image/upload/v1659369404/sportika/m7vioo1musslcgufkd8j.jpg',
  'https://res.cloudinary.com/dlz1bhh8j/image/upload/v1659369429/sportika/ikofwucxcwmnsdwqh1yl.jpg',
  'https://res.cloudinary.com/dlz1bhh8j/image/upload/v1659369395/sportika/nowdls6yuyxi8vgs4jmc.jpg',
  'https://res.cloudinary.com/dlz1bhh8j/image/upload/v1659369405/sportika/wbwribwbmpkh27xharpt.jpg',
  'https://res.cloudinary.com/dlz1bhh8j/image/upload/v1659369400/sportika/si8bva8jfhgqsvess2lb.jpg',
];

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
  fromHome,
}) => {
  const { data, status } = useSession();
  const { loginNextAuth, getUserAddress } = useAuth();

  useEffect(() => {
    if (status === 'authenticated') {
      loginNextAuth(data.user as AuthUser);
    }
  }, [data, status, loginNextAuth]);

  useEffect(() => {
    if (status === 'authenticated') {
      const user = data.user as AuthUser;
      getUserAddress(user._id as string);
    }
  }, [data?.user, getUserAddress, status]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <main>
        <Navbar />

        <SideMenu />
        <Box
          sx={{
            margin: '80px auto 40px',
            maxWidth: '1240px',
            padding: { xs: '0 16px', sm: '15px 24px' },
            minHeight: { xs: '100svh', sm: 'calc(100svh - (80px + 340px))' },
            height: '100%',
          }}
        >
          {/* {fromHome ? (
            <Box
              sx={{
                margin: '0px auto 20px',
              }}
            >
              <ProductSlideshow images={homeImages} fromHome={true} />
            </Box>
          ) : null} */}

          {children}
        </Box>
      </main>

      <Box
        sx={{
          margin: '50px auto',
          maxWidth: '1240px',
          width: '100%',
          padding: { xs: '0 16px', sm: 'auto 0' },
        }}
      >
        <Footer />
      </Box>
    </>
  );
};
