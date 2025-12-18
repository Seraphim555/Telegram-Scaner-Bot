import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import scanRouter from "./routes/scan.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/scan", scanRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend запущен на порту ${PORT}...`);
});