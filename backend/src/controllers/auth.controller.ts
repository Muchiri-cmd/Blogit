import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import hashPassword, { comparePassword } from "../utils/hashPass";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const client = new PrismaClient();

const registerUser = async (req: Request, res: Response): Promise<void> => {
  console.log("request body:", req.body)
  const { firstName, lastName, userName, email, password, profilePic } =
    req.body;

  try {
    if (!firstName || !lastName || !userName || !email || !password) {
      res.status(400).json({ error: "All required fields must be provided" });
      return;
    }

    const existingUser = await client.user.findFirst({
      where: {
        OR: [
          { userName },
          { email },
        ],
      },
    });

    if (existingUser) {
      res.status(409).json({ error: "Username or email already in use" });
      return;
    }

    const hashedPassword = await hashPassword(password);

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
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    const { password: _, ...safeUser } = user;

    res.status(200).json({
      token,
      user: safeUser,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const logoutUser = async (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    message: "Logout successful.",
  });
};

export { registerUser, loginUser, logoutUser };
