import express from 'express';
import { errorHandler } from './handlers/error-handlers';

// Initialize express app
const app = express();

// Middleware for JSON body parsing
app.use(express.json());

app.use(errorHandler);

// Define routes here or import them

export default app;