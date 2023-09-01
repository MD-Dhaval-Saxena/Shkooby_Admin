import { Request, Response } from "express";
import User from "../Models/User";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.body.user);
//   const user = await User.findById(req.user);

  res.status(200).json({
    username: user!.username,
    id: user!._id
  });
};