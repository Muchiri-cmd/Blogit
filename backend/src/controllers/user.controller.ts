import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import hashPassword from "../utils/hashPass";

const client = new PrismaClient();

const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  // console.log("Update user request",req)
  const { firstName, lastName, userName, email, profilePic } = req.body;

  // console.log(req.body)
  const id = req.userId;

  try {
    const updatedUser = await client.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        userName,
        email,
        profilePic,
      },
    });
    // console.log("updated:",updatedUser)
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Oops something is wrong, please try again",
    });
  }
};

const updatePassword = async (req: AuthenticatedRequest, res: Response) => {
  const { password } = req.body;

  const hashedPassword = await hashPassword(password);
  const id = req.userId;

  try {
    await client.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong , ooopsy",
    });
  }
};

const getUserBlogs = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.userId;

  try {
    const userBlogs = await client.blogPost.findMany({
      where: {
        authorId: id,
      },
    });
    res.status(200).json(userBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Oops. somethings wrong,please try later",
    });
  }
};

export { updateUser, updatePassword, getUserBlogs };
