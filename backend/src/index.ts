import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { db } from "./db";
import { routes } from "./routes";

dotenv.config();

const app = express();
db.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


routes(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
