import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import config from "./config";
import multer from "multer";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(passport.initialize());
const upload = multer();
app.use(upload.none());

app.use('/api/auth', authRoutes);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
