import mongoose, { Connection, connection, Mongoose } from 'mongoose';

export abstract class BaseDatabase {
  protected getConnection = async (): Promise<Connection> => {
    await mongoose.connect(`${process.env.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;

    db.on('error', (error) => {
      console.log(error);
    });

    db.once('open', () => {
      console.log('Database connected');
    });

    return db;
  };

  public static async destroyConnection(): Promise<void> {
    await mongoose.connection.close();
  }
}
