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
        log("file", file);
        cb(null, "uploads/");
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 10 }
}); //10 mb

export function send(res: Response, data: any) {
    res.send({
        status: true,
        message: `success`,
        data
    });
}
