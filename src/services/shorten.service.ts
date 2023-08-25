import { MongooseError } from "mongoose";
import { ResponseData } from "@/model/IResponseData";
import UrlModel from "@/model/Url.Schema";
import randomstring from "randomstring";
import QRCode from "qrcode";
import { getEnv } from "@/utils/getEnv";

const getActualUrl = async (shortUrlTag: string): Promise<string | undefined> => {
    try {
        const urlStats = await UrlModel.findOne({ shortUrlTag: shortUrlTag }).exec()
        if(urlStats) {
            urlStats.visitCount+=1

            await urlStats.save()
        }
    
        return urlStats?.actualUrl;
    } catch (e: unknown) {
        const error = e as MongooseError | Error
        throw(error)
    }
}

const getUrlStats = async (shortUrlTag: string): Promise<Partial<ResponseData> | null> => {
    try {
        const urlStats = await UrlModel.findOne({ shortUrlTag: shortUrlTag }, { visitors: 0 }).exec();

        return urlStats;
    } catch (e: unknown) {
        const error = e as MongooseError | Error
        throw(error)
    }
}

const shrinkUrl = async (longUrl: string): Promise<Partial<ResponseData>> => {
    try {
        const existingUrl = await UrlModel.findOne({ actualUrl: longUrl }, { shortUrlTag: 1, qrCode: 1, }).exec()

        if(existingUrl)
            return existingUrl

        const shortUrlTag = randomstring.generate({
            charset: "alphanumeric",
            capitalization: "lowercase",
            length: 6,
        })

        const qrUrl = await QRCode.toDataURL(`${getEnv("frontend_url")}/${shortUrlTag}`);

        const shortenedUrl: ResponseData = {
            actualUrl: longUrl,
            shortUrlTag: shortUrlTag,
            visitCount: 0,
            qrCode: qrUrl
        }

        const urlStats = await new UrlModel(shortenedUrl).save()
        
        return urlStats;
    } catch (e: unknown) {
        const error = e as MongooseError | Error
        throw(error)
    }
}

const deleteShortUrl = async (shortUrlTag: string) => {
    try {
        await UrlModel.deleteOne({shortUrlTag: shortUrlTag})
    } catch (e: unknown) {
        const error = e as MongooseError | Error
        throw(error)
    }
}

export default {
    getActualUrl,
    getUrlStats,
    shrinkUrl,
    deleteShortUrl
}