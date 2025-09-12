// server/src/app.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import nocache from 'nocache';

import userRoute from './routes/userRoutes';
import adminRoute from './routes/adminRoutes'
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true,               // allow sending cookies
}));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(nocache())
app.use('/api',userRoute)
app.use('/api',adminRoute)



export default app;
