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
  currenPassword: string;
  newPassword: string;
  repeatPassword: string;
};

interface Passwords extends Object {
  currentPassword: boolean;
  newPassword: boolean;
  repeatPassword: boolean;
}

const PasswordForm: FC<Props> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState<Passwords>({
    currentPassword: false,
    newPassword: false,
    repeatPassword: false,
  });
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      currenPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    shouldUseNativeValidation: true,
  });

  const passwordVisible = (key: string) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [key]: !showPassword[key as keyof Passwords],
    }));
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmitAddress = (data: FormData) => {
    console.log({ data });
    const userAccount = {};
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
                Update Password
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

              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword.newPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => passwordVisible('newPassword')}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword.newPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                    {...register('newPassword', {
                      required: 'New Password is required.',
                      minLength: {
                        value: 6,
                        message: 'At least 6 characters.',
                      },
                    })}
                    error={!!errors.newPassword}
                  />
                  <FormHelperText id="outlined-weight-helper-text" error>
                    {errors.newPassword?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Repeat Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword.repeatPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => passwordVisible('repeatPassword')}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword.repeatPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Repeat Password"
                    {...register('repeatPassword', {
                      required: 'Repeat Password is required.',
                      minLength: {
                        value: 6,
                        message: 'At least 6 characters.',
                      },
                    })}
                    error={!!errors.repeatPassword}
                  />
                  <FormHelperText id="outlined-weight-helper-text" error>
                    {errors.repeatPassword?.message}
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

export default PasswordForm;
