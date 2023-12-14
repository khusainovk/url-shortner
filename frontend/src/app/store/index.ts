import { configureStore } from "@reduxjs/toolkit";
import { shortUrlApi } from "app/services/shortUrl";
import notificationsReducer from "app/features/Notifications/slice";
import { rtkQueryErrorLogger } from "./middleware";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    [shortUrlApi.reducerPath]: shortUrlApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shortUrlApi.middleware)
      .prepend(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
