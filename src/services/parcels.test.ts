import DB from '../lib/db';
import ParcelModel, { Parcel } from '../models/parcel';
import ParcelsService from './parcels';

describe('Parcels Service', () => {

  beforeAll(async () => await DB.connect());

  afterAll(async () => {
    await DB.clearDatabase();
    await DB.closeConnection();
  });

  const parcelsService = new ParcelsService(ParcelModel);

  test('test create parcel', async () => {
    const parcel = await parcelsService.createParcel({ title: 'test parcel', weight: 10 } as Parcel);
    expect(parcel).toBeDefined();
    expect(parcel._id).toBeDefined();
    expect(parcel.title).toBe('test parcel');
    expect(parcel.weight).toBe(10);
  });

  test('test get all parcels', async () => {
    const parcels = await parcelsService.getAll();
    expect(parcels.length).toBe(1);
  });

});