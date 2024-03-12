import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }],
    rating: { type: Number, required: true },
    coords: {
        required: true,
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    photo: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: Boolean, required: true },
    coffee: { type: Boolean, required: true },
    schedule: {
        required: true,
        monday: { type: String, required: true },
        tuesday: { type: String, required: true },
        wednesday: { type: String, required: true },
        thursday: { type: String, required: true },
        friday: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true }
    },
    verified: { type: Boolean, required: true },
    date: { type: Date, required: true }
});

export default mongoose.model("housing", schema);
