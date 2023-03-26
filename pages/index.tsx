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
          flexDirection: { xs: 'column-reverse', sm: 'row' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '45%' },
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{ textAlign: { xs: 'center', sm: 'start' } }}
          >
            Looking for a new outfit?
          </Typography>
          <Typography
            sx={{ marginTop: '5px', textAlign: { xs: 'center', sm: 'start' } }}
          >
            All what you need in order to achieve your trainings goals
          </Typography>
          <NextLink href="/home" passHref>
            <Link
              sx={{
                marginTop: '40px',
                width: { xs: '60%', sm: '80%' },
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
            width: { xs: '100%', sm: '55%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: { xs: '20%', sm: '10%' },
          }}
        >
          <Box
            sx={{
              width: { xs: '80%', sm: '85%' },
              display: 'flex',
              alignItems: 'center',
            }}
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
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '55%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: { xs: '20%', sm: '10%' },
          }}
        >
          <Box
            sx={{
              width: { xs: '80%', sm: '85%' },
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
            width: { xs: '100%', sm: '45%' },
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', sm: 'flex-end' },
          }}
        >
          <Typography variant="h1" sx={{ textAlign: 'end' }}>
            Reinvent your impulse
          </Typography>
          <Typography
            sx={{ marginTop: '5px', textAlign: { xs: 'center', sm: 'end' } }}
          >
            Nothing exhausts and destroys the human body like physical
            inactivity
          </Typography>
          <NextLink href="/home" passHref>
            <Link
              sx={{
                marginTop: '40px',
                width: { xs: '60%', sm: '80%' },
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
          flexDirection: { xs: 'column-reverse', sm: 'row' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '45%' },
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{ textAlign: { xs: 'center', sm: 'start' } }}
          >
            Imagine your world
          </Typography>
          <Typography
            sx={{ marginTop: '5px', textAlign: { xs: 'center', sm: 'start' } }}
          >
            One step at a time, never give up
          </Typography>
          <NextLink href="/home" passHref>
            <Link
              sx={{
                marginTop: '40px',
                width: { xs: '60%', sm: '80%' },
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
            width: { xs: '100%', sm: '55%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: { xs: '20%', sm: '10%' },
          }}
        >
          <Box
            sx={{
              width: { xs: '80%', sm: '85%' },
              display: 'flex',
              alignItems: 'center',
            }}
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
