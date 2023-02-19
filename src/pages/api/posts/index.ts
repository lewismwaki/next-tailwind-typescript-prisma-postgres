import type { Prisma } from "@prisma/client";
import type { NextApiResponse, NextApiRequest } from "next";
import { handleError } from "../../../helpers/handleError";
import { createPostSchema } from "../../../schema/post";
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
      createPostSchema.parse(req.body as Prisma.PostCreateInput);
      const data = await prisma.post.create({
        data: req.body as Prisma.PostCreateInput,
      });
      return res.status(200).json(data);
    } catch (error) {
      handleError(error, res);
    }
  }
}
