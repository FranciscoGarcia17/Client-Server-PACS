import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  año: { type: Number, required: true },
  reparto: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  provider: { type: String, required: true },
  category: { type: String, required: true },
  video: { type: String},
  userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const MovieModel = mongoose.model("Movies", movieSchema);
