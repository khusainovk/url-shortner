export interface ShortUrl {
  shortUrl: string;
  fullUrl: string;
}

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
}

export interface Notification {
  type: NotificationType;
  message: string;
}
