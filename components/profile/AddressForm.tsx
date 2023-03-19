import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useAuth } from '../../store';
import { countries, getCodeCountry } from '../../utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  code: string;
  phone: string;
};

const AddressForm: FC<Props> = ({ open, onClose }) => {
  const {
    user,
    shippingAddress,
    loadingAddress,
    createUserAddress,
    updateUserAddress,
  } = useAuth();
  const [country, setCountry] = useState('Canada');
  const [code, setCode] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      zip: '',
      city: '',
      state: '',
      country: country,
      code: '',
      phone: '',
    },
    shouldUseNativeValidation: true,
  });

  useEffect(() => {
    const dialCode = getCodeCountry(country);
    setCode(dialCode ?? '+1');
  }, [country]);

  useEffect(() => {
    if (shippingAddress) {
      setCountry(shippingAddress.country);
      setValue('firstName', shippingAddress.firstName, {
        shouldValidate: true,
      });
      setValue('lastName', shippingAddress.lastName, { shouldValidate: true });
      setValue('address', shippingAddress.address, { shouldValidate: true });
      setValue('zip', shippingAddress.zip, { shouldValidate: true });
      setValue('city', shippingAddress.city, { shouldValidate: true });
      setValue('state', shippingAddress.state as string, {
        shouldValidate: true,
      });
      setValue('country', shippingAddress.country, { shouldValidate: true });
      setValue('code', shippingAddress.code, { shouldValidate: true });
      setValue('phone', shippingAddress.phone, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddress]);

  const onSubmitAddress = (data: FormData) => {
    if (!user) return;
    const addressData = {
      user: user._id,
      ...data,
      country,
      code,
    };
    if (shippingAddress) {
      updateUserAddress(addressData);
    } else {
      createUserAddress(addressData);
    }
    onClose();
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const title = shippingAddress ? 'Update Address' : 'Add Address';
  const buttonTitle = shippingAddress ? 'Update' : 'Save';

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            maxWidth: '85%',
            maxHeight: '85vh',
            overflow: 'scroll',
            padding: '20px',
            borderRadius: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
            }}
          >
            <Box>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: 18, sm: 20 },
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                {`${title}`}
              </Typography>
            </Box>
            <IconButton
              sx={{
                position: 'absolute',
                zIndex: 100,
                top: 0,
                right: 0,
                padding: 0,
              }}
              onClick={onClose}
            >
              <HighlightOffIcon />
            </IconButton>
          </Box>
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

              <Grid item xs={12} sm={8}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  {...register('address', {
                    required: 'Address is required.',
                    minLength: {
                      value: 10,
                      message: 'At least 10 characters.',
                    },
                  })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
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
                  label="State"
                  variant="outlined"
                  fullWidth
                  {...register('state', {
                    required: 'State is required.',
                    minLength: {
                      value: 4,
                      message: 'At least 4 characters.',
                    },
                  })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
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
                      minLength: {
                        value: 10,
                        message: 'At least 10 characters.',
                      },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-around', sm: 'center' },
                mt: { xs: 2, sm: 5 },
              }}
            >
              <Button
                color="error"
                className="circular-btn"
                size="large"
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  width: { xs: '100px', sm: '0' },
                }}
                onClick={onClose}
                disabled={loadingAddress}
              >
                Close
              </Button>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                sx={{ width: { xs: '100px', sm: '150px' } }}
              >
                {loadingAddress ? (
                  <CircularProgress thickness={2} color="info" size={75} />
                ) : (
                  `${buttonTitle}`
                )}
                {/* {`${buttonTitle}`} */}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddressForm;
