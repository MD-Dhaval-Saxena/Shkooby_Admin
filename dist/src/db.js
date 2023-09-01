"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
let url = "mongodb://127.0.0.1:27017/Shkooby_Admin";
const connectToMongo = () => {
    try {
        mongoose_1.default.connect(url);
        console.log("Connected to Mongo");
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectToMongo = connectToMongo;
//# sourceMappingURL=db.js.map