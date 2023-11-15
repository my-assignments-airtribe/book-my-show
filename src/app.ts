import express from 'express';

// Initialize express app
const app = express();

// Middleware for JSON body parsing
app.use(express.json());

// Define routes here or import them

export default app;