import type { Prisma } from "@prisma/client";
import type { NextApiResponse, NextApiRequest } from "next";
import { handleError } from "../../../helpers/handleError";
import { createUserSchema } from "../../../schema/user";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method == "GET") {
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

  if (method == "POST") {
    try {
      createUserSchema.parse(req.body as Prisma.UserCreateInput);
      const data = await prisma.user.create({
        data: req.body as Prisma.UserCreateInput,
      });
      return res.status(201).json(data);
    } catch (error) {
      handleError(error, res);
    }
  }
}
