import type { Response } from "express";

export default function inputCheck(
  inputs: string[] | number[] | undefined[] | null[],
  res: Response
) {
  let inputDataType = [];
  for (let i = 0; i < inputs.length; i++) {
    if (typeof inputs[i] === "undefined") {
      inputDataType.push(undefined);
    }
  }
  if (inputDataType.includes(undefined)) {
    res.status(400).send({ success: false, message: "invalid input data" });
    return false;
  }
  return true;
}
