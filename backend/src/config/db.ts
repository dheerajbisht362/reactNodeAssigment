import mongoose from 'mongoose';
import { env } from './env';

/**
 * Select the correct MongoDB URI based on the environment.
 * Tests use TEST_MONGODB_URI (separate test database on Atlas).
 */
const getMongoUri = (): string => {
  if (env.NODE_ENV === 'test' && env.TEST_MONGODB_URI) {
    return env.TEST_MONGODB_URI;
  }
  return env.MONGODB_URI;
};

/**
 * Connect to MongoDB Atlas using Mongoose.
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(getMongoUri(), {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      appName: 'crm-backend',
    } as mongoose.ConnectOptions);
    console.log(`✅ MongoDB connected: ${getMongoUri().replace(/\/\/.*:.*@/, '//***:**@')}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB (used for graceful shutdown and test teardown).
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
  }
};
