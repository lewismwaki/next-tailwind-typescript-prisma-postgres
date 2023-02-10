import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    try {
      const query = JSON.parse(JSON.stringify(req.query));
      const where: any = {};

      Object.entries(query).forEach(([key, value]: [string, any]) => {
        where[key] = JSON.parse(value);
      });

      const data = await prisma.post.findMany({
        where: where,
      });

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const data = await prisma.post.create({ data: req.body });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(200).json(error);
    }
  }
}
