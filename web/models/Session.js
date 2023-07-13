import { mongoose } from "mongoose";
const { Schema } = mongoose;

const sessionSchema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    token: { type: String, required: true },
    expires_at: { type: Date, required: true },
  }, { timestamps: true });



const Session = mongoose.model('Session', sessionSchema);

export default Session;