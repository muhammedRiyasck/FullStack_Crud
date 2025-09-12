import app from "./app";
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
