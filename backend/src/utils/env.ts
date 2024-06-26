import { config } from "dotenv";

config();

// all `.env` keys
const envVars = {
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL,
  nodeEnv: process.env.NODE_ENV,
  dbConnect: process.env.DB_CONNECT,
  accessToken: process.env.ACCESS_TOKEN,
};

/**
 * This function return `.env` key and throw error when key unavailable
 * @param varName
 * @returns `.env` key value as string
 */
export default function getEnv(varName: string): string {
  if (typeof envVars[varName] === "undefined") {
    console.error(`'${varName}' is not available`);
    process.exit(1);
  } else {
    return envVars[varName];
  }
}
