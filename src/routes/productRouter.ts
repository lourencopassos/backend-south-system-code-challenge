import express from 'express';
import { ProductController } from '../controller/ProductController';

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.post('/create', productController.createProduct);
productRouter.get('/delete/:id', productController.deleteProduct);
