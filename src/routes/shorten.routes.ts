import { deleteUrl, getUrlStats, shrinkUrl, verifyShortLink } from "@/controllers/shorten.controller";
import { Router } from "express";

const router = Router();

router
    .get("/:tag", verifyShortLink)
    .post("/", shrinkUrl)
    .delete("/:tag", deleteUrl)
    .post("/track", getUrlStats)

export default router