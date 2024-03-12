import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the User model
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews", required:false }],
  rating: { type: Number, required: true },
  coords: {
    required:true,
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  photo: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    required:true,
    bankito: { type: Boolean, required: true },
    public: { type: Boolean, required: true },
    covered: { type: Boolean, required: true },
  },
  schedule: {
    required:true,
    monday: { type: String, required: true },
    tuesday: { type: String, required: true },
    wednesday: { type: String, required: true },
    thursday: { type: String, required: true },
    friday: { type: String, required: true },
    saturday: { type: String, required: true },
    sunday: { type: String, required: true },
  },
  date: { type: Date, default:Date.now, required: true },
  deactivated: {type:Boolean,required:true,default:false},
});

export default mongoose.model("places", schema);
