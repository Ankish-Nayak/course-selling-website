import express from "express";
import { router as adminRouter } from "./routes/admin";
import { router as userRouter } from "./routes/user";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);


mongoose.connect("mongodb://localhost:27017", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  dbName: "Courses",
});

app.listen(3000, () => console.log("Sever is live at 3000"));
