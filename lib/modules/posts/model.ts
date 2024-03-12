import * as mongoose from 'mongoose';

export interface IPost {
    _id?: mongoose.Types.ObjectId; // Optional _id field
    title: String;
    content: String;
    author: mongoose.Types.ObjectId; // Reference to the User collection
    review?: mongoose.Types.ObjectId;
    rating: Number;
    cords: {
        latitude: Number;
        longitude: Number;
    }
    photo: string;
    location: string;
    type: {
        bankito: boolean;
        public: boolean; //false = private true = public
        covered: boolean;
    }
    schedule: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    }
    date: Date;
}