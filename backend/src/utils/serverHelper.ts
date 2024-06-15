import type { Response } from "express";
import devDebug from "./devDebug";

export default async function serverHelper(
  inputFunction: () => Promise<void>,
  res: Response
) {
  try {
    await inputFunction();
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      devDebug(err.message);
      res.status(500).send({
        success: false,
        message: "Server error",
      });
    }
  }
}
