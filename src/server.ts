import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import config from "./config";
import authRoutes from "./routes/authRoutes";
import itemRoutes from "./routes/itemRoutes";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/item', itemRoutes);


mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
