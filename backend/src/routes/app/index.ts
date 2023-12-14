import { Router } from "express";
import { ShortUrlRecord, ShortUrlModel } from "../../models";

const router = Router();

router.get("/:shortUrl", async (req, res) => {
  try {
    if (!req.params.shortUrl) {
      return res.sendStatus(400);
    }

    const record: ShortUrlRecord = await ShortUrlModel.findOne({
      shortUrl: req.params.shortUrl,
    });

    if (record === null) {
      return res.sendStatus(404);
    }

    return res.redirect(301, record.fullUrl);
  } catch (e) {
    return res.sendStatus(500);
  }
});
export const appRouter = router;
