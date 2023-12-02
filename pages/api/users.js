import bcrypt from "bcryptjs";
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      tasks: [],
    };

    const result = await usersCollection.insertOne(newUser);

    if (result.acknowledged) {
      return newUser;
    } else {
      throw new Error("Unable to insert new user into the database");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// async function checkIfUserExists(email) {
//   try {

//   } catch (error) {

//   }
// }
