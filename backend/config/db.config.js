module.exports = {
    HOST: "db",
    USER: "mps",
    PASSWORD: "mps",
    DB: "mps",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };