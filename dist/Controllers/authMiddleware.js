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
exports.errorMessage = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SECRET_KEY = "your-secret-key-here";
const errorMessage = (res) => {
    return res.status(401).json({
        status: "fail",
        message: "Authorization denied, user is not logged in.",
    });
};
exports.errorMessage = errorMessage;
// changes made for testing
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return (0, exports.errorMessage)(res);
        }
        const verified = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        if (!verified) {
            return (0, exports.errorMessage)(res);
        }
        req.token = verified;
        next();
    }
    catch (_a) {
        // return errorMessage(res);
        res.status(401).send("Please authenticate");
    }
});
exports.default = auth;
//# sourceMappingURL=authMiddleware.js.map