import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useAuth } from '../../store';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  currenPassword: string;
};

interface Passwords extends Object {
  currentPassword: boolean;
}

const AccountForm: FC<Props> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState<Passwords>({
    currentPassword: false,
  });
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      currenPassword: '',
    },
    shouldUseNativeValidation: true,
  });

  const passwordVisible = (key: string) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [key]: !showPassword[key as keyof Passwords],
    }));
  };

  useEffect(() => {
    if (user) {
      setValue('name', user.name, {
        shouldValidate: true,
      });
      setValue('email', user.email, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmitAddress = (data: FormData) => {
    console.log({ data });
    const userData = {};
    // createUserAddress(shippingAddress);
    onClose();
  };

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
            maxWidth: { xs: '340px', sm: '400px', lg: '450px' },
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
                  mb: 4,
                }}
              >
                Update Account Data
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
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...register('name', {
                    required: 'Name is required.',
                    minLength: { value: 2, message: 'At least 2 characters.' },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  {...register('email', {
                    required: 'Email is required.',
                    minLength: { value: 2, message: 'At least 2 characters.' },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Current Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword.currentPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => passwordVisible('currentPassword')}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword.currentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Current Password"
                    {...register('currenPassword', {
                      required: 'Current Password is required.',
                      minLength: {
                        value: 6,
                        message: 'At least 6 characters.',
                      },
                    })}
                    error={!!errors.currenPassword}
                  />
                  <FormHelperText id="outlined-weight-helper-text" error>
                    {errors.currenPassword?.message}
                  </FormHelperText>
                </FormControl>
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
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default AccountForm;
