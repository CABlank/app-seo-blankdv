import mongoose from 'mongoose';

const { Schema } = mongoose;

const storeDataSchema = new Schema({
  domain: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

const StoreData = mongoose.model('StoreData', storeDataSchema);

export default StoreData;
