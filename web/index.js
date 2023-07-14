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

 
const PORTPROCC = process.env.PORT || 3001; // Changed to another port (3001) to avoid EADDRINUSE error


import { defineConfig } from "vite";
const BACKEND_PORT = 3001;
const FRONTEND_PORT = 3000;

import { dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";
import react from "@vitejs/plugin-react";

// ...rest of your code...

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/dist` // Updated this line
    : `${process.cwd()}/frontend/`;

// Add log to verify static path
console.log(`Serving static files from ${STATIC_PATH}`);

// Add log to verify index.html exists
console.log(`Index file exists: ${existsSync(join(STATIC_PATH, 'index.html'))}`);

const app = express();

app.use(cors());

// ...rest of your code...

app.use(serveStatic(STATIC_PATH, { index: false }));

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

// ...rest of your code...

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html"))); // Updated this line
});

app.listen(PORTPROCC, () => console.log(`Server is running on port ${PORTPROCC}`));
