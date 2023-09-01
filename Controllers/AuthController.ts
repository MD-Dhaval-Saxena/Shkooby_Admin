
import { Request, Response } from "express";
import dotenv from "dotenv";
import userModal from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const errorMessage = (res: Response, error: Error) => {
  console.log(error);
  return res.status(400).json({ status: "fail", message: error.message });
};

export const registerUser = async (req: Request, res: Response) => {
    console.log("registerUser");
  try {
    const { username, password, email } = req.body;
    console.log(req.body);
    if (!username || !password) {
      return res.status(200).json({
        status: "fail",
        message: "Username and Password Not Provided",
      });
    }
    if (password.length <= 6 || password.length >= 25) {
      return res.status(200).json({
        status: "fail",
        message: "Password Should be between 6-25 characters",
        type: password,
      });
    }

    const existingUser = await userModal.findOne({ username });
    if (existingUser) {
      return res.status(200).json({
        status: "fail",
        message: "This Username is Already Taken",
        type: "username",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModal({
      username,
      password: hashedPassword,
      email: email
    //   balance: balance,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error : any | unknown )  {
    console.log(error);
    return errorMessage(res, error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(200).json({
        status: "fail",
        message: "Not all fields have been entered.",
      });
    }

    const user = await userModal.findOne({ username });

    if (!user) {
      return res.status(200).json({
        status: "fail",
        message: "Invalid credentials. Please try again.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({
        status: "fail",
        message: "Invalid credentials. Please try again.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    return res.status(200).json({
      token,
      user: {
        username,
        id: user._id
        // balance: user.balance,
      },
    });
  } catch (error :any | unknown) {
    return errorMessage(res, error);
  }
};

export const validate = async (req: Request, res: Response) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified :any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!verified) {
      return res.json(false);
    }

    const user = await userModal.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.send({ username: user.username, status: true });
  } catch (error) {
    return res.json(false);
  }
};

// export const updateProfile = async (req: Request, res: Response) => {
//   let { username, name, upi } = req.body;
//   try {
//     let update = await userModal.findOneAndUpdate(
//       { username: username },
//       { name: name, upi: upi },
//       { new: true }
//     );
   
//     return res.json(update);
//   } catch (error) {
//     return res.json(false);
//   }
// };

export const viewProfile = async (req: Request, res: Response) => {
  let { username } = req.body;
  let update = await userModal.findOneAndUpdate(
    { username: username },
    { name: "jay" },
    { new: true }
  );
  return res.json(update);
};