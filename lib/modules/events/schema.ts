import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  user: [{ type: String, ref: "users", required:false }],
  edicionUser: {type: String, required: false},
  ultimoLogin: {type: Date,required:false,default:new Date()},
  event_deactivated: {type:Boolean,required:true,default:false},

});

export default mongoose.model('reviews', schema);