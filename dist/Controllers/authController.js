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
exports.loginUser = exports.registerUser = void 0;
const DatabaseHelpers_1 = require("../DatabaseHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbInstance = new DatabaseHelpers_1.DbHelper();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Email, Password } = req.body;
        const Id = (0, uuid_1.v4)();
        const hashedpassword = yield bcrypt_1.default.hash(Password, 10);
        yield dbInstance.exec('dbo.addUser', { Id, Name, Email, Password: hashedpassword });
        res.status(201).json({ message: ' Added user Successfully!' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const user = (yield dbInstance.exec('dbo.getUserByEmail', { Email })).recordset;
        if (user.length > 0) {
            const isValid = yield bcrypt_1.default.compare(Password, user[0].Password);
            if (isValid) {
                let payload = {
                    sub: user[0].Id
                };
                const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: '3h' });
                return res.status(200).json({ message: "Logged In !!", token });
            }
            else {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }
        }
        return res.status(400).json({ message: 'Invalid Credentials' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.loginUser = loginUser;
