import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { photoId, text } = req.body;

      if (!photoId || !text) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      const photoExists = await prisma.photo.findUnique({
        where: { id: photoId },
      });

      if (!photoExists) {
        return res.status(404).json({ error: "Photo not found" });
      }

      const newComment = await prisma.comment.create({
        data: { text, photoId },
      });

      return res.status(201).json(newComment);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
