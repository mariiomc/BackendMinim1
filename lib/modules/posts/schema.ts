import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the User model
  reviews: { type: Schema.Types.ObjectId, ref: "reviews" },
  rating: { type: Number, required: true },
  cords: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  photo: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    bankito: { type: Boolean, required: true },
    public: { type: Boolean, required: true },
    covered: { type: Boolean, required: true },
  },
  schedule: {
    monday: { type: String, required: true },
    tuesday: { type: String, required: true },
    wednesday: { type: String, required: true },
    thursday: { type: String, required: true },
    friday: { type: String, required: true },
    saturday: { type: String, required: true },
    sunday: { type: String, required: true },
  },
  date: { type: Date, required: true },
});

export default mongoose.model("posts", schema);
