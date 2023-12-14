import { Router } from "express";
import { nanoid } from "nanoid";
import { ShortUrlModel, ShortUrlRecord, SHORT_URL_LENGTH } from "../../models";
import { SHORT_URL_REDIRECT_URL } from "../../constants";

const router = Router();

router.get("/", async (req, res) => {
  const records = await ShortUrlModel.find().sort({ _id: -1 }).limit(10);

  return res.send(records);
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.fullUrl) {
      return res.sendStatus(400);
    }

    const record: ShortUrlRecord = await ShortUrlModel.findOne({
      fullUrl: req.body.fullUrl,
    });

    if (record) {
      return res.send(record);
    }

    // 8 chars 1000IDs per hour ~ 99 days with 1% probability
    // https://zelark.github.io/nano-id-cc/
    const shortUrl = nanoid(SHORT_URL_LENGTH);

    const newRecord = await ShortUrlModel.findOneAndUpdate(
      {
        shortUrl,
      },
      {
        fullUrl: req.body.fullUrl,
        shortUrl,
      },
      {
        new: true,
        upsert: true,
      },
    );

    return res.send(newRecord);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.put("/:shortUrl", async (req, res) => {
  try {
    const fullUrl = req.body.fullUrl;
    const shortUrl = req.params.shortUrl;

    if (!fullUrl || !shortUrl) {
      return res.sendStatus(400);
    }

    if (`${process.env.SHORT_URL_REDIRECT_URL}/${shortUrl}` === fullUrl) {
      return res.sendStatus(400);
    }

    const record: ShortUrlRecord = await ShortUrlModel.findOneAndUpdate(
      { shortUrl: req.params.shortUrl },
      { fullUrl: req.body.fullUrl },
      { new: true },
    );

    if (record === null) {
      return res.sendStatus(404);
    }

    return res.send(record);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export const shortUrlsRouter = router;
