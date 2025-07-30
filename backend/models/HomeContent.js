import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  number: String,
  label: String,
});

const HomeContentSchema = new mongoose.Schema({
  title: String,
  intro: String,
  description: String,
  contact: String,
  stats: [StatSchema],
});

export default mongoose.model("HomeContent", HomeContentSchema);
