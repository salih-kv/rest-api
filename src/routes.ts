import { Express, Request, Response } from "express";
import validate from "./middlewares/validateResource";
import { createUserHandler } from "./controllers/user.controller";
import { createUserSessionHandler } from "./controllers/session.controller";
import { createUserSchema } from "./schemas/user.schema";
import { createSessionSchema } from "./schemas/session.schema";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validate(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
};

export default routes;
