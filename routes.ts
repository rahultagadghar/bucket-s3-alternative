import express, { Request, Response, NextFunction } from "express";

import { fileModel } from "./model";
import { HttpError, upload, send } from "./util";

export const Upload = express.Router();

Upload.post(
    "/",
    upload.array("photos", 12),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fileModel.insertMany(req.files);
            send(res, req.files);
        } catch (error) {
            next(error);
        }
    }
);
