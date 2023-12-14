import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ShortUrl } from "app/types";
import { apiBaseUrl } from "app/constants";

export const shortUrlApi = createApi({
  reducerPath: "shortUrlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ["ShortUrls"],
  endpoints: (builder) => ({
    getShortUrls: builder.query<ShortUrl[], void>({
      query: () => `short-url`,
      providesTags: ["ShortUrls"],
    }),
    createShortUrl: builder.mutation<ShortUrl, { fullUrl: string }>({
      query(body) {
        return {
          url: `short-url`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["ShortUrls"],
    }),
    updateShortUrl: builder.mutation<ShortUrl, ShortUrl>({
      query(data) {
        const { shortUrl, ...body } = data;
        return {
          url: `short-url/${shortUrl}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["ShortUrls"],
    }),
  }),
});

export const {
  useGetShortUrlsQuery,
  useCreateShortUrlMutation,
  useUpdateShortUrlMutation,
} = shortUrlApi;
