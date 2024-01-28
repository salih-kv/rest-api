import { Request, Response } from "express";
import {
  createProductInput,
  updateProductInput,
} from "../schemas/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../services/product.service";

export const createProductHandler = async (
  req: Request<{}, {}, createProductInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const product = await createProduct({ ...req.body, user: userId });
  return res.json(product);
};

export const updateProductHandler = async (
  req: Request<updateProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, req.body, {
    new: true,
  });

  return res.json(updatedProduct);
};

export const getProductHandler = async (
  req: Request<updateProductInput["params"]>,
  res: Response
) => {
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.json(product);
};

export const deleteProductHandler = async (
  req: Request<updateProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({ productId });

  return res.sendStatus(200);
};
