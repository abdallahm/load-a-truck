import DB from './src/lib/db';


export default async () => {
  await DB.clearDatabase();
  await DB.closeConnection();
}
