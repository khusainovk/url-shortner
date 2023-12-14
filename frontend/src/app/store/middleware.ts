import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { NotificationType } from "app/types";
import { setNotification } from "app/features/Notifications/slice";

interface ErrorActionPayload {
  error: string;
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      api.dispatch(
        setNotification({
          message: (action.payload as ErrorActionPayload).error,
          type: NotificationType.ERROR,
        }),
      );
    }

    return next(action);
  };
