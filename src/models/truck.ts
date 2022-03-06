import { Schema, model, Document } from 'mongoose';
import type { Parcel } from './parcel';

export interface Truck extends Document {
  name: string;
  weight?: number;
  count?: number
  parcels?: Parcel[];
}

const truckSchema = new Schema<Truck>({
  name: { type: String, required: true },
  weight: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  parcels: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Parcel',
    },
    title: { type: String },
    weight: { type: Number  },
  }]
}, { timestamps: true });


export default model<Truck>('Truck', truckSchema);