import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    price: {
      type: Number,
      default: 0.0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('Product', productSchema);