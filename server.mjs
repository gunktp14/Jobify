import cors from "cors";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from 'morgan'

//db and authenticateUser
import connectDB from "./db/connect.mjs";

//routers
import authRouter from "./routes/authRoutes.mjs";
import jobRouter from "./routes/jobsRoutes.mjs";

//middleware
import notFoundMiddleware from "./middleware/not-found.mjs";
import errorHandlerMiddleware from "./middleware/error-handler.mjs";
import authenticateUser from './middleware/auth.mjs';
app.use(cors());



if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'))
}

app.use(express.json());

app.get("/", (req, res) => {
  res.json({msg:'Welcome!'})
});

app.get("/api/v1", (req, res) => {
  res.json({msg:'jobs API'})
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser,jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 5000;
const testEnv = process.env.root || "localhost";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`, `root : ${testEnv}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
