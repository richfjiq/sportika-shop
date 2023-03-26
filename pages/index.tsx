import { Box, Button, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';

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
        }}
      >
        <Box sx={{ width: '45%', border: '2px solid green', padding: '10px' }}>
          <Typography variant="h1">Looking for a new outfit?</Typography>
          <Button>Buy Now</Button>
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
        }}
      >
        <Box
          sx={{
            width: '55%',
            border: '2px solid pink',
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
        <Box sx={{ width: '45%', border: '2px solid pink' }}></Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Box sx={{ width: '45%', border: '2px solid green' }}></Box>
        <Box
          sx={{
            width: '55%',
            border: '2px solid pink',
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
