import { Application } from "express";
import { appRouter } from "./app";
import { apiRouter } from "./api";

export const routes = (app: Application) => {
  app.use("/", appRouter);
  app.use("/api", apiRouter);
};
