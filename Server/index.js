import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5174", `${process.env.FRONTEND}`];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

const uri = process.env.DB_URL;
const jwtSecret = process.env.JWT_SECRET || "super_secret";

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

    const db = client.db("EventHub");
    const eventsCollection = db.collection("events");
    const usersCollection = db.collection("users");

    // Register Route
    app.post("/register", async (req, res) => {
      const { name, email, password, photo } = req.body;

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(409).send({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { name, email, password: hashedPassword, photo };

      await usersCollection.insertOne(newUser);
      res.send({ message: "User registered successfully" });
    });

    // Login Route
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
        },
        jwtSecret,
        { expiresIn: "1d" }
      );

      res.send({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
        },
      });
    });

    // Get all events
    app.get("/events", async (req, res) => {
      try {
        const result = await eventsCollection.find().toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // Add a new Event
    app.post("/events", async (req, res) => {
      try {
        const { title, organizer, date, location, description } = req.body;
        const newEvent = {
          title,
          organizer,
          date,
          location,
          description,
          attendees: 0,
        };
        const result = await eventsCollection.insertOne(newEvent);
        res.send({ insertedId: result.insertedId });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // Update an Event
    app.put("/events/:id", async (req, res) => {
      const eventId = req.params.id;
      const updatedEvent = req.body;

      try {
        const result = await eventsCollection.updateOne(
          { _id: new ObjectId(eventId) },
          {
            $set: {
              title: updatedEvent.title,
              organizer: updatedEvent.organizer,
              date: updatedEvent.date,
              location: updatedEvent.location,
              description: updatedEvent.description,
            },
          }
        );

        if (result.modifiedCount > 0) {
          res.send({ message: "Event updated successfully" });
        } else {
          res.status(404).send({ message: "Event not found or unchanged" });
        }
      } catch (error) {
        res
          .status(500)
          .send({ error: "Failed to update event", details: error });
      }
    });

    app.patch("/events/:id/join", async (req, res) => {
      const { id } = req.params;
      const result = await eventsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { attendees: 1 } }
      );
      res.send(result);
    });

    // Delete an Event
    app.delete("/events/:id", async (req, res) => {
      const eventId = req.params.id;

      try {
        const result = await eventsCollection.deleteOne({
          _id: new ObjectId(eventId),
        });

        if (result.deletedCount > 0) {
          res.send({ message: "Event deleted successfully" });
        } else {
          res.status(404).send({ message: "Event not found" });
        }
      } catch (error) {
        res
          .status(500)
          .send({ error: "Failed to delete event", details: error });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect:", error);
  }
}

run();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
