"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../Middleware/verifyToken");
const uploadController_1 = require("../Controllers/uploadController");
const uploadRouter = (0, express_1.Router)();
uploadRouter.get("", verifyToken_1.verifyToken, uploadController_1.uploadImage);
exports.default = uploadRouter;
