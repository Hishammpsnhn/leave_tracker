import mongoose from 'mongoose';
import { config } from 'dotenv';

config();
const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    console.log(mongoUri)

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
