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
exports.DbHelper = void 0;
const mssql_1 = __importDefault(require("mssql"));
const Config_1 = require("../Config");
class DbHelper {
    constructor() {
        // make a connection
        this.pool = mssql_1.default.connect(Config_1.sqlConfig);
    }
    createRequest(emptyRequest, data) {
        // data={name:"john", age:10}
        //
        const keys = Object.keys(data); //['name', 'age']
        keys.map(key => {
            emptyRequest.input(key, data[key]);
        });
        return emptyRequest;
    }
    exec(storedprocedure, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //make a request
            const emptyRequest = (yield this.pool).request();
            const request = this.createRequest(emptyRequest, data);
            let results = (yield request.execute(storedprocedure));
            return results;
        });
    }
    query(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield ((yield this.pool).request().query(queryString)));
        });
    }
}
exports.DbHelper = DbHelper;
