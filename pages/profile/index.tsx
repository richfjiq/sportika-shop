import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { ShopLayout } from '../../components/layout';
import {
  AccountForm,
  AddressForm,
  PasswordForm,
} from '../../components/profile';
import { Loading } from '../../components/ui';
import { useAuth } from '../../store';

const Profile = () => {
  const { user, shippingAddress, loadingAddress } = useAuth();
  const [addressModal, setAddressModal] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState(false);

  const handleModal = () => setAddressModal((prev) => !prev);
  const handleAccountModal = () => setAccountModal((prev) => !prev);
  const handlePasswordModal = () => setPasswordForm((prev) => !prev);

  const welcome = `Hi ${user?.name}, welcome and have a nice buying`;

  return (
    <ShopLayout title={'Profile'} pageDescription={'User Profile'}>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          mb: 2,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'semi-bold',
        }}
      >
        {welcome}
      </Typography>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          display="flex"
          justifyContent="center"
          spacing={1}
          sx={{ maxWidth: '1240px' }}
        >
          <Grid item xs={12} sm={10} md={7}>
            <Card className="summary-card">
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: { xs: 16, sm: 20 } }}
                  >
                    Delivery address
                  </Typography>

                  {shippingAddress ? (
                    <div onClick={handleModal}>
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          fontSize: 16,
                          color: 'blue',
                        }}
                      >
                        Edit
                      </Typography>
                    </div>
                  ) : null}
                </Box>

                {shippingAddress ? (
                  <>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.firstName} ${shippingAddress.lastName}`}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.address}`}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zip}`}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.country}`}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                      {`${shippingAddress.code} ${shippingAddress.phone}`}
                    </Typography>
                  </>
                ) : (
                  <Box
                    sx={{
                      my: 5,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      color="secondary"
                      className="circular-btn"
                      size="large"
                      onClick={handleModal}
                    >
                      Add Address
                    </Button>
                  </Box>
                )}

                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="space-between">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: { xs: 16, sm: 20 } }}
                  >
                    User Data
                  </Typography>

                  {user?.type === 'credentials' && (
                    <div onClick={handleAccountModal}>
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          fontSize: 16,
                          color: 'blue',
                        }}
                      >
                        Edit
                      </Typography>
                    </div>
                  )}
                </Box>

                <Typography
                  sx={{ fontSize: { xs: 14, sm: 18 }, fontWeight: '500' }}
                >
                  Name
                </Typography>
                <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                  {`${user?.name}`}
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: 14, sm: 18 }, fontWeight: '500' }}
                >
                  Email
                </Typography>
                <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                  {`${user?.email}`}
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="space-between">
                  <Typography
                    sx={{ fontSize: { xs: 14, sm: 18 }, fontWeight: '500' }}
                  >
                    Password
                  </Typography>

                  {user?.type === 'credentials' && (
                    <div onClick={handlePasswordModal}>
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          fontSize: 16,
                          color: 'blue',
                        }}
                      >
                        Edit
                      </Typography>
                    </div>
                  )}
                </Box>

                <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>
                  **********
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <AddressForm open={addressModal} onClose={handleModal} />
      <AccountForm open={accountModal} onClose={handleAccountModal} />
      <PasswordForm open={passwordForm} onClose={handlePasswordModal} />
      <Loading visible={loadingAddress} />
    </ShopLayout>
  );
};

export default Profile;
