import express from "express";
import dotenv from "dotenv";
import listingRouter from "./routes/listing.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is connected!!");
});

app.use("/api/v1/listings", listingRouter);

export default app;
