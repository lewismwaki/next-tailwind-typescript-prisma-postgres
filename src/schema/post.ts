import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string({ required_error: "title is required" }),
  published: z.boolean({ required_error: "published is required" }),
  content: z.string().nullable().optional(),
  userId: z.number({ required_error: "userId is required" }),
});
