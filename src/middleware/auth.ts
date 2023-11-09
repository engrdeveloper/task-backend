import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface ExtendedRequest extends Request {
  user?: { userId: string } | null;
}
export const authenticateJWT = (
  req: ExtendedRequest,
  res: Response,
  next: () => void,
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(token, config.jwtSecret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = user || null;
    next();
  });
};
