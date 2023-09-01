import jwt,{Secret ,JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export const SECRET_KEY: Secret = 'your-secret-key-here';

const errorMessage = (res: Response) => {
  return res.status(401).json({
    status: "fail",
    message: "Authorization denied, user is not logged in.",
  });
};

export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }
// changes made for testing
const auth = async (req: Request , res: Request, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
    //   return errorMessage(res);
    throw new Error();
    }

    const verified :any = jwt.verify(token, SECRET_KEY );
    if (!verified) {
    //   return errorMessage(res);
    throw new Error();
    }

    (req  as CustomRequest).token = verified.id;
    next();
  } catch {
    // return errorMessage(res);
    throw new Error();
  }
};

export default auth;