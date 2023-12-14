import { useCallback } from "react";
import { useAppDispatch } from "app/hooks";
import { redirectBaseUrl } from "app/constants";
import { NotificationType, ShortUrl } from "app/types";
import { useUpdateShortUrlMutation } from "app/services/shortUrl";
import { setNotification } from "app/features/Notifications/slice";

export const useUpdateShortUrl = (): [
  (shortUrl: ShortUrl) => void,
  boolean,
] => {
  const dispatch = useAppDispatch();
  const [updateShortUrl, { isLoading }] = useUpdateShortUrlMutation();

  const onUpdateShortUrl = useCallback(
    async ({ shortUrl, fullUrl }: ShortUrl) => {
      if (`${redirectBaseUrl}/${shortUrl}` === fullUrl) {
        throw new Error("Full URL can not be the same as short one");
      }

      const result = await updateShortUrl({ shortUrl, fullUrl });

      if (!("error" in result)) {
        dispatch(
          setNotification({
            message: "Successfully changed",
            type: NotificationType.SUCCESS,
          }),
        );
      }
    },
    [dispatch, updateShortUrl],
  );

  return [onUpdateShortUrl, isLoading];
};
