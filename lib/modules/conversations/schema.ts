import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true } // Reference to the User model
});

export default mongoose.model('conversations', schema);