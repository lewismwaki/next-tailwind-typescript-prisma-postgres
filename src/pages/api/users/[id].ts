import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {
        posts: true,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
