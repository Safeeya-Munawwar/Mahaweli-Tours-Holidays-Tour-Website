import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  duration: { type: String },  
  price: { type: Number },      
  type: { type: String },
  imageUrl: { type: String, required: true },
  imageFileName: { type: String },
});

export default mongoose.model("Tour", TourSchema);
