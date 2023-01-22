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
      <Slide
        easing="ease"
        duration={2000}
        prevArrow={<div />}
        nextArrow={<div />}
      >
        {images.map((image) => {
          return (
            <div className={styles['each-slide-home']} key={image}>
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '20px',
                }}
              ></div>
            </div>
          );
        })}
      </Slide>
    );
  }

  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        return (
          <div className={styles['each-slide']} key={image}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
