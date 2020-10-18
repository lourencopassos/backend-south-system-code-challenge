import express from 'express';
import { ProductController } from '../controller/ProductController';

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.post('/create', productController.createProduct);
productRouter.delete('/delete/:id', productController.deleteProduct);
productRouter.put('/edit/:id', productController.updateProduct);
productRouter.get('/all', productController.getAllProducts);
productRouter.post('/available', productController.getAvailableProducts);
productRouter.post('/filter', productController.getProductByName);
