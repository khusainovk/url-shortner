import React, { FC } from "react";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import { useGetShortUrlsQuery } from "app/services/shortUrl";
import { ShortUrlCard } from "app/features/ShortUrlCard";

export const ShortUrlList: FC = () => {
  const { data, isLoading } = useGetShortUrlsQuery();

  return (
    <Box
      sx={{
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!data?.length && !isLoading && (
        <Typography
          component="p"
          variant="h5"
          color="text.secondary"
          gutterBottom
        >
          No short URLs yet
        </Typography>
      )}

      {isLoading && <CircularProgress />}

      {data &&
        data.map((shortUrl) => (
          <ShortUrlCard
            key={shortUrl.shortUrl}
            fullUrl={shortUrl.fullUrl}
            shortUrl={shortUrl.shortUrl}
          />
        ))}
    </Box>
  );
};
