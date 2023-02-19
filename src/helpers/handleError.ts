import { Prisma } from "@prisma/client";
import type { NextApiResponse } from "next";
import { ZodError } from "zod";

export const handleError = (error: unknown, res: NextApiResponse) => {
  console.log(error);
  if (error instanceof ZodError) {
    return res.status(400).json(
      error.issues.map((issue) => ({
        message: issue.message,
      }))
    );
  }
  if (
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    console.log(error);
    return res
      .status(500)
      .json([{ message: error.message.split("invocation:\n\n\n")[1] }]);
  }

  return res.status(500).json(error);
};
