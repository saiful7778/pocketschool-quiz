import getEnv from "./env";

/**
 * This is function output `console.log();` only development mode
 * @param inputText string
 */
export default function devDebug(inputText: string) {
  const nodeEnv = getEnv("nodeEnv");
  if (nodeEnv !== "production") {
    console.log("debug:", inputText);
  }
}
