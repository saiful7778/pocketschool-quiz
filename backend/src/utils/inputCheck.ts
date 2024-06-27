import type { NextFunction } from "express";
import createHttpError from "http-errors";

/**
 * This is function check is all inputs element are available
 * @param inputs
 * @param res Express response
 * @returns `true` or `false`
 */
export default function inputCheck(
  inputs: string[] | number[] | undefined[] | null[] | unknown[],
  next: NextFunction
) {
  const inputDataType = [];
  for (let i = 0; i < inputs.length; i++) {
    if (typeof inputs[i] === "undefined") {
      inputDataType.push(undefined);
    }
  }
  if (inputDataType.includes(undefined)) {
    next(createHttpError(400, "Invalid input data"));
    return false;
  }
  return true;
}
