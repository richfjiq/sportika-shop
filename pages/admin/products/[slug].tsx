import { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { dbProducts } from '../../../database';
import { IProduct, ISize, IType } from '../../../interfaces';
import { AdminLayout } from '../../../components/layout';
import { useForm } from 'react-hook-form';
import { products } from '../../../utils';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: 'men' | 'women' | 'boys' | 'girls';
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const [type, setType] = useState('clothing');
  const [gender, setGender] = useState('men');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  const onDeleteTag = (tag: string) => {};

  const onSubmit = (form: FormData) => {
    console.log({ form });
  };

  return (
    <AdminLayout
      title={'Producto'}
      subTitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'This field is required.',
                minLength: { value: 2, message: 'At least 2 characters' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'This field is required.',
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventory"
              type="number"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'This field is required.',
                min: { value: 0, message: 'Minimal value zero.' },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Price"
              type="number"
              variant="outlined"
              inputProps={{
                step: 0.01,
              }}
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'This field is required.',
                min: { value: 0, message: 'Minimal value zero.' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 3 }} />

            <Grid
              mt={4}
              container
              //   xs={12}
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Grid item xs={12} sm={5}>
                <TextField
                  select
                  variant="outlined"
                  label="Type"
                  value={type}
                  {...register('type')}
                  onChange={(e) => setType(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  helperText="Select a type."
                >
                  <option key={'clothing'} value={'clothing'}>
                    Clothing
                  </option>
                  <option key={'shoes'} value={'shoes'}>
                    Shoes
                  </option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  select
                  variant="outlined"
                  label="Gender"
                  value={gender}
                  {...register('gender')}
                  onChange={(e) => setGender(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  helperText="Select a gender."
                >
                  {products.gender.map((val) => (
                    <option key={val} value={val}>
                      {capitalize(val)}
                    </option>
                  ))}
                  {/* <option key={'clothing'} value={'clothing'}>
                    Clothing
                  </option>
                  <option key={'shoes'} value={'shoes'}>
                    Shoes
                  </option> */}
                </TextField>
              </Grid>
            </Grid>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox />}
                  label={size}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'This field is required.',
                validate: (val) =>
                  val.trim().includes(' ')
                    ? 'Blank spaces not allowed'
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {product.tags.map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
              >
                Cargar imagen
              </Button>

              <Chip
                label="Es necesario al 2 imagenes"
                color="error"
                variant="filled"
              />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={`/products/${img}`}
                        alt={img}
                      />
                      <CardActions>
                        <Button fullWidth color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  const product = await dbProducts.getProductBySlug(slug.toString());

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
