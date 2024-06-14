import getEnv from "./env";

export default function devDebug(inputText: string) {
  const nodeEnv = getEnv("nodeEnv");
  if (nodeEnv !== "production") {
    console.log("debug:", inputText);
  }
}
