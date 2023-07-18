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

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/web/frontend/dist/`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html"))); // The path here is also updated
});




app.listen(PORT);
