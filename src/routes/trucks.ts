import express from 'express';
import TruckModel from '../models/truck';
import ErrorResponse from '../lib/error-response';
import TrucksService from '../services/trucks';

const router = express.Router();
router.use(express.json());

const trucksService = new TrucksService(TruckModel);

router

  // list all trucks
  .get('/', async (req, res) => {
    const trucks = await trucksService.getAll();
    res.json(trucks);
  })

  // add new truck
  .post('/', async (req, res) => {
    trucksService.createTruck(req.body)
      .then(truck => res.json(truck))
      .catch(error => res.status(400).json(new ErrorResponse(error).toJSON()));
  })

  // load trucks with parcels
  .put('/:id/load', async (req, res) => {
    if (!req.body.parcels) {
      res.status(400).json(new ErrorResponse(new Error('parcels parameter is required')).toJSON());
      return false;
    }
    trucksService.loadParcels(req.params.id, req.body.parcels)
      .then(truck => res.json(truck))
      .catch(error => res.status(400).json(new ErrorResponse(error).toJSON()));
  })

  // unload trucks with parcels
  .put('/:id/unload', async (req, res) => {
    if (!req.body.parcels) {
      res.status(400).json(new ErrorResponse(new Error('parcels parameter is required')).toJSON());
      return false;
    }
    trucksService.unloadParcels(req.params.id, req.body.parcels)
      .then(truck => res.json(truck))
      .catch(error => res.status(400).json(new ErrorResponse(error).toJSON()));
  });

export default router;
