import axios from 'axios';
import StoreData from '../models/StoreData.js';

async function fetchDataForStore(storeDomain) {
  try {
    const response = await axios.get(`https://api.dataforseo.com/...`);

    let storeData = await StoreData.findOne({ domain: storeDomain });

    if (!storeData) {
      storeData = new StoreData({ domain: storeDomain });
    }

    storeData.data = response.data;
    storeData.lastUpdated = Date.now();

    await storeData.save();
  } catch (err) {
    console.error(`Failed to fetch data for store ${storeDomain}:`, err);
  }
}

export default fetchDataForStore;
