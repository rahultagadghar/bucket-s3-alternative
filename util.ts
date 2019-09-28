import multer from "multer";
import { Request, Response, NextFunction } from "express";

import { log } from "console";
export class HttpError extends Error {
    httpStatusCode: number;
    constructor(StatusCode = 500) {
        super();
        this.httpStatusCode = StatusCode;
    }
}

export const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, process.env.FILE_PATH);
    },
    filename: (req: any, file: any, cb: any) => {
        cb(
            null,
            `${Date.now()}-${file.fieldname}-${getFileExtension(
                file.originalname
            )}`
        );
    }
});

function getFileExtension(fileName: String) {
    const split = fileName.split(".");
    if (split.length > 0) {
        return "." + split[1];
    }
    return "";
}

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 10 }
}); //10 mb

export function send(res: Response, data: any = null) {
    res.send({
        status: true,
        message: `success`,
        data
    });
}
