import { Schema, model } from "mongoose";

export interface ShortUrl {
    fullUrl: string;
    shortUrl: string;
}

export type ShortUrlRecord = ShortUrl | null

export const SHORT_URL_LENGTH = 8;

const shortUrlSchema = new Schema<ShortUrl>({
    fullUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
});

export const ShortUrlModel = model<ShortUrl>("ShortUrl", shortUrlSchema);
