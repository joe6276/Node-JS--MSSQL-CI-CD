
import mssql from 'mssql'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})

export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: 'MyBlog',
  server: '172.18.0.2/16',
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

