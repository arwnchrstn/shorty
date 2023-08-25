import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import { getEnv } from '@/utils/getEnv';
import shortenRouter from "@/routes/shorten.routes";
import mongodbService from '@/services/mongodb.service';
import cors from "cors";

const app: Express = express();
const PORT = getEnv('port') || 3001;

mongodbService.connect();

app.use(express.json())
app.use(cors({
	origin: function(origin, callback) {
		if(!origin)
			return callback(null, true)

		if(getEnv('frontend_url') !== origin) {
			let msg = `The CORS policy for this site does not allow access from the specified origin: "${origin}"`
			return callback(new Error(msg), false)
		}

		return callback(null, true)
	}
}))

app.use("/api/v1/shorty", shortenRouter);

app.listen(+PORT, () => {
	console.log('URL shortener core running on port: ' + PORT);
});