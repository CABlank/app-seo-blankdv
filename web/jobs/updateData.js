import cron from 'node-cron';
import fetchDataForStore from '../utils/fetchDataForStore.js';
import StoreData from '../models/StoreData.js';

// schedule a job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  const stores = await StoreData.find({});

  for (const store of stores) {
    await fetchDataForStore(store.domain);
  }
});
