import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    phone_number: {type:String,required:true},
    gender: {type:String,required:true},
    posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }], // Array of ObjectIds referencing the Post model
    reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }] // Array of ObjectIds referencing the Post model
    }
);

export default mongoose.model('users', schema);
