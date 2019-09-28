import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import { fileModel } from "./model";
import { HttpError, upload, send } from "./util";

export const Upload = express.Router();

Upload.post(
    "/",
    upload.array("photos", 12),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result = await fileModel.insertMany(req.files);
            send(res, result);
        } catch (error) {
            next(error);
        }
    }
);

Upload.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, filename } = req.query;
        let result: any = await findFile(id, filename);
        if (result) {
            return fs.createReadStream(`${__dirname}/${result.path}`).pipe(res);
        }
        return send(res, null);
    } catch (error) {
        next(error);
    }
});
Upload.delete("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, filename } = req.query;
        let fileInfo: any = await findFile(id, filename);

        if (fileInfo === null) {
            return next({ message: "File does not exist" });
        }
        await fileModel.findOneAndDelete({ _id: fileInfo.id });
        fs.unlinkSync(`${__dirname}/${fileInfo.path}`);
        return send(res, "File deleted");
    } catch (error) {
        next(error);
    }
});
Upload.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await fileModel.find();
        return send(res, result);
    } catch (error) {
        next(error);
    }
});

async function findFile(id = "", filename = "") {
    return await fileModel
        .findOne({
            $or: [{ _id: id }, { filename }]
        })
        .exec();
}
