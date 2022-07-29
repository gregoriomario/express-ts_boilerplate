import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PUB_KEY = process.env.PUB_KEY?.replace(/\\n/g, "\n") || "";
export const PRIV_KEY = process.env.PRIV_KEY?.replace(/\\n/g, "\n") || "";
export const DATABASE_URL = process.env.DATABASE_URL || "";