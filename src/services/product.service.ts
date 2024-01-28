import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Product, {
  ProductDocument,
  ProductInput,
} from "../models/product.model";

export const createProduct = async (input: ProductInput) => {
  try {
    const result = await Product.create(input);
    return result;
  } catch (e: any) {
    throw e;
  }
};

export const findProduct = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    const result = await Product.findOne(query, {}, options);
    return result;
  } catch (e: any) {
    throw e;
  }
};

export const findAndUpdateProduct = async (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) => {
  return Product.findOneAndUpdate(query, update, options);
};

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
  return Product.deleteOne(query);
};
