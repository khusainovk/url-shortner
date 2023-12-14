import React, { FC, useCallback, useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { NotificationType } from "app/types";
import { useAppDispatch } from "app/hooks";
import { useCreateShortUrlMutation } from "app/services/shortUrl";
import { setNotification } from "app/features/Notifications/slice";

export const ShortUrlForm: FC = () => {
  const dispatch = useAppDispatch();
  const [fullUrl, setFullUrl] = useState<string>("");

  const [createShortUrl, { isLoading }] = useCreateShortUrlMutation();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFullUrl(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const result = await createShortUrl({ fullUrl });

      if (!("error" in result)) {
        dispatch(
          setNotification({
            message: "Successfully shortened",
            type: NotificationType.SUCCESS,
          }),
        );
      }
    },
    [dispatch, fullUrl, createShortUrl],
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4">
        Shorten a long URL
      </Typography>
      <TextField
        onChange={onChange}
        type="url"
        margin="normal"
        required
        fullWidth
        id="fullUrl"
        label="Full URL"
        name="fullUrl"
        autoFocus
      />

      <Button
        disabled={isLoading}
        type="submit"
        size="large"
        variant="contained"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Shorten URL
      </Button>
    </Box>
  );
};
