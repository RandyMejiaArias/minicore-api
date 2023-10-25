import { Schema, model } from 'mongoose';

const saleSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    saleDetails: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          default: 0.0
        }
      }
    ],
    date: {
      type: Date
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('Sale', saleSchema);