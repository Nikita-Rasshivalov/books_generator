import "./config.ts";
import express from "express";
import cors from "cors";
import booksRouter from "./routes/booksRouter.ts";

const app = express();
const allowedOrigins = [
  "http://localhost:3100",
  "http://localhost:3000",
  "http://localhost",
  "https://frontend-production-ed8d.up.railway.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/books", booksRouter);
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started ", PORT);
});
