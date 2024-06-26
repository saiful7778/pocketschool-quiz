import { connection, connect } from "mongoose";
import getEnv from "./env";

export default async function connectDB() {
  try {
    console.log("Connecting DB.....");

    connection.on("connected", () => {
      console.log("Connected");
    });

    connection.on("error", (err) => {
      console.error("Error to connecting DB", err);
    });

    const dbUrl = getEnv("dbConnect");

    await connect(dbUrl);
  } catch (err) {
    console.error("Failed to connect in DB.", err);
    process.exit(1);
  }
}
