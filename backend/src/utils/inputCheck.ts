import type { Response } from "express";
import devDebug from "./devDebug";

/**
 * This is function check is all inputs element are available
 * @param inputs
 * @param res Express response
 * @returns `true` or `false`
 */
export default function inputCheck(
  inputs: string[] | number[] | undefined[] | null[] | unknown[],
  res: Response
) {
  const inputDataType = [];
  for (let i = 0; i < inputs.length; i++) {
    if (typeof inputs[i] === "undefined") {
      inputDataType.push(undefined);
    }
  }
  if (inputDataType.includes(undefined)) {
    devDebug("invalid input data");
    res.status(400).json({
      success: false,
      message: "Invalid input data",
    });
    return false;
  }
  return true;
}
