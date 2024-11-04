import express from "express";
import mongoose from "mongoose";
import contactRouter from "./router/contactsRoute.js";
import cors from "cors";
import bodyParser from "body-parser";

const EXPRESS_PORT = 3000;
const MONGO_DB_NAME = "address_book";
const mongoDB = `mongodb://127.0.0.1:27017/${MONGO_DB_NAME}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3`;

const app = express();

try {
  await mongoose.connect(mongoDB);
  console.log("Mongoose connected");
} catch {
  console.log("Mongoose connection error");
}

app.use(cors());
app.use(bodyParser.json());

app.use("/api", contactRouter);

app.listen(EXPRESS_PORT, () => {
  console.log(`Server running at: http://localhost:${EXPRESS_PORT}`);
});
