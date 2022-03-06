import { Schema, model, Document } from 'mongoose';

export interface Parcel extends Document {
  title: string;
  weight: number;
}

const parcelSchema = new Schema<Parcel>({
  title: { type: String, required: true} ,
  weight: { type: Number, required: true },
}, { timestamps: true });

export default model<Parcel>('Parcel', parcelSchema);