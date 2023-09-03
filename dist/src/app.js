"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_js_1 = require("./db.js");
const app = (0, express_1.default)();
const port = 3000;
const authRoutes_1 = __importDefault(require("../Routes/authRoutes"));
(0, db_js_1.connectToMongo)();
app.use((0, cors_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes 
app.use(authRoutes_1.default);
app.get('/', (req, res) => {
    res.send(`Hello World! ${req.ip}`);
});
const errorMessage = (res, error) => {
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
//# sourceMappingURL=app.js.map