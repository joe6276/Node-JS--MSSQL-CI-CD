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
exports.uploadImage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectKey = `${(_a = req.info) === null || _a === void 0 ? void 0 : _a.sub}/${(0, uuid_1.v4)()}.jpeg`;
        const s3 = new aws_sdk_1.default.S3({
            region: "us-east-1",
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ID
        });
        s3.getSignedUrl('putObject', {
            Bucket: process.env.BUCKET,
            Key: objectKey,
            ContentType: "image/jpeg"
        }, (err, url) => res.json({ url, key: objectKey }));
        //     const s3= new S3Client({ region:"us-east-1" })
        //     const command = new PutObjectCommand({
        //         Bucket: process.env.BUCKET,
        //         Key: objectKey,
        //         ContentType: "image/jpeg"
        //       });
        //    let url =  await getSignedUrl(s3,command, {expiresIn:3600})
        //    res.json({url, key:objectKey})
    }
    catch (error) {
    }
});
exports.uploadImage = uploadImage;
