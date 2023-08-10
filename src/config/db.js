const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv.config({
//   path: "./src/config/config.env",
// });

const mongoUri = `mongodb://127.0.0.1:27017/testDB`

const connectDB = async () => {
  try {
    // const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const { connection } = await mongoose.connect(mongoUri);
    console.log("DB connected: " + connection.host);
  } catch (error) {
    console.log("Error connecting database: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
