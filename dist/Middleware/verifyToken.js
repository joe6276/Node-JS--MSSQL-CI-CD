"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.info = decodedData;
        next();
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.verifyToken = verifyToken;
