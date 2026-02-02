import express from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
// import { protect } from '../middleware/authMiddleware.js'; // If you have auth

const router = express.Router();

router.get('/dashboard', getDashboardStats);

export default router;
