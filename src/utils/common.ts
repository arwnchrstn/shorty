import { Response } from "express";
import { MongooseError } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { response } from "@/utils/response";

export const sendError = (error: MongooseError | Error, res: Response) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response("SERVER_ERROR", error.message || error))
}