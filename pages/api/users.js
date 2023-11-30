import { connectToDatabase } from "../../db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    try {
      const newUser = await createUser(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export async function createUser(name, email, password) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const newUser = {
      name,
      email,
      password, // Note: You'll need to hash the password before saving it in production
      tasks: [], // Initialize tasks as an empty array for the new user
    };

    const result = await usersCollection.insertOne(newUser);

    if (result.insertedCount === 1) {
      return newUser;
    } else {
      return null; // User creation failed
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Handle error appropriately
  }
}

export async function getUserTasks(userId) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return null; // User not found
    }

    return user.tasks || [];
  } catch (error) {
    console.error("Error getting user tasks:", error);
    throw error; // Handle error appropriately
  }
}
