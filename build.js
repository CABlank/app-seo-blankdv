import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Your build logic goes here
try {
  execSync('vite build', { stdio: 'inherit' });
} catch (error) {
  console.error('Error occurred during the build:', error);
}
