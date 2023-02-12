import type { Post } from "@prisma/client";
import type { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    try {
      type Query = Record<string, string | number | boolean | null | undefined>;
      const where: Record<string, Query> = {};
      Object.entries(req.query as Query).forEach(([key, value]) => {
        where[key] = JSON.parse(value as string) as Query;
      });

      const data = await prisma.post.findMany({
        where: where,
      });

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
  }

  if (method === "POST") {
    try {
      const data = await prisma.post.create({ data: req.body as Post });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(200).json(error);
    }
  }
}
