import { Model } from 'mongoose';
import { Truck } from '../models/truck';
import ParcelModel, { Parcel } from '../models/parcel';
import ParcelsService from './parcels';

/**
 *
 * @class TrucksService
 * @param {Model<Truck>} model
 */
export default class TrucksService {
  constructor(private readonly model: Model<Truck>) {}

  /**
   * Get all trucks
   * 
   * @return {*}  {Promise<Truck[]>}
   * @memberof TrucksService
   */
  async getAll(): Promise<Truck[]> {
    return this.model.find();
  }

  /**
   * Get truck by id
   *
   * @param {string} id
   * @return {*}  {Promise<Truck>}
   * @memberof TrucksService
   */
  async getById(id: string): Promise<Truck> {
    return this.model.findById(id);
  }

  /**
   * Create truck
   *
   * @param {Truck} truckData
   * @return {*}  {Promise<Truck>}
   * @memberof TrucksService
   */
  async createTruck(truckData: Truck): Promise<Truck> {
    const truck = new this.model(truckData);
    return truck.save();
  }

  /**
   * Load parcels to truck
   *
   * @param {string} truckId
   * @param {string[]} parcels
   * @return {*}  {Promise<Truck>}
   * @memberof TrucksService
   */
  async loadParcels(truckId: string, parcels: string[]): Promise<Truck> {
    const truck = await this.model.findById(truckId);
    const parcelsMap = new Map(truck.parcels.map(parcel => [parcel._id.toString(), parcel]));

    const parcelsService = new ParcelsService(ParcelModel);

    const existParcels = await parcelsService.getAll({_id: { '$in': parcels }})

    existParcels.forEach(parcel => parcelsMap.set(parcel._id.toString() , parcel) );

    truck.parcels = Array.from(parcelsMap.values());
    truck.count = truck.parcels.length;
    truck.weight = this.calculateParcelsWeight(truck.parcels);

    return truck.save();
  }

  /**
   * Unload parcels from truck
   *
   * @param {string} truckId
   * @param {string[]} parcels
   * @return {*}  {Promise<Truck>}
   * @memberof TrucksService
   */
  async unloadParcels(truckId: string, parcels: string[]): Promise<Truck> {
    const truck = await this.model.findById(truckId);

    truck.parcels = truck.parcels.filter(parcel => !parcels.includes(parcel._id.toString()));
    truck.count = truck.parcels.length;
    truck.weight = this.calculateParcelsWeight(truck.parcels);

    return truck.save();
  } 

  /**
   * Calculate weight of all loaded parcels
   *
   * @param {Parcel[]} parcels
   * @return {*}  {number}
   * @memberof TrucksService
   */
  calculateParcelsWeight(parcels: Parcel[]): number {
    return parcels.reduce((acc, parcel) => acc + parcel.weight, 0);
  }
}