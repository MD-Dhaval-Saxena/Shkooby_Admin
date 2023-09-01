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
(0, db_js_1.connectToMongo)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
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