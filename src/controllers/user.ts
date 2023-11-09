import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/users";
import jwt from "jsonwebtoken";
import config from "../config";

// Extend the Request interface to include the user property
interface ExtendedRequest extends Request {
  user?: { userId: string } | null;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res
      .status(201)
      .json({ user: { id: newUser._id, email: newUser.email } });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      reason: (error as Error)?.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Checking password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "24h",
    });

    return res.json({ jwt: token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      reason: (error as Error)?.message,
    });
  }
};

export const fetchUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: Invalid user" });
    }

    // Fetching user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      reason: (error as Error)?.message,
    });
  }
};
