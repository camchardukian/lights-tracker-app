const { MongoClient, ServerApiVersion } = require("mongodb");

let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
  }

  return client.db();
}

module.exports = {
  connectToDatabase,
};
