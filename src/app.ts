import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import {connectToMongo} from './db.js'
const app = express();
const port = 3000;
import { Request, Response } from "express";
import authRouter from '../Routes/authRoutes'

connectToMongo()
app.use(cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 
app.use(authRouter);



app.get('/', (req, res) => {
  res.send(`Hello World! ${req.ip}`);
});
const errorMessage = (res: Response, error: Error) => {
  console.log(error);
  return res.status(400).json({ status: "fail", message: error.message });
};

// app.post("/registerUser",async (req: Request, res: Response) => {
// try {
//   const { username, password, email } = req.body;
//   if (!username || !password) {
//     return res.status(200).json({
//       status: "fail",
//       message: "Username and Password Not Provided",
//     });
//   }
//   if (password.length <= 6 || password.length >= 25) {
//     return res.status(200).json({
//       status: "fail",
//       message: "Password Should be between 6-25 characters",
//       type: password,
//     });
//   }

//   const existingUser = await userModal.findOne({ username });
//   if (existingUser) {
//     return res.status(200).json({
//       status: "fail",
//       message: "This Username is Already Taken",
//       type: "username",
//     });
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const newUser = new userModal({
//     username,
//     password: hashedPassword,
//     email: email
//   });

//   const savedUser = await newUser.save();
//   res.status(201).json(savedUser);
// } catch (error : any | unknown )  {
//   console.log(error);
//   return errorMessage(res, error);
// }
// })




app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// export {}



// require("dotenv").config();
// const express = require("express");
// const db = require("./db");

// const url = process.env.url || "http://localhost:";

// const app = express();
// const port = process.env.port || 2000;


// const cors = require("cors");
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.get("/", (req:any, res:any) => {
//     res.send("Hello World!");
//   });

//   app.listen(port, () => {
//     // console.log(`Backend http://localhost:${port}`);
//     console.log(`Backend ${url}${port}`);
//   });
  
