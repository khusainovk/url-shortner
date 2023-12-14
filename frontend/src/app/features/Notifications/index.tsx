import { FC, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { RootState } from "app/store";
import { clearNotification } from "./slice";

export const Notifications: FC = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(
    (state: RootState) => state.notifications.notification,
  );

  const onClose = useCallback(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  if (!notification) {
    return null;
  }

  return (
    <Snackbar
      open={true}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={notification.type} sx={{ width: "100%" }}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};
