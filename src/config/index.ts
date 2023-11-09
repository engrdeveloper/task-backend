import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3003,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/backendTask",
  jwtSecret: process.env.JWT_SECRET || "123456789abc",
};

export default config;
