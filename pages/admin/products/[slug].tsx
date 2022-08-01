import { FC, KeyboardEvent, useEffect, useState } from 'react';
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
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import { dbProducts } from '../../../database';
import { FormProduct, IProduct, ISize, IType } from '../../../interfaces';
import { AdminLayout } from '../../../components/layout';
import { useForm } from 'react-hook-form';
import { products } from '../../../utils';
import { useAdmin } from '../../../store/admin';
import { Product } from '../../../models';
import { useRouter } from 'next/router';

interface Props {
  product: IProduct;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProductAdminPage: FC<Props> = ({ product }) => {
  const { loading, updateProduct, createProduct } = useAdmin();
  const router = useRouter();
  const [type, setType] = useState('clothing');
  const [gender, setGender] = useState('men');
  const [sizes, setSizes] = useState<string[]>([]);
  const [newTagValue, setNewTagValue] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: product,
  });

  useEffect(() => {
    if (product.sizes) {
      setSizes(product.sizes);
    }
  }, [product]);

  useEffect(() => {
    if (product._id) {
      const subscription = watch((value, { name, type }) => {
        if (name === 'title') {
          const newSlug =
            value.title
              ?.trim()
              .replaceAll(' ', '_')
              .replaceAll("'", '')
              .toLocaleLowerCase() || '';

          setValue('slug', newSlug, { shouldValidate: true });
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [watch, setValue, product]);

  const handleSizeChange = (event: SelectChangeEvent<typeof sizes>) => {
    const value = event.target.value;
    setSizes(typeof value === 'string' ? value.split(',') : value);
  };

  const onNewTag = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      const newTag = newTagValue.trim().toLocaleLowerCase();
      setNewTagValue('');
      const currentTags = getValues('tags');
      if (currentTags.includes(newTag)) return;
      currentTags.push(newTag);
    }
  };

  const onDeleteTag = (tag: string) => {
    setValue(
      'tags',
      getValues('tags').filter((val) => val !== tag),
      { shouldValidate: true }
    );
  };

  const onSubmit = (form: FormProduct) => {
    if (form.images.length < 2) return alert('At least 2 images.');

    if (!form._id) {
      createProduct(form);
      router.replace(`/admin/products/${form.slug}`);
    }

    if (form._id) {
      updateProduct(form);
    }
  };

  return (
    <AdminLayout
      title={'Product'}
      subTitle={`Edit: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mt: 1, mb: 3 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={loading}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
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
              sx={{ mb: 3 }}
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
              sx={{ mb: 3 }}
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
                  onChange={(e) => {
                    setType(e.target.value);
                    setSizes([]);
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  helperText="Select a type."
                  // onClickCapture={() => setSizes([])}
                >
                  <option key={'clothing'} value={'clothing'}>
                    Clothing
                  </option>
                  <option key={'shoes'} value={'shoes'}>
                    Shoes
                  </option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5} sx={{ mt: { xs: 4, sm: 0 } }}>
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
                </TextField>
              </Grid>
            </Grid>

            <Grid
              container
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: { xs: 3, sm: 3 } }}
            >
              <Grid item display="flex" flex={1} xs={12}>
                <FormControl sx={{ m: 1, flex: 1 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Sizes
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={sizes}
                    {...register('sizes', {
                      required: 'This field is required.',
                    })}
                    error={!!errors.sizes}
                    // helperText={errors.sizes?.message}
                    onChange={handleSizeChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {type === 'clothing'
                      ? products.clothesSizes.map((val) => (
                          <MenuItem key={val} value={val}>
                            <Checkbox checked={sizes.indexOf(val) > -1} />
                            <ListItemText primary={val} />
                          </MenuItem>
                        ))
                      : products.shoesSizes.map((val) => (
                          <MenuItem key={val} value={val}>
                            <Checkbox checked={sizes.indexOf(val) > -1} />
                            <ListItemText primary={val} />
                          </MenuItem>
                        ))}
                  </Select>
                  {errors.sizes && (
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, mt: 1 }}
                      color="error"
                    >
                      {errors.sizes.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="outlined"
              fullWidth
              defaultValue={getValues('slug')}
              sx={{ mb: 3, mt: { xs: 2, sm: 0 } }}
              {...register('slug', {
                required: 'This field is required.',
                validate: (val) =>
                  val.trim().includes(' ')
                    ? 'Use "_" instead of blank spaces.'
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Tags"
              variant="outlined"
              fullWidth
              value={newTagValue}
              sx={{ mb: 1, mt: { xs: 3, sm: 0 } }}
              helperText="Press [space key] to add."
              onChange={(event) => setNewTagValue(event.target.value)}
              onKeyDown={onNewTag}
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
              {getValues('tags').map((tag) => {
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
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
              >
                Load Image
              </Button>

              <Chip
                label="It's necessary at least 2 images."
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
                          Remove
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

  let product: IProduct | null;

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = ['img1.jpg', 'img2.jpg'];
    product = tempProduct;
  } else {
    product = await await dbProducts.getProductBySlug(slug.toString());
  }

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
