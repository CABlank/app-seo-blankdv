import { mongoose } from "mongoose";
const { Schema } = mongoose;

const seoDataSchema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    keyword: { type: String, required: true },
    rank: { type: Number, required: true },
    search_volume: { type: Number },
    competition: { type: Number },
    cpc: { type: Number },
    fetch_date: { type: Date, required: true },
  }, { timestamps: true });



  const SeoData = mongoose.model('SeoData', seoDataSchema);

export default SeoData;