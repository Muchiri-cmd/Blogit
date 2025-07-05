import  { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

const registerUser = async (req:Request,res:Response) => {
    const { firstName, lastName, userName, email, password, profilePic } =
    req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        profilePic,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        profilePic: true,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong" });
  }
}

export {registerUser}