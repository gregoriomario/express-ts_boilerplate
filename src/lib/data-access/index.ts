import { PrismaClient } from "@prisma/client";
import { userOperation } from "./user.db";

export const prisma = new PrismaClient();

export const userDb = userOperation({ dbDriver: prisma });
