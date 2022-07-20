import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layout';

const AddressPage = () => {
  return (
    <ShopLayout title="Address" pageDescription="Confirm address">
      <Typography variant="h1" component="h1" mb={3}>
        Address
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Address" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Address 2" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Zip Code" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            // id="outlined-select-currency"
            select
            variant="outlined"
            label="Country"
            value={1}
            fullWidth
          >
            <MenuItem value={1}>Costa Rica</MenuItem>
            <MenuItem value={2}>Honduras</MenuItem>
            <MenuItem value={3}>El Salvador</MenuItem>
            <MenuItem value={4}>Mexico</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <Button color="secondary" className="circular-btn" size="large">
          Review Order
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;
