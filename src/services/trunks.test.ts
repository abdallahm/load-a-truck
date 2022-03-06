import DB from '../lib/db';
import TrucksModel, { Truck } from '../models/truck';
import ParcelModel, { Parcel } from '../models/parcel';
import ParcelsService from './parcels';
import TrucksService from './trucks';

describe('Trucks Service', () => {

  beforeAll(async () => {
    await DB.connect();
  });

  afterAll(async () => {
    await DB.clearDatabase();
    await DB.closeConnection();
  });

  const trucksService = new TrucksService(TrucksModel);

  test('test create truck', async () => {
    const truck = await trucksService.createTruck({ name: 'test truck' } as Truck);
    expect(truck).toBeDefined();
    expect(truck._id).toBeDefined();
    expect(truck.name).toBe('test truck');
    expect(truck.weight).toBe(0);
    expect(truck.count).toBe(0);

    const trucks = await trucksService.getAll();
    expect(trucks.length).toBe(1);
  });

  test('test get all trucks before loading', async () => {
    const trucks = await trucksService.getAll();
    expect(trucks.length).toBe(1);
  });

  test('test load percels to truck', async () => {
    const trucks = await trucksService.getAll();
    const parcelsService = new ParcelsService(ParcelModel);
    const percel1 = await parcelsService.createParcel({ title: 'test parcel 1', weight: 10 } as Parcel);
    const percel2 = await parcelsService.createParcel({ title: 'test parcel 2', weight: 5 } as Parcel);
    
    const truck = await trucksService.loadParcels(trucks[0]._id.toString(), [percel1._id.toString(), percel2._id.toString()]);
    expect(truck.parcels.length).toBe(2);
  });

  test('test get all trucks after loading', async () => {
    const trucks = await trucksService.getAll();

    expect(trucks.length).toBe(1);
    expect(trucks[0].weight).toBe(15);
    expect(trucks[0].count).toBe(2);
  });

  test('test unload percels from truck', async () => {
    const trucks = await trucksService.getAll();
    const truck = await trucksService.unloadParcels(trucks[0]._id.toString(), [trucks[0].parcels[0]._id.toString()]);
    expect(truck.parcels.length).toBe(1);
  });

  test('test get all trucks after unloading', async () => {
    const trucks = await trucksService.getAll();

    expect(trucks.length).toBe(1);
    expect(trucks[0].weight).toBe(5);
    expect(trucks[0].count).toBe(1);
  });
  
});