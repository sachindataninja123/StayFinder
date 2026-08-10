import express from "express";
import dotenv from "dotenv";
import listingRouter from "./routes/listing.routes.js";
dotenv.config();
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import reviewRouter from "./routes/review.route.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

app.get("/", (req, res) => {
  res.send("Server is connected!!");
});

app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", userRouter);

export default app;
