import express from "express";
import bodyParser from "body-parser";
import config from "./config";
import initMongo from "./models";
import routes from "./routes";
const app = express();

app.use(bodyParser.json());

initMongo();
app.use(routes);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
