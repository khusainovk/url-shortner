import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "app/types";

// May be extended to have a collection of notifications
export interface NotificationsState {
  notification?: Notification | null;
}

const initialState: NotificationsState = {
  notification: undefined,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { setNotification, clearNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
