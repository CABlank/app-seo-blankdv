// @ts-check
import { join } from "path";
import { readFileSync, existsSync } from "fs";
import express from "express";
import cors from "cors";
import serveStatic from "serve-static";
import mongoose from "mongoose"
import apiRoutes from './routes/apiRoutes.js';
import './jobs/updateData.js';

import SeoData from './models/SeoData.js';
import Session from './models/Session.js';

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

import dotenv from 'dotenv';
dotenv.config();

const MONGODB_CONNECTION_STRING = 'mongodb+srv://carlosblank333:9tQPbFvcUR369XIt@cluster0.0r2skgb.mongodb.net/test?retryWrites=true&w=majority'; 

// Connecting to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected!');
  } catch (err) {
    console.log(err);
  }
};
connectDB();

const PORTPROCC = process.env.PORT || 3001;

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/web/frontend/dist/`  // Changed to reflect your solution
    : `${process.cwd()}/frontend/`;

console.log(`Serving static files from ${STATIC_PATH}`);
console.log(`Index file exists: ${existsSync(join(STATIC_PATH, 'index.html'))}`);

const app = express();

app.use(cors());
app.use(serveStatic(STATIC_PATH, { index: false }));
app.use("/api/*", shopify.validateAuthenticatedSession());
app.use(express.json());

const ensureInstalledOnShop = async (req, res, next) => {
  const shop = req.query.shop;

  if (!shop) {
      console.error("ensureInstalledOnShop did not receive a shop query argument");
      return res.status(400).send("Missing shop parameter");
  }

  // Check if the app is installed on the shop
  const isInstalled = await isAppInstalledOnShop(shop);

  if (!isInstalled) {
      // If it's not installed, redirect to install process
      const installUrl = getInstallUrl(shop);
      return res.redirect(installUrl);
  }

  // If it's installed, proceed
  next();
}


app.listen(PORTPROCC, () => console.log(`Server is running on port ${PORTPROCC}`));
