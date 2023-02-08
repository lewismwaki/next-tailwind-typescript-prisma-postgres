import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.user.findMany();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
