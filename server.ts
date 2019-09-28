import { Request, Response, NextFunction } from "express";
import express from "express";
import { log } from "console";
const port = 3000;
import mongoose from "mongoose";
import { HttpError } from "./util";
import { Upload } from "./routes";
const url = "mongodb://localhost/files";
mongoose
    .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => log("Database Connected!"))
    .catch(log);

const app = express();
app.listen(port, () => log("Express server up on port ", port));
app.use("/upload", Upload);
app.use((err: HttpError, req: any, res: Response, next: any) => {
    res.status(err.httpStatusCode).send({
        status: false,
        message: err.message
    });
});
