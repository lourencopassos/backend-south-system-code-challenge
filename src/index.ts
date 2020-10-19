import dotenv from 'dotenv';
import { AddressInfo } from 'net';
import express from 'express';
import { userRouter } from './routes/userRouter';
import { productRouter } from './routes/productRouter';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.use('/user', userRouter);
app.use('/product', productRouter);

export const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Server failed to initiate`);
  }
});
