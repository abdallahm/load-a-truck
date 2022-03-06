import express from 'express';
import ParcelModel from '../models/parcel';
import ErrorResponse from '../lib/error-response';
import ParcelsService from '../services/parcels';

const router = express.Router();
router.use(express.json());

const parcelsService = new ParcelsService(ParcelModel);

router

  // list all parcels
  .get('/', async (req, res) => {
    const parcels = await parcelsService.getAll();
    res.json(parcels);
  })

  // add new parcel
  .post('/', async (req, res) => {
    parcelsService.createParcel(req.body)
      .then(parcel => res.json(parcel))
      .catch(error => res.status(400).json(new ErrorResponse(error).toJSON()));
  });

export default router;
