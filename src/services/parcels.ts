import { Model } from 'mongoose';
import { Parcel } from '../models/parcel';

interface Filters {
  name?: string;
  _id?: string | { $in: string[] };
}

/**
 * @class ParcelsService
 * @param {Model<Parcel>} model
 */
export default class ParcelsService {
  constructor(private readonly model: Model<Parcel>) {}

  /**
   * Get all parcels
   * 
   * @param {Filters} [filters]
   * @return {*}  {Promise<Parcel[]>}
   * @memberof ParcelsService
   */
  async getAll(filters?: Filters): Promise<Parcel[]> {
    return this.model.find(filters);
  }

  /**
   * Get parcel by id
   * 
   * @param {string} id
   * @return {*}  {Promise<Parcel>}
   * @memberof ParcelsService
   */
  async getById(id: string): Promise<Parcel> {
    return this.model.findById(id);
  }

  /**
   * Create parcel
   * 
   * @param {Parcel} truckData
   * @return {*}  {Promise<Parcel>}
   * @memberof ParcelsService
   */
  async createParcel(truckData: Parcel): Promise<Parcel> {
    const truck = new this.model(truckData);
    return truck.save();
  }
}