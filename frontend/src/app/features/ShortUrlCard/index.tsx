import React, { FC, useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { redirectBaseUrl } from "app/constants";
import { ShortUrl } from "app/types";
import { useShortUrlCopy, useUpdateShortUrl } from "./hooks";

export const ShortUrlCard: FC<ShortUrl> = ({ shortUrl, fullUrl }) => {
  const [onUpdateShortUrl, isLoading] = useUpdateShortUrl();
  const [onShortUrlCopy, tooltipMessage] = useShortUrlCopy();

  const [isEditable, setIsEditable] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editableFullUrl, setEditableFullUrl] = useState<string>(fullUrl);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableFullUrl(e.target.value);
  }, []);

  const onEdit = useCallback(() => {
    setIsEditable(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsEditable(false);
    setErrorMessage(null);
    setEditableFullUrl(fullUrl);
  }, [fullUrl]);

  const onCopy = useCallback(() => {
    onShortUrlCopy(shortUrl);
  }, [shortUrl, onShortUrlCopy]);

  const onSave = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage(null);

      try {
        await onUpdateShortUrl({ shortUrl, fullUrl: editableFullUrl });
        setIsEditable(false);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    },
    [shortUrl, editableFullUrl, onUpdateShortUrl],
  );

  return (
    <Card
      component="form"
      onSubmit={onSave}
      sx={{
        marginBottom: 3,
        width: "100%",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h5" variant="subtitle1">
          Shortened URL:
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          <Link
            href={`${redirectBaseUrl}/${shortUrl}`}
            target="_blank"
            variant="h5"
            sx={{
              marginRight: 1,
            }}
          >
            {redirectBaseUrl}/{shortUrl}
          </Link>

          <Tooltip title={tooltipMessage} placement="top">
            <IconButton onClick={onCopy} aria-label="copy">
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <TextField
          label="Full URL"
          variant="standard"
          type="url"
          required
          value={editableFullUrl}
          onChange={onChange}
          disabled={!isEditable || isLoading}
          error={!!errorMessage}
          helperText={errorMessage}
        />
      </CardContent>
      <CardActions>
        {isEditable ? (
          <>
            <Button
              disabled={isLoading}
              onClick={onCancel}
              startIcon={<CancelIcon />}
              size="small"
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              startIcon={<SaveIcon />}
              size="small"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            onClick={onEdit}
            startIcon={<EditIcon />}
            size="small"
            variant="outlined"
            color="warning"
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
