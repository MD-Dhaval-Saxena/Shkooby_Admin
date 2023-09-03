"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewProfile = exports.updateProfile = exports.test = exports.validate = exports.loginUser = exports.registerUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../Models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const errorMessage = (res, error) => {
    console.log(error);
    return res.status(400).json({ status: "fail", message: error.message });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(200).json({
                status: "fail",
                message: "This Username is Already Taken",
                type: "username",
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new User_1.default({
            username,
            password: hashedPassword,
            email: email
            //   balance: balance,
        });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        console.log(error);
        return errorMessage(res, error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(200).json({
                status: "fail",
                message: "Not all fields have been entered.",
            });
        }
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return res.status(200).json({
                status: "fail",
                message: "Invalid credentials. Please try again.",
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({
                status: "fail",
                message: "Invalid credentials. Please try again.",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({
            token,
            user: {
                username,
                id: user._id
                // balance: user.balance,
            },
        });
    }
    catch (error) {
        return errorMessage(res, error);
    }
});
exports.loginUser = loginUser;
const validate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.json(false);
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false);
        }
        const user = yield User_1.default.findById(verified.id);
        if (!user) {
            return res.json(false);
        }
        return res.send({ username: user.username, status: true });
    }
    catch (error) {
        return res.json(false);
    }
});
exports.validate = validate;
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.send("hello ");
    }
    catch (error) {
        return res.json(error);
    }
});
exports.test = test;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, name, upi } = req.body;
    try {
        let update = yield User_1.default.findOneAndUpdate({ username: username }, { name: name, upi: upi }, { new: true });
        return res.json(update);
    }
    catch (error) {
        return res.json(false);
    }
});
exports.updateProfile = updateProfile;
const viewProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username } = req.body;
    let update = yield User_1.default.findOneAndUpdate({ username: username }, { name: "jay" }, { new: true });
    return res.json(update);
});
exports.viewProfile = viewProfile;
//# sourceMappingURL=AuthController.js.map