import mongoose, { model, Model, Schema } from 'mongoose';

import { IAddress } from '../interfaces';

const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  address2: { type: String },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  code: { type: String, required: true },
  phone: { type: String, required: true },
});

const Address: Model<IAddress> =
  mongoose.models.Address ?? model('Address', addressSchema);

export default Address;
