import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User";
import Username from "@/model/Username";

//GET /api/users

export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const isAdmin = req.query.isAdmin === "true" || false;
  try {
    const filters = isAdmin ? { isAdmin: true } : {};
    const users = await User.find(filters);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//POST /api/users
export async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, isAdmin = true } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      isAdmin: isAdmin || false,
      createdAt: new Date(),
    });

    await user.save();
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//PUT /api/users/:id
export async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, email, username, isAdmin } = req.body;
  try {
    // Ensure the username is not empty or contains only whitespace
    if (username && username.trim() === "") {
      return res.status(400).json({ error: "Username cannot be empty" });
    }

    //If username is being updated, check for uniqueness
    if (username) {
      const existUsername = await Username.findOne({ username });
      if (existUsername && existUsername.userId.toString() !== id) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }

    // Update user and associated username
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, isAdmin, username },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //Update associated username if it exists

    if (user) {
      await Username.findOneAndUpdate(
        { userId: user._id },
        { username },
        { new: true }
      );
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server eror" });
  }
}

//DELETE /api/users/:id
export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.query.id) {
      // return getUserByUsername(req, res);
    }
    return getUsers(req, res);
  } else if (req.method === "POST") {
    return createUser(req, res);
  } else if (req.method === "PUT") {
    return updateUser(req, res);
  } else if (req.method === "DELETE") {
    return deleteUser(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
