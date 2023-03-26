/* eslint-disable @next/next/no-img-element */
import LinkNext from 'next/link';
import { Box, Grid, Link, Typography } from '@mui/material';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import googleBadge from '../../public/images/google-play-badge.png';

const Footer = () => {
  return (
    <>
      <Grid container sx={{ marginTop: '70px', width: '100%' }}>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LinkNext href="/" passHref>
            <Link sx={{ width: { xs: '40%', sm: '50%' } }}>
              <img
                src="https://res.cloudinary.com/dlz1bhh8j/image/upload/v1672172814/sportika/umqc76hrwnckyxwwiy2z.png"
                alt="sportika_logo"
                style={{ cursor: 'pointer', width: '100%' }}
              />
            </Link>
          </LinkNext>
          <Typography sx={{ fontWeight: '400', textAlign: 'center' }}>
            Lorem ipsum dolor sit amet.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            padding: '10px',
          }}
        >
          <Typography
            sx={{
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            Company
          </Typography>
          <Typography
            sx={{ fontWeight: '400', textAlign: 'center', marginBottom: '5px' }}
          >
            About
          </Typography>
          <Typography
            sx={{ fontWeight: '400', textAlign: 'center', marginBottom: '5px' }}
          >
            Contact
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            padding: '10px',
          }}
        >
          <Typography
            sx={{
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            Resources
          </Typography>
          <Typography
            sx={{ fontWeight: '400', textAlign: 'center', marginBottom: '5px' }}
          >
            Privacy Policy
          </Typography>
          <Typography
            sx={{ fontWeight: '400', textAlign: 'center', marginBottom: '5px' }}
          >
            Terms of service
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: '600' }}>Download</Typography>
          <LinkNext
            href="https://play.google.com/store/apps/details?id=com.ricardojs.sportika"
            target="_blank"
            passHref
          >
            <Link target="_blank" rel="noreferrer">
              <Image
                src={googleBadge}
                alt="google_badge"
                width={100}
                height={40}
              />
            </Link>
          </LinkNext>
        </Grid>
      </Grid>
      <Box>
        <Typography
          sx={{ fontWeight: '400', textAlign: 'center', marginTop: '20px' }}
        >
          Copyright @Sportika 2023. All Rights Reserved.
        </Typography>
        <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </Box>
      </Box>
    </>
  );
};

export default Footer;
