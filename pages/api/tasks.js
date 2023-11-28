import { connectToDatabase } from "../../db";

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();

    // Perform MongoDB operations here
    const collection = db.collection("tasks");
    const tasks = await collection.find({}).toArray();

    res.status(200).json({
      data: [
        {
          name: "wake up before 8am",
          days: [
            { day: 1, completed: "yes" },
            { day: 2, completed: "no" },
            { day: 3, completed: "yes" },
            { day: 4, completed: "no" },
            { day: 5, completed: "no" },
            { day: 6, completed: "no" },
            { day: 7, completed: "no" },
          ],
          id: 1,
        },
        {
          name: "exercise",
          days: [
            { day: 1, completed: "yes" },
            { day: 2, completed: "half" },
            { day: 3, completed: "yes" },
            { day: 4, completed: "no" },
            { day: 5, completed: "no" },
            { day: 6, completed: "no" },
            { day: 7, completed: "no" },
          ],
          id: 2,
        },
        {
          name: "meditate 10 minutes",
          days: [
            { day: 1, completed: "no" },
            { day: 2, completed: "no" },
            { day: 3, completed: "half" },
            { day: 4, completed: "no" },
            { day: 5, completed: "no" },
            { day: 6, completed: "no" },
            { day: 7, completed: "no" },
          ],
          id: 3,
        },
        {
          name: "30 minute nap",
          days: [
            { day: 1, completed: "yes" },
            { day: 2, completed: "yes" },
            { day: 3, completed: "yes" },
            { day: 4, completed: "no" },
            { day: 5, completed: "no" },
            { day: 6, completed: "no" },
            { day: 7, completed: "no" },
          ],
          id: 4,
        },
      ],
    });
    // res.status(200).json({ data: tasks });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
