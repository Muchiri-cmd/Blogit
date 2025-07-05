import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const client = new PrismaClient();

const createBlogPost = async (req: AuthenticatedRequest, res: Response) => {
  const { title, synopsis, content, featuredImg } = req.body;

  // console.log("logged in userId:", req.userId);

  if (!req.userId) {
    res.status(401).json({ error: "Unauthorized: No user ID" });
  }

  try {
    const newBlog = await client.blogPost.create({
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        author: {
          connect: { id: req.userId },
        },
      },
    });
    res.status(200).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong, please try again",
    });
  }
};

const getAllBlogPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const allUserBlogs = await client.blogPost.findMany({
    //   where: {
    //     authorId: req.userId,
    //   },
    });
    res.status(200).json(allUserBlogs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ooops. Something went wrong, please try again later" });
  }
};
export { createBlogPost, getAllBlogPosts };
