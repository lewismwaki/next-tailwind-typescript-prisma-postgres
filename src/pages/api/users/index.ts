import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query = JSON.parse(JSON.stringify(req.query));
    const where: any = {};

    Object.entries(query).forEach(([key, value]: [string, any]) => {
      where[key] = JSON.parse(value);
    });

    const data = await prisma.user.findMany({
      where: where,
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
