import { config } from "dotenv";
config();
const { PORT, DB_URL = "" } = process.env;
import { Request, Response, NextFunction } from "express";
import express from "express";
import { log } from "console";

import mongoose from "mongoose";
import { HttpError } from "./util";
import { Upload } from "./routes";
import cors from "cors";
mongoose
    .connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => log("Database Connected!"))
    .catch(log);

const app = express();
app.use(cors());
app.listen(PORT, () => log("Express server up on port ", PORT));
app.use("/upload", Upload);
app.use((err: HttpError, req: any, res: Response, next: any) => {
    res.status(err.httpStatusCode || 500).send({
        status: false,
        message: err.message,
        data: null
    });
});
