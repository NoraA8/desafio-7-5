import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import inventaryRouter from "./routes/inventary.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", inventaryRouter);

app.listen(PORT, () => {
  console.log(`Servidor en puerto: http://localhost:${PORT}`);
});
