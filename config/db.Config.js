require('dotenv/config')
module.exports = {
    HOST: "csye6225.ch9yy1xvcvin.us-east-1.rds.amazonaws.com",
    USER: "csye6225",
    PASSWORD: "csye6225",
    DB: "csye6225",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
