const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database connection established");
  } catch (error) {
    console.log("DataBase: An error has been occur");
    console.warn(error);
    process.exit(1);
  }
};

module.exports = connectDataBase;
