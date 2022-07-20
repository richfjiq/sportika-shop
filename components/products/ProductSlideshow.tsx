import { Grid } from '@mui/material';
import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from './ProductSlideshow.module.css';

interface Props {
  images: string[];
  fromHome?: boolean;
}

export const ProductSlideshow: FC<Props> = ({ images, fromHome }) => {
  if (fromHome) {
    return (
      <Grid
        container
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        justifyContent="center"
      >
        <Grid item sm={8} md={7} lg={7}>
          <Slide
            easing="ease"
            duration={2000}
            prevArrow={<div />}
            nextArrow={<div />}
          >
            {images.map((image) => {
              const url = `/products/${image}`;

              return (
                <div className={styles['each-slide-home']} key={image}>
                  <div
                    style={{
                      backgroundImage: `url(${url})`,
                      backgroundSize: 'cover',
                      borderRadius: 20,
                    }}
                  ></div>
                </div>
              );
            })}
          </Slide>
        </Grid>
      </Grid>
    );
  }

  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        const url = `/products/${image}`;

        return (
          <div className={styles['each-slide']} key={image}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
