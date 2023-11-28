const { MongoClient, ServerApiVersion } = require("mongodb");

export default async function handler(req, res) {
  const client = new MongoClient(process.env.uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  try {
    await run();
    const db = client.db();

    // Perform MongoDB operations here
    // const collection = db.collection("tasks");
    // const tasks = await collection.find({}).toArray();

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
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
