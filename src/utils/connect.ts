import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to DB");
  } catch (err) {
    logger.error("Could not connect to DB", err);
    process.exit(1);
  }
};

export default connect;
