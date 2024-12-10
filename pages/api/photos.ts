import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const photos = await prisma.photo.findMany({
        include: { comments: true },
      });
      return res.status(200).json(photos);
    }

    if (req.method === "POST") {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: "Photo URL is required" });
      }

      const newPhoto = await prisma.photo.create({
        data: { url },
      });

      return res.status(201).json(newPhoto);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
