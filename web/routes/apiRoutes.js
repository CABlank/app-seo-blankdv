import express from 'express';

import StoreData from '../models/StoreData.js';


const router = express.Router();

router.get('/data/:storeDomain', async (req, res) => {
    const { storeDomain } = req.params;

    const storeData = await StoreData.findOne({ domain: storeDomain });

    if (!storeData) {
        return res.status(404).send({ error: 'No data found for this store' });
    }

    return res.send(storeData);
});

export default router;
