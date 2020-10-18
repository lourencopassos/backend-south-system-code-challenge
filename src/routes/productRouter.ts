import express from 'express';
import { ProductController } from '../controller/ProductController';

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.post('/create', productController.createProduct);
productRouter.delete('/delete/:id', productController.deleteProduct);
productRouter.put('/edit/:id', productController.updateProduct);
productRouter.get('/all', productController.getAllProducts);
productRouter.get('/available', productController.getAvailableProducts);
productRouter.get('/filter', productController.getProductByName);
productRouter.get('/detail/:id', productController.getProductById);
