import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import serverHelper from "../../../utils/serverHelper";
import Jimp from "jimp";

export default function generateImageController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { text } = req.body;

  if (!text) {
    return next(createHttpError(400, "text is required"));
  }

  serverHelper(async () => {
    const width = 250;
    const height = Math.round((width / 16) * 9);
    const image = await Jimp.create(width, height, "#eeeeee");
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

    // Calculate the position to center the text
    const textWidth = Jimp.measureText(font, text);
    const textHeight = Jimp.measureTextHeight(font, text, width);
    const x = (width - textWidth) / 2;
    const y = (height - textHeight) / 2;

    image.print(font, x, y, text, width);
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

    res.set("Content-Type", Jimp.MIME_PNG);
    res.send(buffer);
  }, next);
}
