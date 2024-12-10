import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      await prisma.comment.deleteMany();
      await prisma.photo.deleteMany();

      return res.status(200).json({ message: "Database reset successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error resetting database:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
