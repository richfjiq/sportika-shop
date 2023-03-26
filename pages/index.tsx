import { Box, Button, Link, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';

import styles from './index.module.css';
import woman from '../public/images/woman.jpg';
import man from '../public/images/man.jpg';
import kid from '../public/images/kid.jpg';

import { ShopLayout } from '../components/layout';

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={'Sportika-Shop - Home'}
      pageDescription={
        'Find the shoes and clothes for practicing your favorite sport.'
      }
      fromHome={true}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          marginBottom: '5vh',
        }}
      >
        <Box
          sx={{
            width: '45%',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1">Looking for a new outfit?</Typography>
          <Typography sx={{ marginTop: '5px' }}>
            All what you need in order to achieve your trainings goals
          </Typography>
          <NextLink href="/home" passHref>
            <Link
              sx={{
                marginTop: '40px',
                width: '80%',
                fontSize: '20px',
                height: '60px',
              }}
              className={styles.customButton}
            >
              Buy Now
            </Link>
          </NextLink>
        </Box>
        <Box
          sx={{
            width: '55%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '10%',
          }}
        >
          <Box
            sx={{ width: '85%', display: 'flex', alignItems: 'center' }}
            className={styles.cardContainer}
          >
            <Image src={woman} alt="woman" style={{ borderRadius: '20px' }} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          marginBottom: '5vh',
        }}
      >
        <Box
          sx={{
            width: '55%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '10%',
          }}
        >
          <Box
            sx={{
              width: '85%',
              display: 'flex',
              alignItems: 'center',
            }}
            className={styles.cardContainer2}
          >
            <Image src={man} alt="woman" style={{ borderRadius: '20px' }} />
          </Box>
        </Box>
        <Box
          sx={{
            width: '45%',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Typography variant="h1">Reinvent your impulse</Typography>
          <Typography sx={{ marginTop: '5px', textAlign: 'end' }}>
            Nothing exhausts and destroys the human body like physical
            inactivity
          </Typography>
          <NextLink href="/home" passHref>
            <Link
              sx={{
                marginTop: '40px',
                width: '80%',
                fontSize: '20px',
                height: '60px',
              }}
              className={styles.customButton}
            >
              Buy Now
            </Link>
          </NextLink>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '45%',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1">Imagine your world</Typography>
          <Typography sx={{ marginTop: '5px' }}>
            One step at a time, never give up
          </Typography>
          <NextLink href="/home" passHref>
            <Link
              sx={{
                marginTop: '40px',
                width: '80%',
                fontSize: '20px',
                height: '60px',
              }}
              className={styles.customButton}
            >
              Buy Now
            </Link>
          </NextLink>
        </Box>
        <Box
          sx={{
            width: '55%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '10%',
          }}
        >
          <Box
            sx={{ width: '85%', display: 'flex', alignItems: 'center' }}
            className={styles.cardContainer}
          >
            <Image src={kid} alt="woman" style={{ borderRadius: '20px' }} />
          </Box>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default HomePage;
