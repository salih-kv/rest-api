import { Express, Request, Response } from "express";
import validate from "./middlewares/validateResource";
import { createUserHandler } from "./controllers/user.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import { createUserSchema } from "./schemas/user.schema";
import { createSessionSchema } from "./schemas/session.schema";
import requireUser from "./middlewares/requireUser";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schemas/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controllers/product.controller";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validate(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchema)],
    updateProductHandler
  );
  app.get(
    "/api/products/:productId",
    [requireUser, validate(getProductSchema)],
    getProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validate(deleteProductSchema)],
    deleteProductHandler
  );
};

export default routes;
