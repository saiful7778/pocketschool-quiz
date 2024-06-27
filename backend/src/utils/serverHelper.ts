import type { NextFunction } from "express";
import createHttpError from "http-errors";

/**
 * This function resolve all promises in this server app
 * @param inputFunction
 * @param res
 */
export default async function serverHelper(
  inputFunction: () => Promise<void>,
  next: NextFunction
) {
  try {
    await inputFunction();
  } catch {
    return next(createHttpError(500, "server error from serverHelper"));
  }
}
