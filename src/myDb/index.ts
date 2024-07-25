import mssql from 'mssql'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'master',
    server: '172.18.0.2/16',
    port:1433,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

const createDatabaseQuery = `
use master
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MyBlog')
BEGIN
    CREATE DATABASE MyBlog
END
`;


//everything after this part will run when the database is created 

const createTables =`
USE MyBlog
CREATE TABLE Users (Id VARCHAR(255) PRIMARY KEY , Name VARCHAR(255), Email  VARCHAR(255) UNIQUE, Password VARCHAR(255))

CREATE TABLE Blogs(Id VARCHAR(255), Heading TEXT , ImageUrl VARCHAR (255), Description TEXT, AuthorId VARCHAR(255) FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE )

`

const adduser=` 

CREATE OR ALTER PROCEDURE addUser(@Id VARCHAR(255), @Name VARCHAR(255), @Email VARCHAR(255), @Password VARCHAR(255))
AS
BEGIN
INSERT INTO users (Id,Name,Email,Password) VALUES(@Id,@Name,@Email,@Password)
END
`
const getUsers=`
CREATE OR ALTER PROCEDURE  getUsers
AS
BEGIN
SELECT * FROM users 
END
`

const getUserByEmail=`
CREATE OR ALTER PROCEDURE  getUserByEmail(@EMAIL VARCHAR(255))
AS
BEGIN
SELECT * FROM Users WHERE Email = @Email
END
`

const addBlog=`

CREATE OR ALTER PROCEDURE addBlog(@Id VARCHAR(255), @Heading TEXT , @ImageUrl VARCHAR (255), @Description TEXT, @AuthorId VARCHAR(255))
AS
BEGIN

INSERT INTO Blogs(Id, Heading,ImageUrl,Description, AuthorId)
VALUES(@Id,@Heading,@ImageUrl,@Description,@AuthorId)

END
`

const getAllBlogs=`
CREATE OR ALTER PROCEDURE getAllBlogs
AS
BEGIN

SELECT b.Id, b.Heading, b.Description, b.ImageUrl, a.Name  FROM  BLogs as b INNER JOIN Users as a ON b.AuthorId =a.Id
END

`

const getUserBlogs=`
CREATE OR ALTER PROCEDURE getUserBlogs(@authorId VARCHAR(255))
AS
BEGIN

SELECT * FROM  BLogs WHERE AuthorId=@authorId
END
`

const getBlog=`
CREATE OR ALTER PROCEDURE getBlog(@Id VARCHAR(255))
AS
BEGIN

SELECT b.Heading, b.Description, b.ImageUrl, a.Name  FROM  BLogs as b INNER JOIN Users as a ON b.AuthorId = a.Id WHERE b.Id= @Id
END

`



export const connectdatabase=async()=>{
  try {
    console.log(sqlConfig);
    
    console.log("Started");
    
    let pool =await mssql.connect(sqlConfig)
    console.log('Connected');
   
   let result = await(await pool.request().query(" SELECT * FROM sys.databases WHERE name = 'MyBlog'")).recordset[0]
    console.log(result)
   if(result===undefined){

    await pool.request().query(createDatabaseQuery)
    console.log("Created");
    
    let pool2=await mssql.connect({...sqlConfig, database:'MyBlog'})
    
    await pool.request().query('USE MyBlog')
    await pool2.request().query(createTables)
    console.log("Tables");
     await pool.request().query('USE MyBlog')
    await pool2.request().query(adduser)
     await pool.request().query('USE MyBlog')
    await pool2.request().query(getUserBlogs)
     await pool.request().query('USE MyBlog')
    await pool2.request().query(getUsers)
     await pool.request().query('USE MyBlog')
    await pool2.request().query(addBlog)
     await pool.request().query('USE MyBlog')
    await pool2.request().query(getUserByEmail)
     await pool.request().query('USE MyBlog')
    await pool2.request().query(getAllBlogs)
     await pool.request().query('USE MyBlog')
    await pool2.request().query(getBlog)
    console.log("Done Procs!");
    
  }
    
    
  } catch (error) {
    console.log(error);
    
  }
}

connectdatabase()