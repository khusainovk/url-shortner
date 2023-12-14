import { Router } from "express";
import { shortUrlsRouter } from "./shortUrls";

const router = Router();

router.use("/short-url", shortUrlsRouter);

export const apiRouter = router;
