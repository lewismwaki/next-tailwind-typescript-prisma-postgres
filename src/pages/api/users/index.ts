import type { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    type Query = Record<string, string | number | boolean | null | undefined>;
    const where: Record<string, Query> = {};
    Object.entries(req.query as Query).forEach(([key, value]) => {
      where[key] = JSON.parse(value as string) as Query;
    });

    const data = await prisma.user.findMany({
      where,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
