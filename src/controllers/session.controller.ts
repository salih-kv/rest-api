import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { signJwt } from "../utils/jwt";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  // return access & refresh tokens
  res.json({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.json(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.json({
    accessToken: null,
    refreshToken: null,
  });
};
