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
exports.connectdatabase = void 0;
const mssql_1 = __importDefault(require("mssql"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'master',
    server: '172.18.0.2/16',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};
const createDatabaseQuery = `
use master
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MyBlog')
BEGIN
    CREATE DATABASE MyBlog
END
`;
//everything after this part will run when the database is created 
const createTables = `
USE MyBlog
CREATE TABLE Users (Id VARCHAR(255) PRIMARY KEY , Name VARCHAR(255), Email  VARCHAR(255) UNIQUE, Password VARCHAR(255))

CREATE TABLE Blogs(Id VARCHAR(255), Heading TEXT , ImageUrl VARCHAR (255), Description TEXT, AuthorId VARCHAR(255) FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE )

`;
const adduser = ` 

CREATE OR ALTER PROCEDURE addUser(@Id VARCHAR(255), @Name VARCHAR(255), @Email VARCHAR(255), @Password VARCHAR(255))
AS
BEGIN
INSERT INTO users (Id,Name,Email,Password) VALUES(@Id,@Name,@Email,@Password)
END
`;
const getUsers = `
CREATE OR ALTER PROCEDURE  getUsers
AS
BEGIN
SELECT * FROM users 
END
`;
const getUserByEmail = `
CREATE OR ALTER PROCEDURE  getUserByEmail(@EMAIL VARCHAR(255))
AS
BEGIN
SELECT * FROM Users WHERE Email = @Email
END
`;
const addBlog = `

CREATE OR ALTER PROCEDURE addBlog(@Id VARCHAR(255), @Heading TEXT , @ImageUrl VARCHAR (255), @Description TEXT, @AuthorId VARCHAR(255))
AS
BEGIN

INSERT INTO Blogs(Id, Heading,ImageUrl,Description, AuthorId)
VALUES(@Id,@Heading,@ImageUrl,@Description,@AuthorId)

END
`;
const getAllBlogs = `
CREATE OR ALTER PROCEDURE getAllBlogs
AS
BEGIN

SELECT b.Id, b.Heading, b.Description, b.ImageUrl, a.Name  FROM  BLogs as b INNER JOIN Users as a ON b.AuthorId =a.Id
END

`;
const getUserBlogs = `
CREATE OR ALTER PROCEDURE getUserBlogs(@authorId VARCHAR(255))
AS
BEGIN

SELECT * FROM  BLogs WHERE AuthorId=@authorId
END
`;
const getBlog = `
CREATE OR ALTER PROCEDURE getBlog(@Id VARCHAR(255))
AS
BEGIN

SELECT b.Heading, b.Description, b.ImageUrl, a.Name  FROM  BLogs as b INNER JOIN Users as a ON b.AuthorId = a.Id WHERE b.Id= @Id
END

`;
const connectdatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(sqlConfig);
        console.log("Started");
        let pool = yield mssql_1.default.connect(sqlConfig);
        console.log('Connected');
        let result = yield (yield pool.request().query(" SELECT * FROM sys.databases WHERE name = 'MyBlog'")).recordset[0];
        console.log(result);
        if (result === undefined) {
            yield pool.request().query(createDatabaseQuery);
            console.log("Created");
            let pool2 = yield mssql_1.default.connect(Object.assign(Object.assign({}, sqlConfig), { database: 'MyBlog' }));
            yield pool.request().query('USE MyBlog');
            yield pool2.request().query(createTables);
            console.log("Tables");
            yield pool.request().query('USE MyBlog');
            yield pool2.request().query(adduser);
            yield pool.request().query('USE MyBlog');
            yield pool2.request().query(getUserBlogs);
            yield pool.request().query('USE MyBlog');
            yield pool2.request().query(getUsers);
            yield pool.request().query('USE MyBlog');
            yield pool2.request().query(addBlog);
            yield pool.request().query('USE MyBlog');
            yield pool2.request().query(getUserByEmail);
            yield pool.request().query('USE MyBlog');
            yield pool2.request().query(getAllBlogs);
            yield pool.request().query('USE MyBlog');
            yield pool2.request().query(getBlog);
            console.log("Done Procs!");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.connectdatabase = connectdatabase;
(0, exports.connectdatabase)();
