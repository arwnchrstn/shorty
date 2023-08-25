import mongoose, { MongooseError } from "mongoose"
import { getEnv } from "@/utils/getEnv"

const connect = () => {
    mongoose
        .connect(getEnv("db_url"))
        .then(() => {
            console.log("Connected to Mongo DB Atlas");
        })
        .catch((e: unknown) => {
            const error = e as MongooseError | Error

            console.log("Error connecting to mongo db: " + error.message || error)
        })
}

export default {
    connect
}