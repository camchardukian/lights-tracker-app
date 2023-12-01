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
    console.log("try 2", name, email, password);
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const newUser = {
      name,
      email,
      password, // Note: You'll need to hash the password before saving it in production
      tasks: [], // Initialize tasks as an empty array for the new user
    };

    const result = await usersCollection.insertOne(newUser);
    console.log("rrrrrrrr", result);
    if (result.acknowledged) {
      return newUser;
    } else {
      throw new Error("Unable to insert new user into the database");
    }
  } catch (error) {
    // Log the full error object for better debugging
    console.error("Error creating user:", error);
    throw error; // Handle error appropriately
  }
}
