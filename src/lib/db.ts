import mongoose from 'mongoose';

/**
 * Connect to mongoDB if there is no open connections
 * 
 * @return {void} 
 */
export default class DB {

  static async connect(): Promise<void> {
    if (!mongoose.connections || !mongoose.connections[0].readyState) {
      await mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
        .then(() => {
          // console.log('MongoDB database connection established successfully');
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  static async closeConnection(): Promise<void> {
    // console.log('Closing database connection');
    mongoose.connection.close();
  }

  static async clearDatabase(): Promise<void> {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }

} 
