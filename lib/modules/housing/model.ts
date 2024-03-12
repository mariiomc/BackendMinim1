import * as mongoose from 'mongoose';

export interface IHousing {
    _id?: mongoose.Types.ObjectId; // Optional _id field
    title: string;
    description: string;
    owner: mongoose.Types.ObjectId; // Reference to the User collection
    reviews?: mongoose.Types.ObjectId[];
    rating: number;
    coords: {
        latitude: number;
        longitude: number;
    };
    photo: string;
    location: string;
    availability: boolean;
    coffee: boolean; //true only "coffee" 
    schedule: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    verified: boolean;
    date: Date;
    deactivated: boolean;
}