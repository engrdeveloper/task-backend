import mongoose from "mongoose";
import fs from "fs";

import config from "../config";
import { removeExtensionFromFile } from "../utils/helpers";

const initMongo = () => {
  console.debug("Connecting to MongoDB");

  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.debug("MongoDB Connected Successfully");
      // Loop models path and loads every file as a model except this file
      fs.readdirSync(`${__dirname}/`).filter((file) => {
        // Take filename and remove last part (extension)
        const modelFile = removeExtensionFromFile(file);
        // loading files
        return modelFile !== "index" ? require(`./${modelFile}`) : "";
      });
    })
    .catch((error) => console.error("Error connecting to MongoDB: %j ", error));
};

export default initMongo;
