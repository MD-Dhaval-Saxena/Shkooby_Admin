import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const SECRET_KEY: Secret = "your-secret-key-here";

export const errorMessage = (res: Response) => {
  return res.status(401).json({
    status: "fail",
    message: "Authorization denied, user is not logged in.",
  });
};

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

// changes made for testing
 const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return errorMessage(res);
    }

    const verified = jwt.verify(token, SECRET_KEY);
    if (!verified) {
      return errorMessage(res);
    }

    (req as CustomRequest).token = verified;
    next();
  } catch {
    // return errorMessage(res);
    res.status(401).send("Please authenticate");
  }
};

export default auth;
