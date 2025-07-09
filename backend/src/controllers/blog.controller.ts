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
      include: {
        author: {
          select: {
            userName: true,
            profilePic: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(allUserBlogs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ooops. Something went wrong, please try again later" });
  }
};

const getBlogById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await client.blogPost.findFirst({
      where: {
        id: Number(id),
      },
    });

    blog
      ? res.status(200).json(blog)
      : res.status(404).json({
          message: "Blog post not found",
        });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ooops. Something went wrong, please try again later" });
  }
};

const updateBlog = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, synopsis, content, featuredImg } = req.body;

  try {
    const updatedBlog = await client.blogPost.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        synopsis,
        content,
        featuredImg,
      },
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ooops. Something went wrong, please try again",
    });
  }
};

const deleteBlog = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    await client.blogPost.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Oops. Something went wrong, please try again",
    });
  }
};
export { createBlogPost, getAllBlogPosts, getBlogById, updateBlog, deleteBlog };
