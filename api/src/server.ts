import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";

import "express-async-errors";

import "./database/connection";

import routes from "./routes";

import errorHandler from "./errors/handler";

const API_URL = process.env.API_URL || "http://localhost";
const API_PATH = process.env.API_PATH || "api/v1";
const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1", routes);

app.use(
  "/api/v1/uploads",
  express.static(path.join(__dirname, "..", "uploads"))
);

app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`[running] App listening on ${API_URL}:${PORT}/${API_PATH}`);
});
