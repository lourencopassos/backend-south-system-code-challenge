import { number } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

export enum ProductCategory {
  ELETRONIC = 'eletronic',
  APPAREL = 'apparel',
  TOY = 'toy',
}

export const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: 'Product name required',
    lowercase: true,
  },

  category: {
    type: ProductCategory,
    lowercase: true,
    required: 'Product category required',
  },
  price: {
    type: number,
    required: 'Price required',
    get: getPrice,
    set: setPrice,
  },
});

function getPrice(number: number) {
  return (number / 100).toFixed(2);
}

function setPrice(number: number) {
  return number * 100;
}

export const stringToCategory = (input: string) => {
  switch (input) {
    case 'eletronic':
      return ProductCategory.ELETRONIC;
    case 'apparel':
      return ProductCategory.APPAREL;
    case 'toy':
      return ProductCategory.TOY;
    default:
      throw new Error('Invalid category');
  }
};

export interface ProductInputDTO {
  name: string;
  price: number;
  category: ProductCategory;
}

export const ProductModel = mongoose.model('products', ProductSchema);
