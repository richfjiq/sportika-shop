import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { countries, getCodeCountry } from '../../utils';
import { useCart } from '../../store';
import { ShopLayout } from '../../components/layout';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  code: string;
  phone: string;
};

const AddressPage = () => {
  const router = useRouter();
  const { addAddress } = useCart();
  const [country, setCountry] = useState('Canada');
  const [code, setCode] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: Cookies.get('firstName') || '',
      lastName: Cookies.get('lastName') || '',
      address: Cookies.get('address') || '',
      address2: Cookies.get('address2') || '',
      zip: Cookies.get('zip') || '',
      city: Cookies.get('city') || '',
      country,
      code,
      phone: Cookies.get('phone') || '',
    },
    shouldUseNativeValidation: true,
  });

  useEffect(() => {
    const dialCode = getCodeCountry(country);
    setCode(dialCode ?? '+1');
  }, [country]);

  useEffect(() => {
    const countryFromCookies = Cookies.get('country');
    if (countryFromCookies) {
      setCountry(countryFromCookies);
    }
  }, []);

  const onSubmitAddress = (data: FormData) => {
    const shippingAddress = {
      address: {
        ...data,
      },
      country,
      code,
    };
    addAddress(shippingAddress);
    router.push('/checkout/summary');
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  return (
    <ShopLayout title="Address" pageDescription="Confirm address">
      <Typography variant="h1" component="h1" mb={3}>
        Address
      </Typography>

      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              {...register('firstName', {
                required: 'Name is required.',
                minLength: { value: 2, message: 'At least 2 characters.' },
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Last name"
              variant="outlined"
              fullWidth
              {...register('lastName', {
                required: 'Last name is required.',
                minLength: { value: 2, message: 'At least 2 characters.' },
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              {...register('address', {
                required: 'Address is required.',
                minLength: { value: 10, message: 'At least 10 characters.' },
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2"
              variant="outlined"
              fullWidth
              {...register('address2')}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              variant="outlined"
              fullWidth
              {...register('zip', {
                required: 'Zip code is required.',
                minLength: { value: 5, message: 'At least 5 characters.' },
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              {...register('city', {
                required: 'City is required.',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              variant="outlined"
              label="Country"
              value={country}
              {...register('country')}
              onChange={handleCountryChange}
              SelectProps={{
                native: true,
              }}
              fullWidth
              helperText="Please select a country"
            >
              {countries.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} display="flex" flexDirection="row">
            <Grid item xs={4} sm={4}>
              <TextField
                label="Code"
                variant="outlined"
                value={code}
                fullWidth
                {...register('code')}
                disabled
              />
            </Grid>
            <Grid item xs={8} sm={8}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                {...register('phone', {
                  required: 'Phone is required.',
                  minLength: { value: 10, message: 'At least 10 characters.' },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Review Order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = '' } = req.cookies;
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
