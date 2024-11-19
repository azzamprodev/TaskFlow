import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import tasksRouter from "./routes/tasks.mjs";
import signUpRouter from "./routes/sign-up.mjs";
import signInRouter from "./routes/sign-in.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

mongoose
  .connect(process.env.MONGO_URI, console.log("Loading...."))
  .then(() => {
    console.log("Connected to the server");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Adjust based on environment
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials to be sent
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(tasksRouter);
app.use(signUpRouter);
app.use(signInRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
