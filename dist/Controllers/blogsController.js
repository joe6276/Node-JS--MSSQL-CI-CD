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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getaBlog = exports.getBlog = exports.getBlogs = exports.addBlog = void 0;
const index_1 = require("../DatabaseHelpers/index");
const uuid_1 = require("uuid");
const dbInstance = new index_1.DbHelper();
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const Id = (0, uuid_1.v4)();
        const { Heading, Description, ImageUrl } = req.body;
        console.log(req.body);
        const AuthorId = (_a = req.info) === null || _a === void 0 ? void 0 : _a.sub;
        yield dbInstance.exec('dbo.addBlog', { Id, Heading, ImageUrl, Description, AuthorId });
        return res.status(201).json({ message: 'Blog Added Successfully!!' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.addBlog = addBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = (yield dbInstance.exec('dbo.getAllBlogs', {})).recordset;
        return res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getBlogs = getBlogs;
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const AuthorId = (_a = req.info) === null || _a === void 0 ? void 0 : _a.sub;
        const blogs = (yield dbInstance.exec('dbo.getUserBlogs', { authorId: AuthorId })).recordset;
        return res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getBlog = getBlog;
const getaBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const blog = (yield dbInstance.exec('dbo.getBlog', { Id: id })).recordset[0];
        return res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getaBlog = getaBlog;
