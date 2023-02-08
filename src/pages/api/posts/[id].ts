import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { method } = req;

  //get post
  if (method === "GET") {
    try {
      const data = await prisma.post.findUniqueOrThrow({
        where: { id: Number(id) },
        include: {
          user: true,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
      });

      if (!post) {
        return res.status(404).json({ message: "This post doesn't exist" });
      }

      await prisma.post.delete({
        where: { id: Number(id) },
      });

      const postStillExists = await prisma.post.findUnique({
        where: { id: Number(id) },
      });

      if (!postStillExists) {
        return res.status(200).json({
          message: "Post deleted successfully",
          post: post,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
