import express from 'express';
import 'dotenv/config';
import DB from './lib/db';

import TrucksRouter from './routes/trucks';
import ParcelsRouter from './routes/parcels';

const app = express();
const port = process.env.PORT ?? 3000;

DB.connect();

app.get('/', (req, res) => {
  res.send('Load a truck service API.')
})

app.use('/trucks', TrucksRouter);
app.use('/parcels', ParcelsRouter);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})