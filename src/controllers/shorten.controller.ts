import { Response, Request } from "express";
import { response } from "@/utils/response"
import { MongooseError } from "mongoose";
import shortenService from "@/services/shorten.service"
import { sendError } from "@/utils/common";

interface ReqParams { tag: string }
interface ReqBody extends ReqParams {
    longUrl: string
}

export const verifyShortLink = async (req: Request<ReqParams>, res: Response) => {
    try {
        const { tag } = req.params;
        
        const longUrl = await shortenService.getActualUrl(tag)

        res.send(response("SUCCESS", longUrl))
    } catch (error: unknown) {
        sendError((error as MongooseError | Error), res)
    }
}

export const getUrlStats = async (req: Request<{}, {}, ReqBody>, res: Response) => {
    try {
        const { tag } = req.body;
        
        const longUrl = await shortenService.getUrlStats(tag)

        res.send(response("SUCCESS", longUrl))
    } catch (error: unknown) {
        sendError((error as MongooseError | Error), res)
    }
}

export const deleteUrl = async (req: Request<ReqParams>, res: Response) => {
    try {
        const { tag } = req.params

        await shortenService.deleteShortUrl(tag)

        res.send(response("SUCCESS", "Your short URL is deleted"))
    } catch (error: unknown) {
        sendError((error as MongooseError | Error), res)
    }
}

export const shrinkUrl = async (req: Request<{}, {}, ReqBody>, res: Response) => {
    try {
        const { longUrl } = req.body

        const urlStats = await shortenService.shrinkUrl(longUrl)

        res.send(response("SUCCESS", urlStats))
    } catch (error: unknown) {
        sendError((error as MongooseError | Error), res)
    }
}