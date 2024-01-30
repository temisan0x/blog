import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Username from "@/model/Username";
import User from "@/model/User";
import { authOptions } from "./auth/[...nextauth]/[...nextauth.ts]";

// POST /api/usernames
export async function createUsername(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      console.error("Unauthorized - No valid session found");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { username } = req.body;
    const userId = session.user.email; // Assuming email is the unique identifier for your user

    if (!username) {
      console.error("Username is required");
      return res.status(400).json({ error: "Username is required" });
    }

    // Generate a unique identifier for the username
    const usernameId = generateUniqueId();

    const existingUsername = await Username.findOne({ usernameId });

    if (existingUsername) {
      console.error("Username already exists");
      return res.status(409).json({ error: "Username already taken" });
    }

    const user = await User.findOne({ email: userId });

    if (!user) {
      console.error(`User not found for email: ${userId}`);
      return res.status(404).json({ error: "User not found" });
    }

    const newUsername = await Username.create({
      usernameId,
      username,
      userId: user._id,
    });

    console.log("New Username created:", newUsername);

    res.status(201).json(newUsername);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to generate a unique identifier
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// GET /api/usernames/:userId
export async function getUsernameByUserId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  try {
    // Use async/await to wait for the result of User.findOne
    console.log(`Fetching user data for email: ${userId}`);
    const user = await User.findOne({ email: userId });

    if (!user) {
      console.error(`User not found for email: ${userId}`);
      return res.status(404).json({ error: "User not found" });
    }

    const usernameData = await Username.findOne({ userId: user._id });
    console.log("Username Data",usernameData)

    if (!usernameData) {
      console.error(`Username not found for user with email: ${userId}`);
      return res.json({ username: null, error: "Username not found" });
    }
    return res.status(200).json({ username: usernameData.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return createUsername(req, res);
  } else if (req.method === "GET") {
    return getUsernameByUserId(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
