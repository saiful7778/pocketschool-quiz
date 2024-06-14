import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("no .env file found");
}

const envVars = {
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL,
  nodeEnv: process.env.NODE_ENV,
  dbConnect: process.env.DB_CONNECT,
  accessToken: process.env.ACCESS_TOKEN,
};

export default function getEnv(varName: string): string {
  if (typeof envVars[varName] === "undefined") {
    console.error(`'${varName}' is not available`);
    process.exit(1);
  } else {
    return envVars[varName];
  }
}
