require('dotenv/config')
module.exports = {
    HOST: process.env.RDS_HOST,
    USER: process.env.RDS_USERNAME,
    PASSWORD: process.env.RDS_PASSWORD,
    DB: process.env.RDS_DATABASE,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
