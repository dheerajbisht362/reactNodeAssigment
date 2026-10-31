import app from './app';
import { connectDB, disconnectDB } from './config/db';
import { env } from './config/env';

const PORT = env.PORT;

let server: any;

/**
 * Start the server after connecting to MongoDB Atlas
 */
const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 Swagger docs available at http://localhost:${PORT}/api/docs`);
      console.log(`🔗 Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

/**
 * Graceful shutdown on SIGTERM / SIGINT
 */
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n⚡ ${signal} received. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log('🛑 HTTP server closed');
    });
  }
  await disconnectDB();
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled rejections
process.on('unhandledRejection', (err: any) => {
  console.error('❌ Unhandled Rejection:', err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
