import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

const uri = process.env.DB_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const eventsCollection = client.db("EventHub").collection("events");

    // Get all events
    app.get("/events", async (req, res) => {
      try {
        const result = await eventsCollection.find().toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // // Add a new comment
    // app.post("/comments", async (req, res) => {
    //   try {
    //     const { featureId, text, parentId = null, depth = 0 } = req.body;

    //     const newComment = {
    //       featureId,
    //       text,
    //       parentId,
    //       depth,
    //       createdAt: new Date(),
    //     };

    //     const result = await commentsCollection.insertOne(newComment);

    //     res.send({ insertedId: result.insertedId });
    //   } catch (err) {
    //     res.status(500).send({ error: err.message });
    //   }
    // });

    // // Delete a comment
    // app.delete("/comments/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const result = await commentsCollection.deleteOne({
    //       _id: new ObjectId(id),
    //     });
    //     res.send(result);
    //   } catch (err) {
    //     res.status(500).send({ error: err.message });
    //   }
    // });

    // // Edit a comment
    // app.put("/comments/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const { newText } = req.body;

    //     const result = await commentsCollection.updateOne(
    //       { _id: new ObjectId(id) },
    //       { $set: { text: newText } }
    //     );

    //     res.send(result);
    //   } catch (err) {
    //     res.status(500).send({ error: err.message });
    //   }
    // });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  }
}

run();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
