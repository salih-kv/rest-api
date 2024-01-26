import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import logger from "../utils/logger";
import { createUserInput } from "../schemas/user.schema";

export const createUserHandler = async (
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).json({ error: e.message }); // 409 - conflict
  }
};
