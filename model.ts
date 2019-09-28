import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fieldname: { required: true, type: String },
    originalname: { required: true, type: String },
    encoding: { required: true, type: String },
    mimetype: { required: true, type: String },
    destination: { required: true, type: String },
    filename: { required: true, type: String },
    path: { required: true, type: String },
    size: { required: true, type: Number } //sizeInKb
});

export const fileModel = mongoose.model("FilesCollectionMetaData", fileSchema);
