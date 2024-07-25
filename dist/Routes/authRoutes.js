"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controllers/authController");
const router = (0, express_1.Router)();
router.post('/login', authController_1.loginUser);
router.post('/register', authController_1.registerUser);
exports.default = router;
