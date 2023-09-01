"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose = require("mongoose");
let url = "mongodb://127.0.0.1:27017/Shkooby_Admin";
const connectToMongo = () => {
    try {
        mongoose.connect(url);
        console.log("Connected to Mongo");
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectToMongo = connectToMongo;
//# sourceMappingURL=db.js.map