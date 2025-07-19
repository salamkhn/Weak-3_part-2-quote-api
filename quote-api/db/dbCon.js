import mongoose from "mongoose";

export const dbsCon = () => {
  try {
    mongoose.connect(process.env.MONGODB_SECRETE);
    console.log("database successfully connected");
  } catch (err) {
    console.log("dbs connection failed :", err.message);
  }
};
