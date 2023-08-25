import { Schema, model } from "mongoose";
import { ResponseData } from "@/model/IResponseData";

const UrlSchema = new Schema<ResponseData>({
    actualUrl: {
        type: String,
        required: [true, "Actual URL is required"],
        unique: true
    },
    shortUrlTag: {
        type: String,
        required: [true, "Short URL tag is required"]
    },
    visitCount: {
        type: Number,
        required: [true, "URL Visit count is required"]
    },
    qrCode: {
        type: String,
        required: [true, "QR code is required"]
    }
}, { timestamps: true })

const UrlModel = model("url", UrlSchema);
export default UrlModel;
export type IUrlModel = typeof UrlSchema;