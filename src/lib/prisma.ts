import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = `${process.env.DATABASE_URL || "file:./demo.db"}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
